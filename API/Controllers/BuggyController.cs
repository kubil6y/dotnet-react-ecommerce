using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BuggyController : BaseApiController
  {
    [HttpGet("not-found")]
    public ActionResult GetNotFound()
    {
      return NotFound();
    }

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
      return BadRequest(new ProblemDetails { Title = "This is a bad request" });
    }

    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorized()
    {
      return Unauthorized();
    }

    [HttpGet("validation-error")]
    public ActionResult GetValidationError()
    {
      ModelState.AddModelError("Problem1", "This is the first error");
      ModelState.AddModelError("Problem2", "This is the second error");
      ModelState.AddModelError("Problem3", "This is the third error");
      return ValidationProblem(); // 400 BadRequest + array of errors
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
      // this is handled by developer exception page...
      // we will take care of this ourselves.
      throw new Exception("This is a server error");
    }

  }
}