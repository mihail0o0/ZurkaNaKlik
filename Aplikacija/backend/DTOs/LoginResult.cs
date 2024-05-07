using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class LoginResult
    {
        public int id { get; set; }
        public required string ime { get; set; }
        public required string email { get; set; }
        public required string brTel { get; set; }
        public required Roles role { get; set; }
        public string? slikaProfila { get; set; }
        public string? lokacija { get; set; }
        public string? prezime { get; set; }
        public string? opis { get; set; }
        public int? ocena { get; set; }
        public int? brojOcena { get; set; } = 0;
        public bool? mogucnostDostave { get; set; }
        public int? cenaDostave { get; set; }
    }
}