
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

        public LoginResult CreateLoginResult(KorisnikAgencija korisnikAgencija, Korisnik? korisnik = null, Agencija? agencija = null)
        {
            LoginResult loginResult = new LoginResult
            {
                id = korisnikAgencija.Id,
                ime = korisnikAgencija.Ime,
                email = korisnikAgencija.Email,
                brTel = korisnikAgencija.BrTel,
                role = korisnikAgencija.Role,
                slikaProfila = korisnikAgencija.SlikaProfila,
                lokacija = korisnikAgencija.Lokacija,
                prezime = korisnik?.Prezime,
                opis = agencija?.Opis,
                ocena = agencija?.Ocena,
                brojOcena = agencija?.BrojOcena,
                mogucnostDostave = agencija?.MogucnostDostave,
                cenaDostave = agencija?.CenaDostave,
            };
            return loginResult;
        }

    }
}