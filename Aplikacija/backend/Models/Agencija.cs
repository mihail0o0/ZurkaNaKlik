using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Agencija : KorisnikAgencija
    {
        public required string Lokacija { get; set; }
        public required string Opis { get; set; }
        [Column("Role")]
        public override Roles Role { get; set; }
        // public Meni Meni { get; set; }
        [Range(0, 5)]
        public int? Ocena { get; set; }
        public int BrojOcena { get; set; } = 0;

    }
}