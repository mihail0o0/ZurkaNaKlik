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

        #region VratiAgencijeSaFilterimaISortiranjem
        [HttpPost("VratiAgencije/{pageNumber}/{pageSize}")]
        public async Task<ActionResult> VratiOglase([FromBody] FilteriAgencije filteri, int pageNumber, int pageSize)
        { //dodaj sortiranje
            try
            {
                // public class Filters
                // {
                //     public List<EnumTipProslava>? TipProslava { get; set; }
                //     public List<EnumTipProstora>? TipProstora { get; set; }
                //     public string? Grad { get; set; }
                //     public int CenaOd { get; set; }
                //     public int CenaDo { get; set; }
                //     public int KvadraturaOd { get; set; }
                //     public int KvadraturaDo { get; set; }
                //     public List<EnumGrejanje>? Grejanje { get; set; }
                //     public List<EnumDodatnaOprema>? DodatnaOprema { get; set; }
                //     public DateTime DatumOd { get; set; }
                //     public DateTime DatumDo { get; set; }
                // }
                List<Agencija> agencije = await Context.Agencije.IgnoreQueryFilters().Include(i => i.KategorijeMenija).ToListAsync();

                switch (filteri.sort)
                {
                    case "CenaDostaveRastuca":
                        agencije = agencije.OrderBy(o => o.CenaDostave).ToList();
                        break;
                    case "CenaDostaveOpadajuce":
                        agencije = agencije.OrderByDescending(o => o.CenaDostave).ToList();
                        break;
                    case "OcenaRastuce":
                        agencije = agencije.OrderBy(o => ((double)(o.Ocena ?? 0))).ToList();
                        break;
                    case "OcenaOpadajuce":
                        agencije = agencije.OrderByDescending(o => ((double)(o.Ocena ?? 0))).ToList();
                        break;
                    default:
                        return BadRequest("Ne postoji sort");
                }

                if (filteri.ListaKategorija != null && filteri.ListaKategorija!.Count != 0)
                {
                    agencije = agencije.Where(agencija => agencija.KategorijeMenija!.Any(tip => filteri.ListaKategorija!.Contains(tip.Naziv))).ToList();
                }

                if (filteri.Grad != null)
                {
                    agencije = agencije.Where(Agencija => Agencija.Lokacija.Equals(filteri.Grad)).ToList();
                }

                if (filteri.MogucnostDostave == true)
                {
                    agencije = agencije.Where(oglas => oglas.MogucnostDostave == true).ToList();

                    if (filteri.CenaDostaveOd >= 0 && filteri.CenaDostaveDo <= Int32.MaxValue && filteri.CenaDostaveOd < filteri.CenaDostaveDo)
                    {
                        agencije = agencije.Where(agencija => agencija.CenaDostave >= filteri.CenaDostaveOd && agencija.CenaDostave <= filteri.CenaDostaveDo).ToList();
                    }
                }


                //List<OglasObjektaResponse> response = new List<OglasObjektaResponse>();

                

                return Ok(new { agencije });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        #endregion
     
       
    }





}