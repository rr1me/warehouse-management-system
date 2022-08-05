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
}