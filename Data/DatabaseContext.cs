using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace WebApplication1.Data;

public class DatabaseContext : DbContext
{
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Cargo> Cargoes { get; set; }
    public DbSet<CargoTransit> CargoTransits { get; set; }
    
    public DbSet<Transit> Transits { get; set; }
    
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
        modelBuilder.Entity<Cargo>().HasMany(x => x.Transits).WithMany(x => x.AssignedCargo)
            .UsingEntity<CargoTransit>(
                x => x.HasOne(y => y.Transit)
                    .WithMany(z => z.CargoTransits).HasForeignKey(q => q.TransitId),
                x => x.HasOne(y => y.Cargo)
                    .WithMany(z => z.CargoTransits).HasForeignKey(q => q.CargoId),
                x => x.HasKey(y => new {y.CargoId, y.TransitId}));

        modelBuilder.Entity<Cargo>().HasMany(x => x.AssignedInnerWorks).WithMany(x => x.AffectedCargo);
    }
}