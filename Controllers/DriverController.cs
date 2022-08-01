using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoreLinq.Extensions;
using WebApplication1.Data;

namespace WebApplication1.Controllers;

[ApiController]
[Route("drivers")]
[Authorize(Policy = "Manager")]
public class DriverController : ControllerBase
{
    private readonly DatabaseContext context;
    public DriverController(DatabaseContext context)
    {
        this.context = context;
    }

    [HttpGet("getAll")]
    public List<Driver> GetDrivers()
    {
        return context.Drivers.Pipe(x =>
        {
            var fileName = x.Image;
            x.ImageSrc = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/Images/{fileName}";

        }).ToList();
    }

    [HttpPatch("update")]
    public IActionResult UpdateOneDriver(Driver driver)
    {
        context.Drivers.Update(driver);
        context.SaveChanges();
        Console.WriteLine(driver.Id);
        return Ok("👍");
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteOneDriver(int id)
    {
        Console.WriteLine(id);
        context.Drivers.Remove(new Driver(id));
        context.SaveChanges();
        return Ok("deleted");
    }

    [HttpPost("add")]
    public IActionResult AddOneDriver(Driver driver)
    {
        context.Drivers.Add(driver);
        context.SaveChanges();
        return Ok("added");
    }
}