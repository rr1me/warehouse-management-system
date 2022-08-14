using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1.Controllers;

[Authorize(Policy = "Manager")]
[Route("transits")]
public class TransitController : ControllerBase
{
    private readonly DatabaseContext context; 
    
    public TransitController(DatabaseContext context)
    {
        this.context = context;
    }

    [HttpGet("getall")]
    public List<Transit> GetAllAd()
    {
        return context.Transits.Include(x=>x.AssignedCargo).ToList();
    }

    [HttpPost("update")]
    public IActionResult UpdateOneAd(Transit transit)
    {
        context.Transits.Update(transit);

        return Ok("!");
    }

    [HttpPut("add")]
    public IActionResult AddOneAd(Transit transit)
    {
        context.Transits.Add(transit);

        return Ok(transit.Id);
    }
}