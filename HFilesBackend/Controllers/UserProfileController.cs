using Microsoft.AspNetCore.Mvc;
using HFilesBackend.Data;
using HFilesBackend.DTOs;
using HFilesBackend.Models;

namespace HFilesBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserProfileController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Add New User Profile
        [HttpPost("add-profile")]
        public async Task<IActionResult> AddProfile([FromBody] UpdateProfileDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Phone) || string.IsNullOrEmpty(dto.Gender))
            {
                return BadRequest(new { error = "All fields (Email, Phone, Gender) are required." });
            }

            var newUser = new UserProfile
            {
                Email = dto.Email,
                Phone = dto.Phone,
                Gender = dto.Gender,
                PasswordHash = "N/A" // You can set this properly if needed
            };

            _context.UserProfiles.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User added successfully", userId = newUser.Id });
        }

        // ✏️ Update Existing User with ID = 1
        [HttpPost("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
        {
            var user = await _context.UserProfiles.FindAsync(1); // Hardcoded user ID
            if (user == null)
                return NotFound(new { error = "User not found" });

            user.Email = dto.Email;
            user.Phone = dto.Phone;
            user.Gender = dto.Gender;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Profile updated successfully" });
        }
    }
}
