using System.CodeDom.Compiler;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices.ComTypes;
using System.Text.Json.Serialization;
using WebApplication1.Data.Properties;

namespace WebApplication1.Data;

public class Driver
{
    public Driver()
    {
    }

    public Driver(int id)
    {
        Id = id;
    }

    public Driver(string name, long phoneNumber, DriverStatus status, List<Cargo>? cargoes, User? user)
    {
        Name = name;
        PhoneNumber = phoneNumber;
        Status = status;
        Cargoes = cargoes;
        User = user;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    
    public long PhoneNumber { get; set; }

    public DriverStatus Status { get; set; }
    
    public List<Cargo>? Cargoes { get; set; }
    
    [JsonIgnore]public int? UserId { get; set; }
    [JsonIgnore]public User? User { get; set; }
    
    public string Image { get; set; }
    [NotMapped] public string ImageSrc { get; set; }
}