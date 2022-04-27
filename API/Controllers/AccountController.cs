using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Entities;
using DTOs;
using Entities;
using Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services;

namespace Controllers
{
  public class AccountController : BaseApiController
  {
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    private readonly StoreContext _context;

    public AccountController(
      UserManager<User> userManager,
      TokenService tokenService,
      StoreContext context)
    {
      this._tokenService = tokenService;
      this._context = context;
      this._userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.FindByNameAsync(loginDto.Username);
      if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
      {
        return Unauthorized();
      }

      System.Console.WriteLine($"loginDto: username {loginDto.Username}");
      var userBasket = await RetrieveBasket(loginDto.Username);
      var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

      // If we have an anon basket, we will transfer this anon basket to the user.
      // And remove the previous basket
      if (anonBasket != null)
      {
        if (userBasket != null)
        {
          // Anon basket is transferred
          _context.Baskets.Remove(userBasket);
          anonBasket.BuyerId = user.UserName;
          Response.Cookies.Delete("buyerId");
          await _context.SaveChangesAsync();
        }
      }

      return new UserDto
      {
        Email = user.Email,
        Token = await _tokenService.GenerateToken(user),
        Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket.MapBasketToDto()
      };
    }

    // We will not automatically log users in,
    // so we do not return user
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
      var user = new User
      {
        UserName = registerDto.Username,
        Email = registerDto.Email,
      };

      var result = await _userManager.CreateAsync(user, registerDto.Password);
      if (!result.Succeeded)
      {
        foreach (var error in result.Errors)
        {
          ModelState.AddModelError(error.Code, error.Description);
        }
        return ValidationProblem();
      }

      await _userManager.AddToRoleAsync(user, "Member");
      // It's okay to cheat and not give them information in this case.
      // Normally we use CreatedAtRoute or some other methods and
      // add the result to location header
      return StatusCode(201);
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      // User.Identity.Name: this will get our name claim from the token! (so easy lmao)
      var user = await _userManager.FindByNameAsync(User.Identity.Name);
      return new UserDto
      {
        Email = user.Email,
        Token = await _tokenService.GenerateToken(user)
      };
    }

    private async Task<Basket> RetrieveBasket(string buyerId)
    {
      if (string.IsNullOrEmpty(buyerId))
      {
        Response.Cookies.Delete("buyerId");
        return null;
      }

      return await _context.Baskets
        .Include(b => b.Items)
        .ThenInclude(i => i.Product)
        .FirstOrDefaultAsync(b => b.BuyerId == buyerId);
    }

  }
}