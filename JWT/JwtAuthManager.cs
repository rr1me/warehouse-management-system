using System.Collections;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using WebApplication1.Controllers;
using WebApplication1.Data;

namespace WebApplication1;

public class JwtAuthManager
{
    private readonly JwtOptions jwtOptions;
    // private readonly ApplicationContext dbContext;

    // private readonly IDictionary<string, string> users = new Dictionary<string, string>()
    // {
    //     { "user", "123" }
    // };

    public JwtAuthManager(JwtOptions jwtOptions)
    {
        this.jwtOptions = jwtOptions;
    }

    public string Authenticate(string username, string password, out Roles? role)
    {
        DatabaseContext dbContext = new DatabaseContext();
        
        User? user = dbContext.Users.FirstOrDefault(x => x.Username == username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
        { role = null; return null!; }

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        
        role = user.Role;
        SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new(ClaimTypes.Name, username),
                new("Role", role.ToString()!)
            }),

            Expires = DateTime.UtcNow.AddMinutes(jwtOptions.ExpInMinutes),
            SigningCredentials = jwtOptions.SigningCredentials
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}