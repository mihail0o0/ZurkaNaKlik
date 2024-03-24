using System.ComponentModel;

namespace backend.Models

{
    public class Korisnik
    {
        [Key]
        public int Id { get; set; }
        public required string Ime { get; set; }
        public required string Prezime { get; set; }
        public required string Email { get; set; }
        public required string BrTel { get; set; }
        
        public required string LozinkaHash { get; set; }
        [Column("role")]
        public Roles Role { get; set; } = Roles.Korisnik;

        //List<OglasObjekta> ListaOglasaObjekta
        //List<OglasObjekta> ListaOmiljenihOglasaObjekata 
        public string? SlikaProfila { get; set; }

    }
}