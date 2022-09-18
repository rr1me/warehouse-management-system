using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Data;
using WebApplication1.Data.Properties;

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
    public GetTransitsDTO GetAllTransits()
    {
        GetTransitsDTO responseObject = new GetTransitsDTO();

        responseObject.Transits = context.Transits.Include(x => x.AssignedCargo).ToList();
        responseObject.CargoToAttach = context.Cargoes.Include(x => x.Transits).Where(x => x.Transits.Count == 1).ToList();
        
        // return context.Transits.Include(x=>x.AssignedCargo).ToList();
        return responseObject;
    }

    [HttpGet("{id}")]
    public Transit GetOneTransit()
    {
        int id = 1;
        return context.Transits.Include(x => x.AssignedCargo).Single(x => x.Id == id);
    }

    [HttpPost("update")]
    public IActionResult UpdateOneTransit(TransitDTO transitDto)
    {
        Transit transit = transitDto.Transit;
        var cargoToDelete = transitDto.CargoToDelete;
        // Console.WriteLine(transit.AssignedCargo[0].Id);
        
        // Console.WriteLine(JsonSerializer.Serialize(transit, new JsonSerializerOptions()
        // {
        //     ReferenceHandler = ReferenceHandler.IgnoreCycles
        // }));

        context.Attach(transit);
        // if (transit.AssignedCargo != null)
        // {
        //     // context.AttachRange(transit.AssignedCargo);
        //     transit.AssignedCargo.ForEach(x =>
        //     {
        //         if (x.Id == 0)
        //             context.Cargoes.Add(x);
        //         else
        //         {
        //             context.Attach(x);
        //             // x.Transits.Add(transit);
        //             context.Cargoes.Update(x);
        //         }
        //     });
        // }
        var newCargo = transit.AssignedCargo.Where(x => x.Id == 0);
        var oldCargo = transit.AssignedCargo.Where(x => x.Id != 0);
        context.Cargoes.AddRange(newCargo);
        context.AttachRange(oldCargo);
        context.Cargoes.UpdateRange(oldCargo);
        
        context.Transits.Update(transit);

        Console.WriteLine("update: "+transit.Id);
        if (!cargoToDelete.IsNullOrEmpty())
        {
            var rangeToDelete = cargoToDelete.Select(x => new Cargo(x)).ToList();
            context.Cargoes.RemoveRange(rangeToDelete);
            Console.WriteLine("deleted");
        }
        
        context.SaveChanges();
        return Ok(context.Cargoes.Include(x => x.Transits).Where(x => x.Transits.Count == 1).ToList());
    }

    [HttpPut("add")]
    public IActionResult AddOneTransit(Transit transit)
    {
        context.Transits.Attach(transit);
        context.Transits.Add(transit);
        context.SaveChanges();

        AddTransitDTO responseObject = new AddTransitDTO();
        responseObject.Transit = transit;
        responseObject.CargoToAttach = context.Cargoes.Include(x => x.Transits).Where(x => x.Transits.Count == 1).ToList();
        
        return Ok(responseObject);
    }

    [HttpGet("getCargo/{id}")]
    public List<Cargo> GetAssignedCargo(int id)
    {
        return context.Cargoes.Where(x => x.Transits.Exists(y => y.Id == id)).ToList();
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteOneTransit(int id)
    {
        var transit = context.Transits.Include(x => x.AssignedCargo).First(x => x.Id == id);
        Console.WriteLine(transit);

        if (transit.Type == 0)
        {
            var transitAssignedCargo = transit.AssignedCargo;
            var isAnyCargoAttachedToDispatching = transitAssignedCargo.Any(x => x.Transits.Count == 2);
            if (isAnyCargoAttachedToDispatching)
                return Problem("some cargo is attached to dispatching");
            
            context.Cargoes.RemoveRange(transitAssignedCargo);
        }
        else
        {
            transit.AssignedCargo = null;
        }

        context.Transits.Remove(transit);
        context.SaveChanges();

        return Ok(context.Cargoes.Include(x => x.Transits).Where(x => x.Transits.Count == 1).ToList());
    }
}

public class TransitDTO
{
    public Transit Transit { get; set; }
    public List<int> CargoToDelete { get; set; }
}

public class GetTransitsDTO
{
    public List<Transit> Transits { get; set; }
    public List<Cargo> CargoToAttach { get; set; }
}

public class AddTransitDTO
{
    public Transit Transit { get; set; }
    public List<Cargo> CargoToAttach { get; set; }
}