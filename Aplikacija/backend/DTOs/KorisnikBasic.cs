using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backend.Models
{
    public class KorisnikBasic
    {
        public int Id { get; set; }
        public required string Ime { get; set; }
        public required string Prezime { get; set; }
        public required string Email { get; set; }
        public required string BrTel { get; set; }
        public required string Lokacija { get; set; }
    }
}