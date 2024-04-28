using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class MeniKeteringa
    {
        [Key]
        public int Id { get; set; }
        public required string Naslov { get; set; }// Novogodisnji/Koktel/Svesdki/Silver itd

        public required int CenaMenija { get; set; } //po kg
    
        public required string Slika { get; set; }

        public required string Opis { get; set; }

       // public int KolicinaUKG { get; set; } //?

        public  List<string>? StavkeJela {get; set; }// pecivo, cevapi
        public  Kategorija? Kategorija { get; set; }//Slatko/slano


    }

    
}