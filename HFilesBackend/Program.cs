using HFilesBackend.Data;
using HFilesBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http; // Required for session

var builder = WebApplication.CreateBuilder(args);

// 1. PostgreSQL connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Important for sessions/cookies
    });
});

// ✅ 3. Add Session Services
builder.Services.AddDistributedMemoryCache(); // In-memory session store
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Optional timeout
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// 4. Add controllers
builder.Services.AddControllers();

var app = builder.Build();

// ✅ 5. Enable middleware
app.UseCors("AllowFrontendOrigin");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// 🔥 Add session middleware before authorization
app.UseSession();
app.UseAuthorization();

// 6. Map API Controllers
app.MapControllers();

// 7. Seed default data (Ankit K.)
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    context.Database.Migrate();

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





// using HFilesBackend.Data;
// using HFilesBackend.Models;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);

// // 1. PostgreSQL connection
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// // 2. CORS (optional but recommended if you're calling from React frontend)
// builder.Services.AddCors(options =>
// {   
//     // options.AddDefaultPolicy(policy =>
//     options.AddPolicy("AllowFrontendOrigin", policy =>
//     {
//         policy.WithOrigins("http://localhost:3000")  // You can restrict this to your frontend origin
//               .AllowAnyHeader()
//               .AllowAnyMethod()
//               .AllowCredentials();

//     });
// });

// // 3. Add controllers
// builder.Services.AddControllers();

// var app = builder.Build();

// app.UseCors("AllowFrontendOrigin");

// // 4. Use middleware
// app.UseHttpsRedirection();
// app.UseStaticFiles(); 
// app.UseCors();           // Enable CORS
// app.UseAuthorization();

// // 5. Map API Controllers
// app.MapControllers();

// // 6. Seed default data (Ankit K.)
// using (var scope = app.Services.CreateScope())
// {
//     var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

//     // Apply pending migrations automatically
//     context.Database.Migrate();

//     // Seed default user if none exists
//     if (!context.UserProfiles.Any())
//     {
//         context.UserProfiles.Add(new UserProfile
//         {
//             FullName = "Ankit K.",
//             Email = "default@example.com",
//             Gender = "Male",
//             Phone = "0000000000",
//             PasswordHash = "N/A"
//         });

//         context.SaveChanges();
//     }
// }

// app.Run();
