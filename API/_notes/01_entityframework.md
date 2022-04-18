# Entity Framework

```sh
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="5.0.8">
  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  <PrivateAssets>all</PrivateAssets>
</PackageReference>
<PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="5.0.8" />
```

### Create initial migration

```sh
dotnet ef migrations add InitialCreate -o Data/Migration
```

### Update database (creates database if it does not exist)

```sh
dotnet ef database update
```

---

### Seeding dummy data

```c#
// Program.cs
// CreateHostBuilder(args).Build().Run();
var host = CreateHostBuilder(args).Build();
using var scope = host.Services.CreateScope(); // using -> Automatic Dispose();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
  context.Database.Migrate();
  DbInitializer.Initialize(context);
}
catch (Exception ex)
{
  logger.LogError(ex, "Problem migrating data");
}

host.Run();
```

Drop database

```sh
dotnet ef database drop
```

Run app on watch mode and now migrations will become automatic with dummy data.

```sh
dotnet watch run
```

---
