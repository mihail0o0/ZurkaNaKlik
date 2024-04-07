using System.ComponentModel;

namespace backend.Models

{
    public class Korisnik : KorisnikAgencija
    {
        public required string Prezime { get; set; }
        [Column("Role")]
        public override Roles Role { get; set; }
        //List<OglasObjekta> ListaOglasaObjekta
        //List<OglasObjekta> ListaOmiljenihOglasaObjekata 
        

    }
}