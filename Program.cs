using WebApplication1;

var builder = WebApplication.CreateBuilder(args);

var startup = new Startup();
startup.ConfigureServices(builder.Services);

var app = builder.Build();
var env = builder.Environment;
startup.Configure(app, env);