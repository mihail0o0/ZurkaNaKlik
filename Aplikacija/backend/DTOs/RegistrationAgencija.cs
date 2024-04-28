using System.ComponentModel;

namespace backend.Models

{
    public class RegistrationAgencija
    {
        public required string Ime { get; set; }
        [EmailAddress(ErrorMessage = "Email adresa nije u ispravnom formatu.")]
        public required string Email { get; set; }
        public required string BrTel { get; set; }
        public required string Lozinka { get; set; }
        [Column("Role")]
        public virtual Roles Role { get; set; } = Roles.Agencija;
        public required string Lokacija { get; set; }
        
        
    }
}