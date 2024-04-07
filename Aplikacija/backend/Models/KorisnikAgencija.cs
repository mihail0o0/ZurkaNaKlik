using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class KorisnikAgencija
    {
        [Key]
        public int Id { get; set; }
        public required string Ime { get; set; }
        [EmailAddress(ErrorMessage = "Email adresa nije u ispravnom formatu.")]
        public required string Email { get; set; }
        public required string BrTel { get; set; }
        public required string LozinkaHash { get; set; }
        [Column("Role")]
        public virtual Roles Role { get; set; }
        public string? SlikaProfila { get; set; }
    }
}