using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RealEstateAPI.Configurations;
using RealEstateAPI.Data;
using RealEstateAPI.Repositories;
using RealEstateAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// MongoDB Settings (appsettings.json + variables de entorno)
builder.Services.Configure<MongoDbSettings>(options =>
{
    var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI")
                          ?? builder.Configuration.GetSection("MongoDbSettings:ConnectionString").Value;

    options.ConnectionString = connectionString;
    options.DatabaseName = builder.Configuration.GetSection("MongoDbSettings:DatabaseName").Value;
});

builder.Services.AddSingleton<IMongoClient>(s =>
{
    var mongoSettings = s.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(mongoSettings.ConnectionString);
});

builder.Services.AddScoped(s =>
{
    var mongoSettings = s.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return s.GetRequiredService<IMongoClient>().GetDatabase(mongoSettings.DatabaseName);
});

// Repositories & Services
builder.Services.AddScoped<PropertyRepository>();
builder.Services.AddScoped<PropertyService>();

// Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS (permite acceso desde frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000",              // frontend local
                "https://tu-frontend.vercel.app"      // frontend en Vercel (ajusta la URL real)
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

// Seed inicial de datos
using (var scope = app.Services.CreateScope())
{
    var database = scope.ServiceProvider.GetRequiredService<IMongoDatabase>();
    SeedData.Initialize(database);
}

// Swagger solo en Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();