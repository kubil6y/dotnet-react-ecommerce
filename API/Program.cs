using System;
using System.Threading.Tasks;
using API.Data;
using Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      // CreateHostBuilder(args).Build().Run();
      var host = CreateHostBuilder(args).Build();
      using var scope = host.Services.CreateScope(); // using -> Automatic Dispose();
      var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
      var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
      var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

      try
      {
        await context.Database.MigrateAsync();
        await DbInitializer.Initialize(context, userManager);
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Problem migrating data");
      }

      await host.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
