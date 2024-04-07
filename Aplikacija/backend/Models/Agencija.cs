using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Agencija : KorisnikAgencija
    {
        [Required]
        public string? Lokacija { get; set; }
        [Required]
        public string? Opis { get; set; }
        [Column("Role")]
        public override Roles Role { get; set; }
        // public Meni Meni { get; set; }
        [Range(0, 5)]
        public int? Ocena { get; set; }
        public int BrojOcena { get; set; } = 0;

    }
}