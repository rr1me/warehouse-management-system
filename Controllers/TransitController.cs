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
            ReferenceHandler = ReferenceHandler.Preserve
        }));

        // var transits = new List<Transit>();
        // transits.Add(transit);
        // transit.AssignedCargo?.ForEach(x =>
        // {
        //     x.Transits = transits;
        // });

        using (DatabaseContext db = new DatabaseContext())
        {
            // db.AttachRange(transit.AssignedCargo);
            db.Attach(transit);
            
            // var transits = new List<Transit>();
            // transits.Add(transit);
            // transit.AssignedCargo?.ForEach(x =>
            // {
            //     x.Transits = transits;
            // });
            // Console.WriteLine(transit.AssignedCargo[0].StickerId);
            
            // var tr = db.Transits.Include(x => x.AssignedCargo).Single(y => y.Id == transit.Id);
            // Console.WriteLine(transit.AssignedCargo?.Equals(tr?.AssignedCargo));
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
            // else
            // {
            //     var cargoToChange = db.Cargoes.Include(x => x.Transits).ToList();
            //     var cargoes = cargoToChange.Where(x => x.Transits[0].Id == transit.Id).Select(y =>
            //     {
            //         y.Transits = null;
            //         return y;
            //     }).ToList();
            //     db.Cargoes.UpdateRange(cargoes);
            // }
            db.Transits.Add(transit);
            // db.Cargoes.UpdateRange(transit.AssignedCargo);
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