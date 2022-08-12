using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Data;

public class DatabaseContext : DbContext
{
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Cargo> Cargoes { get; set; }
    
    public DbSet<AcceptanceAndDispatching> AcceptanceAndDispatching { get; set; }
    
    public DbSet<InnerWork> InnerWorks { get; set; }

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
        modelBuilder.Entity<Cargo>().HasMany(x => x.AcceptanceAndDispatching).WithMany(x => x.AssignedCargo);

        modelBuilder.Entity<Cargo>().HasMany(x => x.AssignedInnerWorks).WithMany(x => x.AffectedCargo);
    }
}