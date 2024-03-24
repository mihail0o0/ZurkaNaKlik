namespace WebTemplate.Models;

public class ZurkaNaKlikDbContext : DbContext
{
    public DbSet<Korisnik> Korisniks { get; set; }

    public ZurkaNaKlikDbContext(DbContextOptions options) : base(options)
    {
        
    }
}
