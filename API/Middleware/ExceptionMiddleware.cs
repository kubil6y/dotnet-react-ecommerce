using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
  public class ExceptionMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(
      RequestDelegate next,
      ILogger<ExceptionMiddleware> logger,
      IHostEnvironment env)
    {
      this._env = env;
      this._logger = logger;
      this._next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await this._next(context);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, ex.Message);

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = 500;

        var response = new ProblemDetails
        {
          Status = 500,
          Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
          Title = ex.Message,
        };

        var jsonOptions = new JsonSerializerOptions
        {
          PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var json = JsonSerializer.Serialize(response, jsonOptions);
        await context.Response.WriteAsync(json);
      }
    }
  }
}