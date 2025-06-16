using Microsoft.AspNetCore.Mvc;
using HFilesBackend.Data;
using HFilesBackend.Models;

namespace HFilesBackend.Controllers
{
    [ApiController]
    [Route("api/files")]
    public class MedicalFileController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public MedicalFileController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // ✅ Upload file
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromForm] string fileName, [FromForm] string fileType)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "No file uploaded." });

            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, uniqueName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var medicalFile = new MedicalFile
            {
                FileName = fileName,
                FileType = fileType,
                FilePath = $"/uploads/{uniqueName}",
                UserProfileId = 1 // later make dynamic
            };

            _context.MedicalFiles.Add(medicalFile);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = medicalFile.Id,
                medicalFile.FileName,
                medicalFile.FileType,
                medicalFile.FilePath
            });
        }

        // ✅ Get all uploaded files
        [HttpGet]
        public IActionResult GetAllFiles()
        {
            var files = _context.MedicalFiles.Select(f => new
            {
                f.Id,
                f.FileName,
                f.FileType,
                f.FilePath
            }).ToList();

            return Ok(files);
        }

        // ✅ Delete a file by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            var file = await _context.MedicalFiles.FindAsync(id);
            if (file == null)
                return NotFound(new { error = "File not found." });

            var fullPath = Path.Combine(_env.WebRootPath, file.FilePath.TrimStart('/'));
            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);

            _context.MedicalFiles.Remove(file);
            await _context.SaveChangesAsync();

            return Ok(new { message = "File deleted successfully." });
        }
    }
}





// using Microsoft.AspNetCore.Mvc;
// using HFilesBackend.Data;
// using HFilesBackend.Models;

// namespace HFilesBackend.Controllers
// {
//     [ApiController]
//     [Route("api/files")]
//     public class MedicalFileController : ControllerBase
//     {
//         private readonly AppDbContext _context;
//         private readonly IWebHostEnvironment _env;

//         public MedicalFileController(AppDbContext context, IWebHostEnvironment env)
//         {
//             _context = context;
//             _env = env;
//         }

//         [HttpPost("upload")]
//         public async Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromForm] string fileName, [FromForm] string fileType)
//         {
//             if (file == null || file.Length == 0)
//                 return BadRequest(new { error = "No file uploaded." });

//             var uploadsFolder = Path.Combine(_env.ContentRootPath, "Uploads");
//             if (!Directory.Exists(uploadsFolder))
//                 Directory.CreateDirectory(uploadsFolder);

//             var filePath = Path.Combine(uploadsFolder, file.FileName);
//             using (var stream = new FileStream(filePath, FileMode.Create))
//             {
//                 await file.CopyToAsync(stream);
//             }

//             var medicalFile = new MedicalFile
//             {
//                 FileName = fileName,
//                 FileType = fileType,
//                 FilePath = filePath,
//                 UserId = 1 // Hardcoded user ID for now
//             };

//             _context.MedicalFiles.Add(medicalFile);
//             await _context.SaveChangesAsync();

//             return Ok(new { message = "File uploaded successfully!" });
//         }
//     }
// }
