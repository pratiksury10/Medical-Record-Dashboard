using Microsoft.EntityFrameworkCore;
using HFilesBackend.Models;

namespace HFilesBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) {}

        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<MedicalFile> MedicalFiles { get; set; }
    }
}
