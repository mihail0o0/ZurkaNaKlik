using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ZakupljeniOglas
    {
        [Key]
        public int Id { get; set; }
        public OglasObjekta? Oglas { get; set; }
        public Korisnik? Korisnik { get; set; }
        public DateTime DatumZakupa { get; set; }
        public DateTime ZakupljenOd { get; set; }
        public DateTime ZakupljenDo { get; set; }

        [ForeignKey("ZakupljeniOglas")]
        public ZahtevZaKetering? ZahtevZaKetering { get; set; }


    }
}