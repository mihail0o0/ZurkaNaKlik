using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Korisnik")]
    public class KorisnikController : Controller
    {
        private readonly IUserService _userService;
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public KorisnikController(ZurkaNaKlikDbContext context, IConfiguration configuration, IUserService userService)
        {
            Context = context;
            _configuration = configuration;
            _userService = userService;
        }

        #region DodajOmiljeniOglas
        [HttpPut("DodajOmiljeniOglas/{idOglasa}")]
        public async Task<ActionResult> DodajOmiljeniOglas(int idOglasa)
        {
            try
            {
                // var currId = _userService.GetMyId();
                // if(currId != idKorisnika.ToString()){
                //     return BadRequest("Nisi ti taj bebo");
                // }
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                Korisnik? korisnik = await Context.Korisnici.Include(k => k.ListaOmiljenihOglasaObjekata).FirstOrDefaultAsync(k => k.Id == idKorisnika);

                if (korisnik == null)
                {
                    return BadRequest("Korisnik ne postoji");
                }

                OglasObjekta? oglas = await Context.OglasiObjekta.FirstOrDefaultAsync(o => o.Id == idOglasa);

                if (oglas == null)
                {
                    return BadRequest("Oglas ne postoji");
                }

                if (korisnik.ListaOmiljenihOglasaObjekata != null && korisnik.ListaOmiljenihOglasaObjekata.Any(o => o.Id == idOglasa))
                {
                    return BadRequest("Oglas već postoji u listi omiljenih oglasa korisnika");
                }

                korisnik.ListaOmiljenihOglasaObjekata?.Add(oglas);
                await Context.SaveChangesAsync();
                

                return Ok(new { korisnik.ListaOmiljenihOglasaObjekata });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } 
        #endregion
        

        #region GetKorisnik
        [HttpGet("GetKorisnik/{idK}")]
        public async Task<IActionResult> GetKorisnik(int idK){
            try{
                var korisnik = await Context.Korisnici.Where(x =>x.Id == idK).FirstAsync();

                if (korisnik == null){
                    return BadRequest("Nema korisnika za prikaz");
                }

                return  Ok(new { korisnik });
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion
        //Da vrati sve zakupljene oglase jednog korisnika ako adminu to treba

        #region PrikaziSveZakupljeneOglase
        [HttpGet("PrikaziSveZakupljeneOglase")]
        public async Task<IActionResult> PrikaziSveKorisnike(){
             try{
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                var korisnik = await Context.Korisnici.Where(x =>x.Id == idKorisnika).FirstAsync();

                if (korisnik == null){
                    return BadRequest("Nema korisnika za prikaz");
                }

                var listaoglasa = korisnik.ListaZakupljenihOglasa;

                if (listaoglasa == null){
                    return BadRequest("Dati korisnik nema zakupljenih oglasa");
                }

                return Ok(new { listaoglasa });
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region DodajOglas
        [HttpPost("DodajOglas")]
        public async Task<ActionResult> DodajOglas([FromBody]OglasObjekta dodatOglas){

            try{
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                Korisnik? korisnik = await Context.Korisnici.FindAsync(idKorisnika);
                
                if (korisnik == null){
                    return BadRequest("Korisnik ne postoji");
                }
                
                var oglas = new OglasObjekta
                {
                    ListaTipProslava = dodatOglas.ListaTipProslava,
                    ListaTipProstora = dodatOglas.ListaTipProstora,
                    Naziv = dodatOglas.Naziv,
                    Grad = dodatOglas.Grad,
                    Lokacija = dodatOglas.Lokacija,
                    CenaPoDanu = dodatOglas.CenaPoDanu,
                    BrojSoba = dodatOglas.BrojSoba,
                    Kvadratura = dodatOglas.Kvadratura,
                    BrojKreveta = dodatOglas.Kvadratura,
                    BrojKupatila = dodatOglas.BrojKupatila,
                    Grejanje = dodatOglas.Grejanje,
                    ListDodatneOpreme = dodatOglas.ListDodatneOpreme,
                    BrTel = dodatOglas.BrTel,
                    Opis = dodatOglas.Opis,
                    Slike = dodatOglas.Slike,
                    BrojOcena = dodatOglas.BrojOcena,
                    VlasnikOglasa = korisnik
                };

                /*korisnik.ListaObjavljenihOglasaObjekta?.Add(oglas);*/
                // Postavljanje vlasnika oglasa

                // Dodavanje oglasa u DbSet
                Context.OglasiObjekta.Add(oglas);

                // Čuvanje promena u bazi podataka
                await Context.SaveChangesAsync();

                return Ok(new {Context.OglasiObjekta});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ObrisiOglas
        [HttpDelete("ObrisiOglas/{idOglasa}")]
        public async Task<ActionResult> ObrisiOglas(int idOglasa){

            try{
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                Korisnik? korisnik = await Context.Korisnici.FindAsync(idKorisnika);
                
                if (korisnik == null){
                    return BadRequest("Korisnik ne postoji");
                }

                OglasObjekta? oglas = await Context.OglasiObjekta.FindAsync(idOglasa);
                
                if (oglas == null){
                    return BadRequest("Oglas ne postoji");
                }

                if(oglas.VlasnikOglasa!.Id != korisnik.Id){
                    return BadRequest("Ti nisi vlasnik oglasa bato");
                }
                

                Context.OglasiObjekta.Remove(oglas);
                await Context.SaveChangesAsync();

                return Ok(new {Context.OglasiObjekta});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        //ovde je sve odjednom ne mora svaki properti da ima posebno azuriranje
        #region IzmeniOglas
        [HttpPut("IzmeniOglas")]
        public async Task<ActionResult> IzmeniOglas([FromBody]OglasObjekta o){

            try{
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                OglasObjekta? oglas = await Context.OglasiObjekta.Where(k => k.Id == o.Id)
                                                            .IgnoreQueryFilters()
                                                            .FirstOrDefaultAsync(o => o.VlasnikOglasa!.Id == idKorisnika);
                

                if (oglas == null){
                    return BadRequest("Oglas ne postoji");
                }
                
                oglas.ListaTipProslava = o.ListaTipProslava;
                oglas.ListaTipProstora = o.ListaTipProstora;
                oglas.Naziv = o.Naziv;
                oglas.Grad = o.Grad;
                oglas.Lokacija = o.Lokacija;
                oglas.CenaPoDanu = o.CenaPoDanu;
                oglas.BrojSoba = o.BrojSoba;
                oglas.Kvadratura = o.Kvadratura;
                oglas.BrojKreveta = o.BrojKreveta;
                oglas.BrojKupatila = o.BrojKupatila;
                oglas.Grejanje = o.Grejanje;
                oglas.ListDodatneOpreme = o.ListDodatneOpreme;
                oglas.BrTel = o.BrTel;
                oglas.Opis = o.Opis;
                oglas.Slike = o.Slike;
                

                
                await Context.SaveChangesAsync();

                return Ok(new { oglas });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion 

        #region OceniAgenciju
        [HttpPut("OceniAgenciju/{idAgencije}/{novaOcena}")]
        public async Task<ActionResult> OceniAgenciju(int idAgencije, int novaOcena){
            try{

                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                
                var agencija = await Context.Agencije.FindAsync(idAgencije);

                if (agencija== null){
                    return BadRequest("Ne postoji takva agencija");
                }

                agencija.BrojOcena++;

                agencija.Ocena = (agencija.Ocena + novaOcena)/agencija.BrojOcena;

                Context.Agencije.Update(agencija);

                await Context.SaveChangesAsync();

                return Ok(agencija);

                

            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
        #endregion


#region ZakupiOglas
[HttpPost("ZakupiOglas/{idOglasa}/trazenidatumi")]
public async Task<ActionResult> ZakupiOglas(int idOglasa, List<DateTime> trazenidatumi){
    try {
        int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

        var korisnik = await Context.Korisnici.FindAsync(idKorisnika);



        OglasObjekta? oglas = await Context.OglasiObjekta.FindAsync(idOglasa);

        if (oglas == null){
            return BadRequest("ne postoji takav objekat");
        }

        bool slobodan = !oglas.ZauzetiDani!.Any(date => trazenidatumi.Contains(date));

        if (slobodan){
            oglas.ZauzetiDani!.AddRange(trazenidatumi);
            await Context.SaveChangesAsync();

            var zakupljenoglas = new ZakupljeniOglas {
                Oglas = oglas,
                Korisnik = korisnik!,
                DatumZakupa = DateTime.Now,
                ZakupljenOd = trazenidatumi[0],
                ZakupljenDo = trazenidatumi[trazenidatumi.Count - 1]
            };

            return Ok(new { zakupljenoglas});

        }  
        else {
            return BadRequest("Objekat je zauzet u datom periodu");
        }

    }
    catch(Exception ex){
        return BadRequest(ex.Message);
    }
}

#endregion



//zakupi ketering!! samo uz objekat



        
// Prikaz omiljenih oglasa (idKorisnika)
// Izmena podataka (idKorisnika)
// Obrisi nalog
// Dodaj omiljeni oglas (idKorisnika, idOglasa)
    }


}