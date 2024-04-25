using System.ComponentModel;

namespace backend.Models

{
    public class Korisnik : KorisnikAgencija
    {
        public required string Prezime { get; set; }
        [Column("Role")]
        public override Roles Role { get; set; }
        [InverseProperty("VlasnikOglasa")]
        public List<OglasObjekta>? ListaObjavljenihOglasaObjekta { get; set; }
        [InverseProperty("ListaKorisnikaKojimaJeOmiljeniOglas")]
        public List<OglasObjekta>? ListaOmiljenihOglasaObjekata { get; set; }


        public List<ZakupljeniOglas>? ListaZakupljenihOglasa { get; set; }
        
        

    }
}