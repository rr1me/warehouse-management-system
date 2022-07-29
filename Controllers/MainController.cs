using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoreLinq;
using WebApplication1.Data;

namespace WebApplication1.Controllers;

[ApiController]
[Route("main")]
public class MainController : ControllerBase
{
    [HttpGet("cargoes")]
    [Authorize(Policy = "Driver")]
    public List<Cargo> GetCargoes()
    {
        using (DatabaseContext dbContext = new DatabaseContext())
        {
            return dbContext.Cargoes.ToList();
        }
    }

    [HttpGet("cargoes/{id}")]
    [Authorize(Policy = "Driver")]
    public IActionResult GetOneCargo(int id = 0)
    {
        using (DatabaseContext dbContext = new DatabaseContext())
        {
            var driver = dbContext.Drivers.Find(id);
        }
        return Ok();
    }
}