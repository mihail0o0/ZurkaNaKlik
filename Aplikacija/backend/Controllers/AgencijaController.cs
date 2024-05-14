using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend.Controllers
{
    [Authorize(Roles = "Agencija")]
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
        #region  DodajKategoriju
        //dodavanje kategorije preko rute id agencije = radi
        [HttpPost("DodajKategoriju")]
        public async Task<ActionResult> DodajKategoriju([FromBody]Kategorija kategorija){
            try{

                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);


                // if (HttpContext.Items.TryGetValue("idAgencije", out var idAgencijeObj))
                // {
                //     idAgencije = int.Parse(idAgencijeObj as string);

                // }

                // if(idAgencije < 0){
                //     return BadRequest("kako si minus");
                // }

                Agencija? agencija = await Context.Agencije.FindAsync(idAgencije);
                if (agencija == null){
                    return BadRequest("Ne postoji agencija sa tim id-jem");
                }

                var k = new Kategorija{

                    Naziv = kategorija.Naziv,
                    Agencija = agencija
        
                };

                await Context.Kategorije.AddAsync(k);
                await Context.SaveChangesAsync();
                return Ok(k);
                
            
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }


        }
        #endregion
        
        #region VratiKategorije
        [HttpGet("VratiKategorije")]
        public async Task<IActionResult> VratiKategorije(){
            try{
                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);
                // if (HttpContext.Items.TryGetValue("idAgencije", out var idAgencijeObj))
                // {
                //     idAgencije = int.Parse(idAgencijeObj as string);

                // }

                // if(idAgencije < 0){
                //     return BadRequest("kako si minus");
                // }
                //Agencija? agencija = await Context.Agencije.FindAsync(idAgencije);
                var kategorije = await Context.Kategorije.Where(k=>k.Agencija!.Id == idAgencije).ToListAsync();

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

        #endregion
      

        #region PrikaziSveMenijeJedneAgencije
        [HttpGet("PrikaziSveMenije/{idKategorije}")]
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

       //put i delete
        #region ObrisiKategoriju
        [HttpDelete("ObrisiKategoriju/{KategorijaID}")]
        public async Task<ActionResult> ObrisiKategoriju (int KategorijaID){
            try{
                var kategorija = await Context.Kategorije.Include(x => x.ListaMenija).FirstOrDefaultAsync(x =>x.Id==KategorijaID);



                if (kategorija == null){
                    return BadRequest("Nema takve kategorije");
                }

                kategorija.ListaMenija!.ForEach(meniji => {
                    Context.MenijiKeteringa.Remove(meniji);
                });

                Context.Kategorije.Remove(kategorija);
                await Context.SaveChangesAsync();
                return  Ok(kategorija);

            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }

        }
        #endregion

        //OceniAgencijuZaKetering

        #region OceniAgenciju
        [HttpPut("OceniAgenciju/{idAgencije}/{novaOcena}")]
        public async Task<ActionResult> OceniAgenciju(int idAgencije, int novaOcena){
            try{
                var agencija = await Context.Agencije.FindAsync(idAgencije);

                if (agencija== null){
                    return BadRequest("Ne postoji takva agencija");
                }

                agencija.BrojOcena ++;

                agencija.Ocena = (agencija.Ocena + novaOcena)/agencija.BrojOcena;

                Context.Agencije.Update(agencija);

                await Context.SaveChangesAsync();

                return Ok(agencija);

                

            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
        #endregion
        



        

       
       


    }
}