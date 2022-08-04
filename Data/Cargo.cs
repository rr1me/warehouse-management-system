using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using WebApplication1.Data.Properties;

namespace WebApplication1.Data;

public class Cargo
{
    public Cargo()
    {
    }

    public Cargo(string name, string arrivalAddress, string departureAddress, DateTime arrivalDate, DateTime departureDate, CargoStatus cargoStatus, Driver? driver)
    {
        Name = name;
        ArrivalAddress = arrivalAddress;
        DepartureAddress = departureAddress;
        ArrivalDate = arrivalDate;
        DepartureDate = departureDate;
        CargoStatus = cargoStatus;
        Driver = driver;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    
    public string ArrivalAddress { get; set; }
    public string DepartureAddress { get; set; }
    
    public DateTime ArrivalDate { get; set; }
    public DateTime DepartureDate { get; set; }

    public CargoStatus CargoStatus { get; set; }
    
    [JsonIgnore]public int? DriverId { get; set; }
    [JsonIgnore]public Driver? Driver { get; set; }
}