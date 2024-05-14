
using System.Net.NetworkInformation;
using backend.DTOs;
using Microsoft.AspNetCore.Identity.Data;

namespace backend.Utilities
{
    public class ObjectCreatorSingleton
    {
        private static ObjectCreatorSingleton? instance;

        private ObjectCreatorSingleton() { }

        public static ObjectCreatorSingleton Instance
        {
            get
            {
                return instance ??= new ObjectCreatorSingleton();
            }
        }

        public LoginResult ToLoginResult(KorisnikAgencija korisnikAgencija)
        {
            LoginResult loginResult = new LoginResult
            {
                id = korisnikAgencija.Id,
                name = korisnikAgencija.Ime,
                email = korisnikAgencija.Email,
                phoneNumber = korisnikAgencija.BrTel,
                role = korisnikAgencija.Role,
            };
            return loginResult;
        }

        public Korisnik FromRegistrationKorisnik(RegistrationKorisnik registrationKorisnik, string passwordHash)
        {
            var korisnik = new Korisnik
            {
                Ime = registrationKorisnik.name,
                Prezime = registrationKorisnik.lastName,
                Email = registrationKorisnik.email,
                BrTel = registrationKorisnik.phoneNumber,
                LozinkaHash = passwordHash,
                Role = Roles.Korisnik,
                Lokacija = registrationKorisnik.location
            };

            return korisnik;
        }


    }
}