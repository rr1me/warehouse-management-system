using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1.Controllers;

[ApiController] //todo ASHDAKJSDHKJASDHKJH HOW DID THIS WORKS MAN [FROMBODY] HAHAHAHA?!?!?!?!
[Authorize(Policy = "Manager")]
[Route("transits")]
public class TransitController : ControllerBase
{
    private readonly DatabaseContext context; 
    
    public TransitController(DatabaseContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public List<Transit> GetAllTransits()
    {
        return context.Transits.Include(x=>x.AssignedCargo).ToList();
    }

    [HttpGet("{id}")]
    public Transit GetOneTransit()
    {
        int id = 1;
        return context.Transits.Include(x => x.AssignedCargo).Single(x => x.Id == id);
    }

    [HttpPost("update")]
    public IActionResult UpdateOneTransit(Transit transit)
    {
        Console.WriteLine(JsonSerializer.Serialize(transit, new JsonSerializerOptions()
        {
            ReferenceHandler = ReferenceHandler.IgnoreCycles
        }));

        using (DatabaseContext db = new DatabaseContext())
        {
            db.Attach(transit);
            if (transit.AssignedCargo != null)
            {
                transit.AssignedCargo.ForEach(x =>
                {
                    if (x.Id == 0)
                        db.Cargoes.Add(x);
                    else
                        db.Cargoes.Update(x);
                });
            }
            db.Transits.Update(transit);
            db.SaveChanges();
        }
        
        Console.WriteLine("update: "+transit.Id);
        return Ok("!");
    }

    [HttpPut("add")]
    public IActionResult AddOneTransit(Transit transit)
    {
        context.Transits.Add(transit);

        return Ok(transit.Id);
    }

    [HttpGet("getCargo/{id}")]
    public List<Cargo> GetAssignedCargo(int id)
    {
        return context.Cargoes.Where(x => x.Transits.Exists(y => y.Id == id)).ToList();
    }
}