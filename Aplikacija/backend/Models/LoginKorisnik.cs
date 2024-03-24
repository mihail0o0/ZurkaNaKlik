using System.ComponentModel;

namespace backend.Models

{
    public class LoginKorisnik
    {
        public required string Email { get; set; }
        public required string Lozinka { get; set; }
    }
}