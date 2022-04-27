using System;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class BasketController : BaseApiController
  {
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
      this._context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
      var basket = await RetrieveBasket(GetBuyerId());

      if (basket == null) return NotFound();

      return basket.MapBasketToDto();
    }

    [HttpPost] /* api/basket?productId=3&quantity=2 */
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
      var basket = await RetrieveBasket(GetBuyerId());
      if (basket == null) basket = CreateBasket();

      var product = await _context.Products.FindAsync(productId);
      if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });

      basket.AddItem(product, quantity);

      var result = await _context.SaveChangesAsync() > 0;
      if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

      return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
      var basket = await RetrieveBasket(GetBuyerId());
      if (basket == null) return NotFound();

      basket.RemoveItem(productId, quantity);
      var result = await _context.SaveChangesAsync() > 0;
      if (result) return Ok();
      return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
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

    private string GetBuyerId()
    {
      // check for username or buyerId from the cookie
      return User.Identity?.Name ?? Request.Cookies["buyerId"];
    }

    private Basket CreateBasket()
    {
      var buyerId = User.Identity?.Name;

      if (string.IsNullOrEmpty(buyerId))
      {
        buyerId = Guid.NewGuid().ToString();

        // HttpOnly will not be used because we will use this value on client side
        var cookieOptions = new CookieOptions
        {
          IsEssential = true,
          Expires = DateTime.Now.AddDays(30),
        };

        Response.Cookies.Append("buyerId", buyerId, cookieOptions);
      }

      var basket = new Basket { BuyerId = buyerId };

      // entity framework will track this now.
      _context.Baskets.Add(basket);
      return basket;
    }
  }
}
