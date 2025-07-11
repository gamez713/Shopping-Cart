using storeAPI.Data;
using storeAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register AppDbContext with dependency injection and configure it to use a SQLite database file
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=store.db"));

// NOTE to self: Allowing any origin for convenience.
// Need to replace AllowAnyOrigin() before deploying
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS middleware before any endpoint mappings
app.UseCors();

app.UseHttpsRedirection();
app.UseAuthorization();

// Register controller routes
app.MapControllers();

// TEMP: Seed the database if empty
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Products.Any())
    {
        db.Products.AddRange(
            new Product { Name = "Whole Milk", Price = 2.50M, ImgUrl = "/images/wholemilk.webp" },
            new Product { Name = "Low Fat Milk", Price = 2.50M, ImgUrl = "/images/lowfatmilk.webp" },
            new Product { Name = "Fat Free Milk", Price = 2.50M, ImgUrl = "/images/fatfreemilk.webp" },
            new Product { Name = "Chocolate Milk", Price = 2.50M, ImgUrl = "/images/chocolatemilk.webp" }
        );

        db.SaveChanges();
    }
}

app.Run();