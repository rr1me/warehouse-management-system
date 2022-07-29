using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace WebApplication1.Data;

public enum Roles
{
    Admin,
    Manager,
    Driver
}