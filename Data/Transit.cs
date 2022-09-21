using System.Text.Json.Serialization;
using WebApplication1.Data.Properties;

namespace WebApplication1.Data;

public class Transit
{
    public Transit()
    {
    }

    public Transit(int id)
    {
        Id = id;
    }

    public Transit(string client, DateTime date, TransitType type, TransitStatus status, List<Cargo>? assignedCargo, TaskStatus additionalTasks, string? commentary)
    {
        Client = client;
        Date = date;
        Type = type;
        Status = status;
        AssignedCargo = assignedCargo;
        AdditionalTasks = additionalTasks;
        Commentary = commentary;
    }

    public int Id { get; set; }
    public string Client { get; set; }
    public DateTime Date { get; set; }

    // [JsonConverter(typeof(JsonStringEnumConverter))]
    public TransitType Type { get; set; }
    // [JsonConverter(typeof(JsonStringEnumConverter))]
    public TransitStatus Status { get; set; }
    
    public List<Cargo>? AssignedCargo { get; set; }
    [JsonIgnore]
    public List<CargoTransit>? CargoTransits { get; set; }

    public TaskStatus AdditionalTasks { get; set; }
    
    public string? Commentary { get; set; }
}