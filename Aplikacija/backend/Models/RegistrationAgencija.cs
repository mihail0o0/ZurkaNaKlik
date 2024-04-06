using System.ComponentModel;

namespace backend.Models

{
    public class RegistrationAgencija
    {
        public required string Ime { get; set; }
        public required string Prezime { get; set; }
        public required string Email { get; set; }
        public required string BrTel { get; set; }
        public required string Lozinka { get; set; }
        public Roles Role { get; set; } = Roles.Korisnik;

        //List<OglasObjekta> ListaOglasaObjekta
        //List<OglasObjekta> ListaOmiljenihOglasaObjekata 
        public string? SlikaProfila { get; set; }
    }
}