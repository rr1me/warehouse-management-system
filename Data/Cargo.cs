using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace WebApplication1.Data;

public class Cargo
{
    public Cargo()
    {
    }

    public Cargo(string name, string arrivalAddress, string departureAddress, DateTime arrivalDate, DateTime departureDate, bool onTheWay, bool delivered, Driver? driver)
    {
        Name = name;
        ArrivalAddress = arrivalAddress;
        DepartureAddress = departureAddress;
        ArrivalDate = arrivalDate;
        DepartureDate = departureDate;
        OnTheWay = onTheWay;
        Delivered = delivered;
        Driver = driver;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    
    public string ArrivalAddress { get; set; }
    public string DepartureAddress { get; set; }
    
    public DateTime ArrivalDate { get; set; }
    public DateTime DepartureDate { get; set; }
    
    public bool OnTheWay { get; set; }
    public bool Delivered { get; set; }
    
    [JsonIgnore]public int? DriverId { get; set; }
    [JsonIgnore]public Driver? Driver { get; set; }
}