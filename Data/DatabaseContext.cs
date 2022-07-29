using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Data;

public class DatabaseContext : DbContext
{
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Cargo> Cargoes { get; set; }
    
    public DbSet<User> Users { get; set; }

    public DatabaseContext()
    {
        Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=sharpwhs;Username=root;Password=123");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseSerialColumns();
        modelBuilder.Entity<Cargo>().HasOne(x => x.Driver).WithMany(x => x.Cargoes).HasForeignKey(x => x.DriverId).IsRequired(false);

        modelBuilder.Entity<Driver>().HasOne(x => x.User).WithOne(x => x.DriverInfo).HasForeignKey<Driver>(x => x.UserId).IsRequired(false);
    }
}