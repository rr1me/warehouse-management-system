using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
        
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images")),
            RequestPath = "/Images"
        });

        // using (DatabaseContext db = new DatabaseContext())
        // {
        // }

        app.Run();
    }

}