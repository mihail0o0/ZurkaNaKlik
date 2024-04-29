using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgencijaController : ControllerBase
    {
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public AgencijaController(ZurkaNaKlikDbContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }

        //dodavanje kategorije preko rute id agencije = radi
        [HttpPost("DodajKategoriju/{idAgencije}")]
        public async Task<ActionResult> DodajKategoriju([FromBody]Kategorija kategorija, int idAgencije){
            try{

                Agencija? agencija = await Context.Agencije.FindAsync(idAgencije);
                if (agencija == null){
                    return BadRequest("Ne postoji agencija sa tim id-jem");
                }

                var k = new Kategorija{

                    Naziv = kategorija.Naziv,
                    Agencija = agencija
        
                };

                await Context.Kategorijas.AddAsync(k);
                await Context.SaveChangesAsync();
                return Ok(k);
                
            
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }


        }
        
      
        [HttpGet("VratiKategorije/{idAgencije}")]
        public async Task<IActionResult> VratiKategorije(int idAgencije){
            try{
                //Agencija? agencija = await Context.Agencije.FindAsync(idAgencije);
                var kategorije = await Context.Kategorijas.Where(k=>k.Agencija!.Id== idAgencije).ToListAsync();

            if (kategorije == null){
                return BadRequest("Nema takvih kategorija i agencija zajedno");
            }
            else {
                return Ok(kategorije);
            }   

            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }


        }
      

        
        [HttpGet("PrikaziSveMenije/{idKategorije}")]
        public async Task<IActionResult> PrikaziSveMenije(int idKategorije){
            try{
             
                var meniji = await Context.MeniKeteringas.Where(k=>k.Kategorija!.Id== idKategorije).ToListAsync();

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

       //put i delete

       [HttpDelete("ObrisiKategoriju/{KategorijaID}")]
       public async Task<ActionResult> ObrisiKategoriju (int KategorijaID){
        try{
            var kategorija = await Context.Kategorijas.Include(x => x.ListaMenija).FirstOrDefaultAsync(x =>x.Id==KategorijaID);



            if (kategorija == null){
                return BadRequest("Nema takve kategorije");
            }

            kategorija.ListaMenija!.ForEach(meniji => {
                Context.MeniKeteringas.Remove(meniji);
            });

            Context.Kategorijas.Remove(kategorija);
            await Context.SaveChangesAsync();
            return  Ok(kategorija);

        }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }

       }

        

        

       
       


    }
}