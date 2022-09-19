﻿using System.Text.Json;
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

    [HttpGet("special")]
    public IActionResult SpecialGet()
    {
        var transit = context.Transits.Include(x => x.AssignedCargo).First(x => x.Id == 1);
        var cargo = context.Cargoes.First(x => x.Id == 44);
        transit.AssignedCargo.Add(cargo);
        return Ok(transit);
    }

    [HttpPost("update")]
    public IActionResult UpdateOneTransit(Transit transit)
    {

        // Console.WriteLine(JsonSerializer.Serialize(transit, new JsonSerializerOptions()
        // {
        //     ReferenceHandler = ReferenceHandler.IgnoreCycles
        // }));
        context.Attach(transit);
        var wtf = context.Cargoes.Find(44);
        transit.AssignedCargo[4] = wtf; //todo im done, lets try to use 3rd table

        context.Transits.Update(transit);
        context.ChangeTracker.DetectChanges();
        Console.WriteLine(context.ChangeTracker.DebugView.LongView);
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