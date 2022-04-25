using System.Text.Json;
using Microsoft.AspNetCore.Http;
using RequestHelpers;

namespace Extensions
{
  public static class HttpExtensions
  {
    public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
    {
      var options = new JsonSerializerOptions
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      };

      response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
      // custom header for CORS
      response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
  }
}