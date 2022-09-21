namespace WebApplication1.Data;

public class CargoTransit
{
    public int TransitId { get; set; }
    public Transit Transit { get; set; }
    
    public int CargoId { get; set; }
    public Cargo Cargo { get; set; }
}