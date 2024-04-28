namespace WebTemplate.Models;

public class ZurkaNaKlikDbContext : DbContext
{
    public DbSet<KorisnikAgencija> KorisnikAgencijas { get; set; }
    public DbSet<Korisnik> Korisniks { get; set; }
    public DbSet<Agencija> Agencije { get; set; }
    public DbSet<OglasObjekta> OglasObjektas { get; set; }
    public DbSet<ZahtevZaKetering> ZahtevZaKeterings { get; set; }
    public DbSet<MeniKeteringa> MeniKeteringas { get; set; }
    public DbSet<ZakupljeniOglas> ZakupljeniOglasi { get; set; }
    

    public ZurkaNaKlikDbContext(DbContextOptions options) : base(options)
    {
        
    }
}
