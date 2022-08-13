using System.Text.Json.Serialization;
using WebApplication1.Data.Properties;

namespace WebApplication1.Data;

public class Transit
{
    public Transit()
    {
    }

    public Transit(string client, DateTime date, TransitType transitType, TransitStatus transitStatus, List<Cargo> assignedCargo, TaskStatus additionalTasks, string? commentary)
    {
        Client = client;
        Date = date;
        TransitType = transitType;
        TransitStatus = transitStatus;
        AssignedCargo = assignedCargo;
        AdditionalTasks = additionalTasks;
        Commentary = commentary;
    }

    public int Id { get; set; }
    public string Client { get; set; }
    public DateTime Date { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]public TransitType TransitType { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]public TransitStatus TransitStatus { get; set; }
    
    public List<Cargo> AssignedCargo { get; set; }
    public TaskStatus AdditionalTasks { get; set; }
    
    public string? Commentary { get; set; }
}