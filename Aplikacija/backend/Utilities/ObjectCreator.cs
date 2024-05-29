
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

        public Agencija FromRegistrationAgencija(RegistrationAgencija registrationAgencija, string passwordHash)
        {
            var agencija = new Agencija
            {
                Ime = registrationAgencija.name,
                Email = registrationAgencija.email,
                BrTel = registrationAgencija.phoneNumber,
                LozinkaHash = passwordHash,
                Role = Roles.Agencija,
                Lokacija = registrationAgencija.location
            };

            return agencija;
        }

        public GetKorisnikResult ToKorisnikResult(Korisnik korisnik)
        {
            GetKorisnikResult getKorisnik = new GetKorisnikResult
            {
                id = korisnik.Id,
                name = korisnik.Ime,
                lastName = korisnik.Prezime,
                email = korisnik.Email,
                phoneNumber = korisnik.BrTel,
                role = korisnik.Role,
                profilePhoto = korisnik.SlikaProfila,
                location = korisnik.Lokacija
            };

            return getKorisnik;
        }


    }
}