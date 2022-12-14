using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;

namespace WebApplication1.Controllers;

[ApiController]
public class AuthController : ControllerBase
{

    private readonly JwtAuthManager _jwtAuthManager;
    private readonly DatabaseContext context;

    public AuthController(JwtAuthManager jwtAuthManager, DatabaseContext context)
    {
        _jwtAuthManager = jwtAuthManager;
        this.context = context;
    }

    [HttpPost("register")]
    [Authorize(Policy = "Admin")]
    public IActionResult Register([FromBody] User user)
    {
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        context.Users.Add(user);
        context.SaveChangesAsync();
        
        return Ok("👍");
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public IActionResult Login([FromBody] User4Login user)
    {
        var token = _jwtAuthManager.Authenticate(user.Username, user.Password, out var role);
        if (token == null!)
        { return Unauthorized(); }

        CookieOptions cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            Path = "/"
        };
        Response.Cookies.Append("auth", token, cookieOptions);
        
        return Ok(new
        {
            username = user.Username,
            role
        });
    }

    [HttpGet("logout")]
    // [Authorize]
    public IActionResult Logout()
    {
        if (Request.Cookies.ContainsKey("auth"))
        {
            Response.Cookies.Delete("auth");
            return Ok("Sucksessful logout");
        }

        return BadRequest("no token to delete for logout");
    }
}

public class User4Login
{
    public string Username { get; set; }
    public string Password { get; set; }
}