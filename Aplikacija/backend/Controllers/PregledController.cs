using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PregledController : ControllerBase
    {
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public PregledController(ZurkaNaKlikDbContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }

        #region GetKorisnik
        [HttpGet("GetKorisnik/{idK}")]
        public async Task<IActionResult> GetKorisnik(int idK)
        {
            try
            {
                Korisnik korisnik = await Context.Korisnici.Where(x => x.Id == idK).FirstAsync();

                if (korisnik == null)
                {
                    return BadRequest("Nema korisnika za prikaz");
                }

                GetKorisnikResult result = ObjectCreatorSingleton.Instance.ToKorisnikResult(korisnik);
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

       #region PrikaziOglaseKorisnika
        [HttpGet("PrikaziOglaseKorisnika/{idkorisnika}")]
        public async Task<ActionResult> PrikaziOglaseKorisnika(int idkorisnika)
        {
            try
            {
    

                Korisnik? korisnik = await Context.Korisnici.Include(o => o.ListaObjavljenihOglasaObjekta).FirstOrDefaultAsync(k => k.Id == idkorisnika);

                if (korisnik == null)
                {
                    return BadRequest("Korisnik nema objavljene oglase");
                }

                
                await Context.SaveChangesAsync();

                List<OglasObjektaResponse> response = new List<OglasObjektaResponse>();

                if (korisnik.ListaObjavljenihOglasaObjekta == null)
                {
                    return Ok(response);
                }

                foreach (OglasObjekta oglas in korisnik.ListaObjavljenihOglasaObjekta)
                {
                    response.Add(ObjectCreatorSingleton.Instance.ToOglasResult(oglas));
                }

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        #endregion
       
        #region VratiKategorije
        [HttpGet("VratiKategorije/{idagencije}")]       
         public async Task<ActionResult> VratiKategorije(int idagencije) {
            try
            {
                

                Agencija? agencija = await Context.Agencije.FindAsync(idagencije);
                if (agencija == null)
                {
                    return BadRequest("Ne postoji agencija sa tim id-jem");
                }

                List<Kategorija>? kategorija = await Context.Kategorije.Where(k => k.Agencija!.Id == idagencije).ToListAsync();

                return Ok(kategorija);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        #endregion

        #region VratiSveKategorijeNekeAgencije(idAgencije) *SA LISTOM MENIJA*


        [HttpGet("VratiSveKategorijeNekeAgencije/{idAgencije}")]
        public async Task<IActionResult> VratiSveKategorijeNekeAgencije(int idAgencije)
        {
            try
            {
                var kategorije = await Context.Kategorije.Include(x => x.ListaMenija).Where(x => x.Agencija!.Id == idAgencije).ToListAsync();


                if (kategorije == null)
                {
                    return BadRequest("Nema takvih kategorija i agencija zajedno");
                }
                else
                {
                    return Ok(new { kategorije });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        #endregion
        
        #region PrikaziAgenciju
        [HttpGet("PrikaziAgenciju/{idAgencije}")]
        public async Task<ActionResult> PrikaziAgenciju(int idAgencije)
        {
            try
            {
                var agencija = await Context.Agencije.Include(x => x.KategorijeMenija).Where(x => x.Id == idAgencije).FirstOrDefaultAsync();

                if (agencija == null)
                {
                    return Ok("Ne postoji trazena agencija");
                }

                return Ok(agencija);


            }
            catch (Exception e)
            {
                return BadRequest(e.Message);

            }
        }

        #endregion

        #region VratiMenijeSaKategorijama
        [HttpGet("VratiMenijeSaKategorijama/{idagencije}")]
        public async Task<ActionResult> VratiMenije(int idagencije)
        {
            try
            {
                
                List<Kategorija>? kategorije = await Context.Kategorije.Where(k => k.Agencija!.Id == idagencije).ToListAsync();

                List<VratiMenijeResultElement>? meniKeteringa = new();

                if (kategorije == null)
                {
                    return Ok(meniKeteringa);
                }

                foreach (Kategorija kat in kategorije)
                {
                    VratiMenijeResultElement element = new(kat.Id, kat.Naziv);
                    List<MeniKeteringa>? meniji = await Context.MenijiKeteringa.Where(m => m.Kategorija!.Id == kat.Id).ToListAsync();
                    element.meniKeteringa = meniji;

                    meniKeteringa.Add(element);
                }

                return Ok(meniKeteringa);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }

        #endregion
   
        #region  PrikaziSveMenijeKategorije
        [HttpGet("PrikaziSveMenijeKategorije/{idKategorije}")]
        public async Task<IActionResult> PrikaziSveMenije(int idKategorije){
            try{

                var meniji = await Context.MenijiKeteringa.Where(k=>k.Kategorija!.Id== idKategorije).ToListAsync();

            if (meniji == null){
                return BadRequest("Nema takvih kategorija i agencija zajedno");
            }
            else {
                return Ok(meniji);
            }   

            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }

        }

        #endregion

        #region VratiSveKategorijeIMenijeAgencije
        [HttpGet("VratiSveKategorijeIMenijeAgencije/{idagencije}")]
public async Task<ActionResult> VratiSveKategorijeIMenijeAgencije(int idagencije) {
    try {
        var sveinfoagencije = await Context.Kategorije
                                           .Include(x => x.Agencija)
                                           .Include(x => x.ListaMenija)
                                           .Where(x => x.Agencija!.Id == idagencije)
                                           .ToListAsync();

        if (sveinfoagencije == null || !sveinfoagencije.Any()) {
            return BadRequest("Nema agencije sa tim id-jem");
        }

        var result = sveinfoagencije.Select(k => new {
            k.Id,
            k.Naziv,
            ListaMenija = k.ListaMenija!.Select(m => new {
                m.Id,
                m.Naziv,
                m.SastavMenija,
                m.CenaMenija,
                m.Slika,
                m.Opis

                
            })
        });

        return Ok(result);
    } catch (Exception e) {
        return BadRequest(e.Message);
    }
}


        #endregion

     
     
       
    }





}