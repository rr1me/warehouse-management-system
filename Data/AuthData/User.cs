using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace WebApplication1.Data;

public class User
{
    public User()
    {
    }

    public User(string username, string password, Roles role)
    {
        Username = username;
        Password = password;
        Role = role;
    }

    public int? Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    // [JsonConverter(typeof(JsonStringEnumConverter))]
    [Required]
    public Roles? Role { get; set; }

    public Driver? DriverInfo { get; set; }
}