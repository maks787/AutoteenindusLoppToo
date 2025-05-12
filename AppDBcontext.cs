using Autoteenindus.models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Service> Myservices { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<ForumMessage> ForumMessages { get; set; }
    public DbSet<CarReview> CarReviews { get; set; }
    public DbSet<MarketplaceCar> MarketplaceCars { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany()
            .HasForeignKey(b => b.UserId);

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Service)
            .WithMany()
            .HasForeignKey(b => b.ServiceId);
    }
}
