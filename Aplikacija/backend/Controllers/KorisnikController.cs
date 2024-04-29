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

        [HttpPut("DodajOmiljeniOglas/{idKorisnika}/{idOglasa}")]
        public async Task<ActionResult> DodajOmiljeniOglas(int idKorisnika, int idOglasa)
        {
            try
            {
                Korisnik? korisnik = await Context.Korisniks.Include(k => k.ListaOmiljenihOglasaObjekata).FirstOrDefaultAsync(k => k.Id == idKorisnika);

                if (korisnik == null)
                {
                    return BadRequest("Korisnik ne postoji");
                }

                OglasObjekta? oglas = await Context.OglasObjektas.FirstOrDefaultAsync(o => o.Id == idOglasa);

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

        //Korisnik treba da oceni oglas pa da se updateuje i broj ocena u oglas objekta

        //Korisnik treba da oceni agenciju za ketering pa da se updateuje i broj ocena u agenciji

       // [HttpPut("OcenAgenciju/{idKorisnika}")]


    }
}