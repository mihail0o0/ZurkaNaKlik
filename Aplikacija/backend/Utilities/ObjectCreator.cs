
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
                Id = korisnikAgencija.Id,
                Ime = korisnikAgencija.Ime,
                Email = korisnikAgencija.Email,
                BrTel = korisnikAgencija.BrTel,
                Role = korisnikAgencija.Role,
                SlikaProfila = korisnikAgencija.SlikaProfila,
                Lokacija = korisnikAgencija.Lokacija,
                Prezime = korisnik?.Prezime,
                Opis = agencija?.Opis,
                Ocena = agencija?.Ocena,
                BrojOcena = agencija?.BrojOcena,
                MogucnostDostave = agencija?.MogucnostDostave,
                CenaDostave = agencija?.CenaDostave,
            };
            return loginResult;
        }

    }
}