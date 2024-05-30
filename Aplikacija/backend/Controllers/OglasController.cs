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
    public class OglasController : ControllerBase
    {
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public OglasController(ZurkaNaKlikDbContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }

        #region PrikaziOglas
        [HttpGet("PrikaziOglas/{idOglasa}")]
        public async Task<ActionResult> PrikaziOglas(int idOglasa)
        {
            try
            {
                OglasObjekta? oglas = await Context.OglasiObjekta
                                    .Include(o => o.VlasnikOglasa)
                                    .FirstOrDefaultAsync(o => o.Id == idOglasa);

                if (oglas == null)
                {
                    return BadRequest("Oglas ne postoji");
                }

                OglasObjektaResponse response = ObjectCreatorSingleton.Instance.ToOglasResult(oglas);
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region VratiOglaseSaFilterimaISortiranjem
        [HttpPost("VratiOglase/{pageNumber}/{pageSize}")]
        public async Task<ActionResult> VratiOglase([FromBody] Filters filteri, int pageNumber, int pageSize)
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
                List<OglasObjekta> oglasi = await Context.OglasiObjekta.ToListAsync();

                switch (filteri.sort)
                {
                    case "CenaRastuca":
                        oglasi = oglasi.OrderBy(o => o.CenaPoDanu).ToList();
                        break;
                    case "CenaOpadajuce":
                        oglasi = oglasi.OrderByDescending(o => o.CenaPoDanu).ToList();
                        break;
                    case "OcenaRastuce":
                        oglasi = oglasi.OrderBy(o => ((double)(o.Ocena ?? 0))).ToList();
                        break;
                    case "OcenaOpadajuce":
                        oglasi = oglasi.OrderByDescending(o => ((double)(o.Ocena ?? 0))).ToList();
                        break;
                    default:
                        return BadRequest("Ne postoji sort");
                }

                if (filteri.tipProslava != null && filteri.tipProslava!.Count != 0)
                {
                    oglasi = oglasi.Where(oglas => oglas.ListaTipProslava.Any(tip => filteri.tipProslava!.Contains(tip))).ToList();
                }

                if (filteri.tipProstora != null && filteri.tipProstora!.Count != 0)
                {
                    oglasi = oglasi.Where(oglas => oglas.ListaTipProstora.Any(tip => filteri.tipProstora!.Contains(tip))).ToList();
                }

                if (filteri.grad != null)
                {
                    oglasi = oglasi.Where(oglas => oglas.Grad.Equals(filteri.grad)).ToList();
                }

                if (filteri.cenaOd >= 0 && filteri.cenaDo <= Int32.MaxValue && filteri.cenaOd < filteri.cenaDo)
                {
                    oglasi = oglasi.Where(oglas => oglas.CenaPoDanu >= filteri.cenaOd && oglas.CenaPoDanu <= filteri.cenaDo).ToList();
                }

                if (filteri.kvadraturaOd >= 0 && filteri.kvadraturaDo <= Int32.MaxValue && filteri.kvadraturaOd < filteri.kvadraturaDo)
                {
                    oglasi = oglasi.Where(oglas => oglas.Kvadratura >= filteri.kvadraturaOd && oglas.Kvadratura <= filteri.kvadraturaDo).ToList();
                }

                if (filteri.grejanje != null)
                {
                    oglasi = oglasi.Where(oglas => filteri.grejanje.Contains(oglas.Grejanje)).ToList();
                }

                if (filteri.dodatnaOprema != null && filteri.dodatnaOprema!.Count != 0)
                {
                    oglasi = oglasi.Where(oglas => oglas.ListDodatneOpreme.Any(tip => filteri.dodatnaOprema!.Contains(tip))).ToList();
                }

                List<DateTime> sviDaniUOpsegu = Enumerable.Range(0, (filteri.datumDo.Date - filteri.datumOd.Date).Days + 1)
                                            .Select(offset => filteri.datumOd.AddDays(offset))
                                            .ToList();

                oglasi = oglasi.Where(oglas => !oglas.ZauzetiDani!.Any(zauzetDan => sviDaniUOpsegu.Contains(zauzetDan)))
                            .ToList();

                oglasi = oglasi.Skip((pageNumber - 1) * pageSize)
                             .Take(pageSize).ToList();

                List<OglasObjektaResponse> response = new List<OglasObjektaResponse>();

                foreach (OglasObjekta oglas in oglasi)
                {
                    response.Add(ObjectCreatorSingleton.Instance.ToOglasResult(oglas));
                }

                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        #endregion


        [HttpGet("VratiSveGradove")]
        public async Task<IActionResult> VratiSveGradove()
        {
            try
            {
                List<string>? gradovi = await Context.OglasiObjekta.Select(x => x.Grad).Distinct().ToListAsync();

                if (gradovi == null)
                {
                    return BadRequest("Nema jos objekata pa ni gradova");
                }

                return Ok(gradovi);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("VratiKategorije")]
        public async Task<IActionResult> VratiKategorije()
        {
            try
            {
                List<string>? kategorije = await Context.Kategorije.Select(x => x.Naziv).Distinct().ToListAsync();

                if (kategorije == null)
                {
                    return BadRequest("Nema kategorija");
                }

                return Ok(kategorije);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("VratiOglas")]
        public async Task<IActionResult> VratiOglas()
        {
            try
            {
                List<string>? gradovi = await Context.OglasiObjekta.Select(x => x.Grad).Distinct().ToListAsync();

                if (gradovi == null)
                {
                    return BadRequest("Nema jos objekata pa ni gradova");
                }

                return Ok(gradovi);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("VratiVlasnikaObjavljenogOglasa/{idoglasa}")]
        public async Task<IActionResult> VratiVlasnikaObjavljenogOglasa(int idoglasa)
        {
            try
            {

                var vlasnik = await Context.OglasiObjekta.Where(x =>x.Id == idoglasa).Select(x => 
                    x.VlasnikOglasa).FirstOrDefaultAsync();
            

                if (vlasnik == null)
                {
                    return BadRequest("Nema vlasnika oglasa za ovaj objekat, postoji neka greska");
                }

                return Ok(vlasnik);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}