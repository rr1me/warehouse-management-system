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

    public Cargo(long stickerId, string? description, CargoStatus cargoStatus, CargoQuality cargoQuality, List<AcceptanceAndDispatching> acceptanceAndDispatching, List<InnerWork>? assignedInnerWorks)
    {
        StickerId = stickerId;
        Description = description;
        CargoStatus = cargoStatus;
        CargoQuality = cargoQuality;
        AcceptanceAndDispatching = acceptanceAndDispatching;
        AssignedInnerWorks = assignedInnerWorks;
    }

    public int Id { get; set; }
    public long StickerId { get; set; }
    public string? Description { get; set; }
    
    public CargoStatus CargoStatus { get; set; }
    public CargoQuality CargoQuality { get; set; }
    
    public List<AcceptanceAndDispatching> AcceptanceAndDispatching { get; set; }
    public List<InnerWork>? AssignedInnerWorks { get; set; }
}