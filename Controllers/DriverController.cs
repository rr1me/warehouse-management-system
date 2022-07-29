using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoreLinq.Extensions;
using WebApplication1.Data;

namespace WebApplication1.Controllers;

[ApiController]
[Route("drivers")]
[Authorize(Policy = "Manager")]
public class DriverController
{
    [HttpGet("getAll")]
    public List<Driver> GetDrivers()
    {
        using (DatabaseContext dbContext = new DatabaseContext())
        {
            return dbContext.Drivers.Pipe(x =>
            {
                var fileName = x.Image;
                // x.Image = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/Images/{fileName}"; todo: make it work with static files without placeholder images
                x.Image = "https://via.placeholder.com/" + fileName;

            }).ToList();
        }
    }
}