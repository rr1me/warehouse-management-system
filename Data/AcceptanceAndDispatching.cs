using WebApplication1.Data.Properties;

namespace WebApplication1.Data;

public class AcceptanceAndDispatching
{
    public AcceptanceAndDispatching()
    {
    }

    public AcceptanceAndDispatching(DateTime date, ADType adType, ADStatus adStatus, List<Cargo> assignedCargo)
    {
        Date = date;
        ADType = adType;
        ADStatus = adStatus;
        AssignedCargo = assignedCargo;
    }

    public int Id { get; set; }
    public DateTime Date { get; set; }

    public ADType ADType { get; set; }
    public ADStatus ADStatus { get; set; }
    
    public List<Cargo> AssignedCargo { get; set; }
    public TaskStatus AdditionalTasks { get; set; }
    
    public string? Commentary { get; set; }
}