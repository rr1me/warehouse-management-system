using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace WebApplication1.CustomAuthentication;

public class CustomAuthenticationHandler : AuthenticationHandler<JwtBearerOptions>
{
    private readonly JwtOptions jwtOptions;
    
    public CustomAuthenticationHandler(IOptionsMonitor<JwtBearerOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, JwtOptions jwtOptions) 
        : base(options, logger, encoder, clock)
    {
        this.jwtOptions = jwtOptions;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        string token = Request.Cookies.FirstOrDefault(x => x.Key == "auth").Value;
        
        if (token.IsNullOrEmpty())
            return AuthenticateResult.NoResult();

        var validator = Options.SecurityTokenValidators.First();

        var validationParameters = Options.TokenValidationParameters.Clone();

        validationParameters.ValidateIssuerSigningKey = true;
        validationParameters.ValidateAudience = false;
        validationParameters.ValidateIssuer = false;
        validationParameters.IssuerSigningKey = jwtOptions.SigningCredentials.Key;
        
        ClaimsPrincipal principal;
        try
        {
            principal = validator.ValidateToken(token, validationParameters, out _);
        }
        catch (Exception e)
        {
            return AuthenticateResult.Fail(e);
        }
        
        // foreach (var claim in principal.Claims)
        // {
        //     Console.WriteLine(claim.Type+" "+claim.Value);
        // }
        
        var ticket = new AuthenticationTicket(principal, Scheme.Name);
        return AuthenticateResult.Success(ticket);
    }
}