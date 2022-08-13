using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;

namespace WebApplication1.Controllers;

[Authorize(Policy = "Manager")]
[Route("transit")]
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
        Console.WriteLine("????");
        return context.Transits.ToList();
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

    // [HttpDelete("delete")]
    // public IActionResult DeleteOneAd(AcceptanceAndDispatching ad)
    // {
    //     context.AcceptanceAndDispatching
    // }
}