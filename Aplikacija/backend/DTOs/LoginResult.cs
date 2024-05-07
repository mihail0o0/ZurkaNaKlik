using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class LoginResult
    {
        public int Id { get; set; }
        public required string Ime { get; set; }
        public required string Email { get; set; }
        public required string BrTel { get; set; }
        public required Roles Role { get; set; }
        public string? SlikaProfila { get; set; }
        public string? Lokacija { get; set; }
        public string? Prezime { get; set; }
        public string? Opis { get; set; }
        public int? Ocena { get; set; }
        public int? BrojOcena { get; set; } = 0;
        public bool? MogucnostDostave { get; set; }
        public int? CenaDostave { get; set; }
    }
}