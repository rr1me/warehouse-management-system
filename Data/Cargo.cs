using System.Text.Json.Serialization;
using WebApplication1.Data.Properties;

namespace WebApplication1.Data;

public class Cargo
{
    public Cargo()
    {
    }

    public Cargo(int id)
    {
        Id = id;
    }

    public Cargo(long stickerId, string? description, CargoStatus cargoStatus, CargoQuality cargoQuality, List<Transit>? transits, List<InnerWork>? assignedInnerWorks)
    {
        StickerId = stickerId;
        Description = description;
        CargoStatus = cargoStatus;
        CargoQuality = cargoQuality;
        Transits = transits;
        AssignedInnerWorks = assignedInnerWorks;
    }

    public int Id { get; set; }
    public long StickerId { get; set; }
    public string? Description { get; set; }
    
    public CargoStatus CargoStatus { get; set; }
    public CargoQuality CargoQuality { get; set; }
    
    public List<Transit>? Transits { get; set; }

    public List<InnerWork>? AssignedInnerWorks { get; set; }
}