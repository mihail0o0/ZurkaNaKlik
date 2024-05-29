using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
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




                return Ok(new { oglas });
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

                switch (filteri.Sort)
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

                if (filteri.TipProslava != null && filteri.TipProslava!.Count != 0)
                {
                    oglasi = oglasi.Where(oglas => oglas.ListaTipProslava.Any(tip => filteri.TipProslava!.Contains(tip))).ToList();
                }

                if (filteri.TipProstora != null && filteri.TipProstora!.Count != 0)
                {
                    oglasi = oglasi.Where(oglas => oglas.ListaTipProstora.Any(tip => filteri.TipProstora!.Contains(tip))).ToList();
                }

                if (filteri.Grad != null)
                {
                    oglasi = oglasi.Where(oglas => oglas.Grad.Equals(filteri.Grad)).ToList();
                }

                if (filteri.CenaOd >= 0 && filteri.CenaDo <= Int32.MaxValue && filteri.CenaOd < filteri.CenaDo)
                {
                    oglasi = oglasi.Where(oglas => oglas.CenaPoDanu >= filteri.CenaOd && oglas.CenaPoDanu <= filteri.CenaDo).ToList();
                }

                if (filteri.KvadraturaOd >= 0 && filteri.KvadraturaDo <= Int32.MaxValue && filteri.KvadraturaOd < filteri.KvadraturaDo)
                {
                    oglasi = oglasi.Where(oglas => oglas.Kvadratura >= filteri.KvadraturaOd && oglas.Kvadratura <= filteri.KvadraturaDo).ToList();
                }

                if (filteri.Grejanje != null)
                {
                    oglasi = oglasi.Where(oglas => filteri.Grejanje.Contains(oglas.Grejanje)).ToList();
                }

                if (filteri.DodatnaOprema != null && filteri.DodatnaOprema!.Count != 0)
                {
                    oglasi = oglasi.Where(oglas => oglas.ListDodatneOpreme.Any(tip => filteri.DodatnaOprema!.Contains(tip))).ToList();
                }

                List<DateTime> sviDaniUOpsegu = Enumerable.Range(0, (filteri.DatumDo.Date - filteri.DatumOd.Date).Days + 1)
                                            .Select(offset => filteri.DatumOd.AddDays(offset))
                                            .ToList();

                oglasi = oglasi.Where(oglas => !oglas.ZauzetiDani!.Any(zauzetDan => sviDaniUOpsegu.Contains(zauzetDan)))
                            .ToList();

                oglasi = oglasi.Skip((pageNumber - 1) * pageSize)
                             .Take(pageSize).ToList();

                return Ok(new { oglasi });
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

    }
}