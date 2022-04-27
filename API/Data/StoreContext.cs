using API.Entities;
using Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext : IdentityDbContext<User>
  {
    public StoreContext(DbContextOptions options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }

    /* alternative seeding method other than initializer*/
    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      // this will create a table for our roles...
      builder.Entity<IdentityRole>()
        .HasData(
          new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
          new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
        );
    }
  }
}
