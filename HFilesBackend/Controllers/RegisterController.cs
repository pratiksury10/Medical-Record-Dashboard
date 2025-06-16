

using HFilesBackend.Data;
using HFilesBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace HFilesBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegisterController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (_context.UserProfiles.Any(u => u.Email == request.Email))
                {
                    return BadRequest(new { message = "Email already registered" });
                }

                var newUser = new UserProfile
                {
                    FullName = request.FullName,
                    Email = request.Email,
                    Phone = "0000000000",
                    Gender = "Not Specified",
                    PasswordHash = request.Password
                };

                _context.UserProfiles.Add(newUser);
                await _context.SaveChangesAsync();

                // Save session
                HttpContext.Session.SetString("UserEmail", newUser.Email);
                HttpContext.Session.SetInt32("UserId", newUser.Id);

                return Ok(new
                {
                    message = "User registered and session created",
                    user = new { newUser.Id, newUser.FullName, newUser.Email }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // ✅ NEW: Add this to handle /api/register/session
        [HttpGet("session")]
        public IActionResult CheckSession()
        {
            var email = HttpContext.Session.GetString("UserEmail");

            if (!string.IsNullOrEmpty(email))
            {
                return Ok(new { message = "Session active", email });
            }

            return Unauthorized(new { message = "No active session" });
        }
    }

    public class RegisterRequest
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}





