using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;

namespace WebApplication1.Controllers;

[ApiController]
[Route("cargo")]
[Authorize(Policy = "Driver")]
public class CargoController : ControllerBase
{

    private readonly DatabaseContext context;
    
    public CargoController(DatabaseContext context)
    {
        this.context = context;
    }

    [HttpGet("getAll")]
    public List<Cargo> GetCargoes()
    {
        var cargoes = context.Cargoes.ToList();
        Console.WriteLine(cargoes.Count);
        return cargoes;
    }
    
    [HttpPatch("update")]
    public IActionResult UpdateOneCargo(Cargo cargo)
    {
        context.Cargoes.Update(cargo);
        context.SaveChanges();
        
        Console.WriteLine("to update: "+cargo.Id);
        
        return Ok("👍");
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteOneDriver(int id)
    {
        context.Cargoes.Remove(new Cargo(id));
        context.SaveChanges();

        Console.WriteLine("to delete: "+id);
        
        return Ok("deleted");
    }

    [HttpPost("add")]
    public IActionResult AddOneDriver(Cargo cargo)
    {
        context.Cargoes.Add(cargo);
        context.SaveChanges();
        
        Console.WriteLine("to add: "+cargo.Id);

        return Ok(cargo.Id);
    }
}