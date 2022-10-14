using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MoreLinq.Extensions;
using WebApplication1.Data;
using WebApplication1.Data.Properties;

namespace WebApplication1.Controllers;

[ApiController]
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
        
        return responseObject;
    }

    [HttpGet("{id}")]
    public Transit GetOneTransit()
    {
        int id = 1;
        return context.Transits.Include(x => x.AssignedCargo).Single(x => x.Id == id);
    }

    [HttpGet("special")]
    public IActionResult SpecialGet()
    {
        var transit = context.Transits.Include(x => x.AssignedCargo).First(x => x.Id == 1);
        var cargo = context.Cargoes.First(x => x.Id == 44);
        transit.AssignedCargo.Add(cargo);
        return Ok(transit);
    }

    [HttpPost("update")]
    public IActionResult UpdateOneTransit(TransitDTO transitDTO)
    {
        var transit = transitDTO.Transit;
        var cargoToDelete = transitDTO.CargoToDelete;

        if (!cargoToDelete.IsNullOrEmpty() && transit.Type == TransitType.Acceptance)
        {
            
            var rangeToDelete = cargoToDelete.Select(x => new Cargo(x)).ToList();
            context.Cargoes.RemoveRange(rangeToDelete);
            Console.WriteLine("deleted");
        }

        context.Transits.Update(transit);

        var cargoTransits = context.CargoTransits.Where(x => x.Transit == transit);

        cargoTransits.ForEach(x =>
        {
            if (!cargoToDelete.IsNullOrEmpty() && transit.Type == TransitType.Dispatching && cargoToDelete.Any(z => z == x.CargoId)) context.Entry(x).State = EntityState.Deleted;
            else if (transit.CargoTransits.Any(y => y == x)) context.Entry(x).State = EntityState.Unchanged;
        });

        context.ChangeTracker.DetectChanges();
        Console.WriteLine(context.ChangeTracker.DebugView.LongView);
        context.SaveChanges();

        var responseObject = new AddTransitDTO();
        responseObject.Transit = transit;
        responseObject.CargoToAttach = context.Cargoes.Include(x => x.Transits).Where(x => x.Transits.Count == 1).ToList();

        return Ok(responseObject);
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

    [HttpPost("delete")]
    public IActionResult DeleteOneTransit(Transit transit)
    {
        context.Transits.Attach(transit);

        if (transit.Type == 0)
        {
            var isAnyCargoAttachedToDispatching = transit.AssignedCargo.Any(x => x.Transits.Count == 2);
            if (isAnyCargoAttachedToDispatching)
                return Problem("some cargo is attached to dispatching");
            
            context.Cargoes.RemoveRange(transit.AssignedCargo);
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