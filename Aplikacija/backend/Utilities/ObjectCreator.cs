
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
                name = korisnikAgencija.Ime,
                email = korisnikAgencija.Email,
                phoneNumber = korisnikAgencija.BrTel,
                role = korisnikAgencija.Role,
                location = korisnikAgencija.Lokacija,
                lastName = korisnik?.Prezime,
                description = agencija?.Opis,
                grade = agencija?.Ocena,
                numberOfGrades = agencija?.BrojOcena,
                doesDelivery = agencija?.MogucnostDostave,
                deliveryPrice = agencija?.CenaDostave,
            };
            return loginResult;
        }

    }
}