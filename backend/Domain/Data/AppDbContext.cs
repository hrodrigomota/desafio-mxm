using backend.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Domain.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) 
    : base(options){
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Address> Address { get; set; }

    protected override void OnModelCreating(ModelBuilder builder) {

        builder.Entity<Address>()
        .HasOne(a => a.User)
        .WithOne(a => a.Address)
        .HasForeignKey<Address>(a => a.UserId)
        .IsRequired();

        base.OnModelCreating(builder);
    }
}
