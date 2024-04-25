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
        public async Task<ActionResult> DodajOmiljeniOglas(int idKorisnika, int idOglasa){

            try{

                Korisnik? korisnik = await Context.Korisniks.FindAsync(idKorisnika);

                if(korisnik == null){

                    return BadRequest("Korisnik ne postoji");
                }

                OglasObjekta? oglas = await Context.OglasObjektas.FindAsync(idOglasa);

                // if(oglas == null){

                //     return BadRequest("Oglas ne postoji");
                // }


                // korisnik.ListaOmiljenihOglasaObjekata.Add(oglas);

                // Context.Korisniks.Update(korisnik);

                // Context.SaveChangesAsync();

                return Ok(korisnik);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}