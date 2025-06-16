// using HFilesBackend.Data;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);

// // ✅ Configure PostgreSQL
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// // ✅ Add controllers
// builder.Services.AddControllers();

// // ✅ Enable CORS globally
// builder.Services.AddCors(options =>
// {
//     options.AddDefaultPolicy(policy =>
//     {
//         policy.AllowAnyOrigin()
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });

// var app = builder.Build();

// // ✅ Use middleware
// app.UseCors(); // must be before controllers
// app.UseHttpsRedirection();
// app.UseAuthorization();
// app.MapControllers();

// app.Run();


using HFilesBackend.Data;
using HFilesBackend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. PostgreSQL connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. CORS (optional but recommended if you're calling from React frontend)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")  // You can restrict this to your frontend origin
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();

    });
});

// 3. Add controllers
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowFrontendOrigin");

// 4. Use middleware
app.UseHttpsRedirection();
app.UseStaticFiles(); 
app.UseCors();           // Enable CORS
app.UseAuthorization();

// 5. Map API Controllers
app.MapControllers();

// 6. Seed default data (Ankit K.)
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Apply pending migrations automatically
    context.Database.Migrate();

    // Seed default user if none exists
    if (!context.UserProfiles.Any())
    {
        context.UserProfiles.Add(new UserProfile
        {
            FullName = "Ankit K.",
            Email = "default@example.com",
            Gender = "Male",
            Phone = "0000000000",
            PasswordHash = "N/A"
        });

        context.SaveChanges();
    }
}

app.Run();





//This was final but made some changes added CORS so updated one is above
// using HFilesBackend.Data;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);

// // PostgreSQL connection
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// var app = builder.Build();

// app.UseHttpsRedirection();
// app.UseAuthorization();
// app.MapControllers();

// app.Run();










// using HFilesBackend.Data;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);

// // // Add DB Context with MySQL
// builder.Services.AddControllers();
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
//     new MySqlServerVersion(new Version(8, 0, 36)))); // Replace with your MySQL version

// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
//     new MySqlServerVersion(new Version(8, 0, 34))));

// // Enable CORS if accessing from frontend
// builder.Services.AddCors();

// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // Middleware
// app.UseCors(policy =>
//     policy.AllowAnyOrigin()
//           .AllowAnyHeader()
//           .AllowAnyMethod());

// app.UseAuthorization();
// app.MapControllers();

// app.Run();









// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast =  Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast")
// .WithOpenApi();

// app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }
