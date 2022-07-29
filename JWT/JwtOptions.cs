using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace WebApplication1;

public class JwtOptions
{
    private const string Key =
        "MnLXK6YulEjd1mHNSjZb4tpnBWAe7pkZHnRXRPiIbAned9Xr8pzaWOJQTvdfo7UvoUbGyjuT6DiR42SICACIrrj4G4UdUH8u";

    private static readonly SymmetricSecurityKey SymmetricSecurityKey = new (Encoding.ASCII.GetBytes(Key));
    public readonly SigningCredentials SigningCredentials = new (SymmetricSecurityKey, SecurityAlgorithms.HmacSha256);

    public readonly int ExpInMinutes = 120;
}