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
        public required Agencija Agencija { get; set; }
        public required string Naslov { get; set; }
        public required string Opis { get; set; }
        public required string Slika { get; set; }
        public required double CenaPoOsobi { get; set; }
    }
}