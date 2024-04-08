using System.ComponentModel;

namespace backend.Models

{
    public class Login
    {
        [EmailAddress(ErrorMessage = "Email adresa nije u ispravnom formatu.")]
        public required string Email { get; set; }
        public required string Lozinka { get; set; }
    }
}