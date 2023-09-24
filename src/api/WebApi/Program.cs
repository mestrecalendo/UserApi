using Domain.Interfaces;
using Infrastructure.Configuracao;
using Infrastructure.Repositorio;
using Microsoft.EntityFrameworkCore;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200").AllowAnyHeader()
                                                  .AllowAnyMethod();
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ContextDb>(options =>
               options.UseSqlServer(
                   builder.Configuration.GetConnectionString("DefaultConnection")));

// INTERFACE E REPOSITORIO
builder.Services.AddSingleton(typeof(IGeneric<>), typeof(RepositorioGenerico<>));
builder.Services.AddSingleton<IUsuario, RepositorioUser>();
builder.Services.AddSingleton<IEscolaridade, RepositorioEscolaridade>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
