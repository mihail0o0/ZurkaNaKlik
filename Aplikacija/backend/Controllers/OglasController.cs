using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OglasController : ControllerBase
    {
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public OglasController(ZurkaNaKlikDbContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }

        [HttpPost("DodajOglas/{idKorisnik}")]
        public async Task<ActionResult> DodajOglas([FromBody]OglasObjekta dodatOglas, int idKorisnik){

            try{

                Korisnik? korisnik = await Context.Korisniks.FindAsync(idKorisnik);
                
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
                };

                /*korisnik.ListaObjavljenihOglasaObjekta?.Add(oglas);*/
                
                oglas.VlasnikOglasa = korisnik; // Postavljanje vlasnika oglasa

                // Dodavanje oglasa u DbSet
                Context.OglasObjektas.Add(oglas);

                // Čuvanje promena u bazi podataka
                await Context.SaveChangesAsync();

                return Ok(new {Context.OglasObjektas});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("ObrisiOglas/{idOglasa}/{idKorisnik}")]
        public async Task<ActionResult> RegistrationKorisnik(int idOglasa, int idKorisnik){

            try{

                Korisnik? korisnik = await Context.Korisniks.FindAsync(idKorisnik);
                
                if (korisnik == null){
                    return BadRequest("Korisnik ne postoji");
                }

                OglasObjekta? oglas = await Context.OglasObjektas.FindAsync(idOglasa);
                
                if (oglas == null){
                    return BadRequest("Oglas ne postoji");
                }
                

                Context.OglasObjektas.Remove(oglas);
                await Context.SaveChangesAsync();

                return Ok(new {Context.OglasObjektas});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("PrikaziOglas/{idOglasa}")]
        public async Task<ActionResult> PrikaziOglas(int idOglasa){

            try{
                OglasObjekta? oglas = await Context.OglasObjektas
                                    .Include(o => o.VlasnikOglasa)
                                    .FirstOrDefaultAsync(o => o.Id == idOglasa);
                
                if (oglas == null){
                    return BadRequest("Oglas ne postoji");
                }
                

                return Ok(new {oglas});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPut("IzmeniOglas/{idOglasa}")]
        public async Task<ActionResult> IzmeniOglas(int idOglasa){

            try{
                OglasObjekta? oglas = await Context.OglasObjektas.FindAsync(idOglasa);
                
                if (oglas == null){
                    return BadRequest("Oglas ne postoji");
                }
                

                Context.OglasObjektas.Remove(oglas);
                await Context.SaveChangesAsync();

                return Ok(new {Context.OglasObjektas});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}