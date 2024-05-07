using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KorisnikController : Controller
    {
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public KorisnikController(ZurkaNaKlikDbContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }

        [Authorize(Roles = "Korisnik")]
        [HttpPut("DodajOmiljeniOglas/{idKorisnika}/{idOglasa}")]
        public async Task<ActionResult> DodajOmiljeniOglas(int idKorisnika, int idOglasa)
        {
            try
            {
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

                return Ok(korisnik.ListaOmiljenihOglasaObjekata);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } 

        //admin valjda treba da moze da vidi sve korisnike

        [HttpGet("PrikaziSveKorisnike")]
        public async Task<IActionResult> PrikaziSveKorisnike(){
            try{
                var korisnici = await Context.Korisnici.ToListAsync();

                if (korisnici == null){
                    return BadRequest("Nema korisnika za prikaz");
                }

                return  Ok(korisnici);
                
            }
             catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("GetKorisnik/{idKorisnika}")]
        public async Task<IActionResult> GetKorisnik(int idKorisnika){
            try{
                var korisnik = await Context.Korisnici.Where(x =>x.Id == idKorisnika).FirstAsync();

                if (korisnik == null){
                    return BadRequest("Nema korisnika za prikaz");
                }

                return  Ok(korisnik);
                
            }
             catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //Da vrati sve zakupljene oglase jednog korisnika ako adminu to treba

         [HttpGet("PrikaziSveZakupljeneOglase/{idKorisnika}")]
        public async Task<IActionResult> PrikaziSveKorisnike(int idKorisnika){
             try{
                var korisnik = await Context.Korisnici.Where(x =>x.Id == idKorisnika).FirstAsync();

                if (korisnik == null){
                    return BadRequest("Nema korisnika za prikaz");
                }

                var listaoglasa = korisnik.ListaZakupljenihOglasa;

                 if (listaoglasa == null){
                    return BadRequest("Dati korisnik nema zakupljenih oglasa");
                }

                return Ok(listaoglasa);
                
            }
             catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }





       

    }
}