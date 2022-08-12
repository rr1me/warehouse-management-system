using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using WebApplication1.CustomAuthentication;
using WebApplication1.Data;
using WebApplication1.Data.AuthData;
using WebApplication1.Data.Properties;
using WebApplication1.Properties;

namespace WebApplication1;

public class Startup
{

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddHttpClient();
        services.AddControllers().AddJsonOptions(options => 
        { 
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            options.JsonSerializerOptions.WriteIndented = true;
        });;
        
        services.AddDbContext<DatabaseContext>();

        services.AddSingleton<JwtOptions>();
        services.AddSingleton<JwtAuthManager>();
        
        
        services.AddSingleton<RolesHierarchy>();

        services.AddAuthentication("JwtCookieScheme").AddScheme<JwtBearerOptions, CustomAuthenticationHandler>("JwtCookieScheme", null);

        
        services.AddAuthorization(x =>
        {
            x.AddPolicy("Admin", policy => policy.Requirements.Add(new RoleRequirements("Admin")));
            x.AddPolicy("Manager", policy => policy.Requirements.Add(new RoleRequirements("Manager")));
            x.AddPolicy("Driver", policy => policy.Requirements.Add(new RoleRequirements("Driver")));
            x.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
        });

        services.AddSingleton<RolesHierarchy>();
        services.AddSingleton<IAuthorizationHandler, RequirementsHandler>();
    }

    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
        // app.UseHttpsRedirection();

        // app.UseStaticFiles();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
        
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images")),
            RequestPath = "/Images"
        });

        using (DatabaseContext db = new DatabaseContext())
        {
        // User user = new User
        // {
        //     Username = "user",
        //     Password = BCrypt.Net.BCrypt.HashPassword("123"),
        //     Role = Roles.Admin
        // };
        //       
        // db.Users.Add(user);
        // db.SaveChanges();
            //
            // Driver driver = new Driver("allen", 857357158738, DriverStatus.Active, null, null);
            //
            // db.Drivers.Add(driver);
            // db.SaveChanges();

            // var driver = db.Drivers.Find(1);
            // var user = db.Users.Find(1);
            //
            // user!.DriverInfo = driver;
            //
            
            
            // Cargo cargo = new Cargo("trash", "hz", "hz", DateTime.UtcNow, DateTime.UtcNow, CargoStatus.Stored, null);
            // db.Cargoes.Add(cargo);
            // db.SaveChanges();


            // Cargo cargo = new Cargo("eblo", CargoStatus.Unaccepted, CargoQuality.Unknown, null);

            // Cargo cargo = db.Cargoes.Find(1);
            // List<Cargo> cargoes = new List<Cargo>();
            // cargoes.Add(cargo);
            // AcceptanceAndDispatching ad = new AcceptanceAndDispatching(DateTime.UtcNow, ADType.Dispatching, ADStatus.Planned, cargoes);
            //
            // List<AcceptanceAndDispatching> adList = new List<AcceptanceAndDispatching>();
            // adList.Add(ad);
            // cargo.AcceptanceAndDispatching = adList;
            //
            // db.AcceptanceAndDispatching.Add(ad);
            // db.SaveChanges();
            // List<List<AcceptanceAndDispatching>> adList = db.Cargoes.Select(x=>x.AcceptanceAndDispatching).ToList();
            //
            // adList.ForEach(x=>
            // {
            //     x.ForEach(p =>
            //     {
            //         Console.WriteLine(p.Id);
            //     });
            // });
            
            

        }

        app.Run();
    }

}