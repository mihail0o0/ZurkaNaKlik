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

        #region DodajOglas
        [HttpPost("DodajOglas/{idKorisnik}")]
        public async Task<ActionResult> DodajOglas([FromBody]OglasObjekta dodatOglas, int idKorisnik){

            try{

                Korisnik? korisnik = await Context.Korisnici.FindAsync(idKorisnik);
                
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
        [HttpDelete("ObrisiOglas/{idOglasa}/{idKorisnik}")]
        public async Task<ActionResult> ObrisiOglas(int idOglasa, int idKorisnik){

            try{

                Korisnik? korisnik = await Context.Korisnici.FindAsync(idKorisnik);
                
                if (korisnik == null){
                    return BadRequest("Korisnik ne postoji");
                }

                OglasObjekta? oglas = await Context.OglasiObjekta.FindAsync(idOglasa);
                
                if (oglas == null){
                    return BadRequest("Oglas ne postoji");
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

        #region PrikaziOglas
        [HttpGet("PrikaziOglas/{idOglasa}")]
        public async Task<ActionResult> PrikaziOglas(int idOglasa){

            try{
                OglasObjekta? oglas = await Context.OglasiObjekta
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
        #endregion

        //ovde je sve odjednom ne mora svaki properti da ima posebno azuriranje
        #region IzmeniOglas
        [HttpPut("IzmeniOglas/{idOglasa}")]
        public async Task<ActionResult> IzmeniOglas([FromBody]OglasObjekta o,int idOglasa){

            try{
                OglasObjekta? oglas = await Context.OglasiObjekta.FindAsync(idOglasa);
                
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

                return Ok(new {Context.OglasiObjekta});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion 



    }
}