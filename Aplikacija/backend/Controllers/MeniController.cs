using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeniController : ControllerBase
    {
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public MeniController(ZurkaNaKlikDbContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }

        #region DodavanjeMenija
        //radi
        [HttpPost("DodajMeni/{idKategorije}")]
        public async Task<ActionResult> DodajMeni([FromBody]MeniKeteringa meniketeringa, int idKategorije){
            try{

                Kategorija? kategorija = await Context.Kategorijas.Include(x => x.Agencija).Where(x =>x.Id == idKategorije).SingleOrDefaultAsync();
                if (kategorija == null){
                    return BadRequest("Ne postoji kategorija sa tim id-jem");
                }

                var meni = new MeniKeteringa{
                    Naziv = meniketeringa.Naziv,
                    CenaMenija = meniketeringa.CenaMenija,
                    Slika = meniketeringa.Slika,
                    Opis = meniketeringa.Opis,
                    SastavMenija = meniketeringa.SastavMenija,
                    Kategorija = kategorija

                };

                await Context.MeniKeteringas.AddAsync(meni);
                await Context.SaveChangesAsync();
                return Ok(meni);
                
            
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }


        }

        #endregion

        #region  PrikaziSveMenije
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

        #endregion

        #region PrikaziSveMenijeAgencije
        [HttpGet("PrikaziSveMenijeAgencije/{idAgencije}")]
        public async Task<IActionResult> PrikaziSveMenijeAgencije(int idAgencije){
            try{
                
                //var svimeniji = await Context.MeniKeteringas.Include(x=> x.Kategorija).Where(x => x.Kategorija).ToListAsync();
                var svimeniji = await Context.Kategorijas.Include(x=> x.ListaMenija).Include(x => x.Agencija).Where(x =>x.Agencija!.Id == idAgencije).Select(x => new {
                    x.ListaMenija
                })
                .ToListAsync();


                if (svimeniji == null){
                    return BadRequest("Nema takvih kategorija i agencija zajedno");
                }
                else {
                    return Ok(svimeniji);
                }   

            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }

        }

        #endregion

        #region PromeniCenu
        //Radi
        [HttpPut("PromeniCenu/{MeniID}/{NovaCena}")]
        public async Task<ActionResult> PromeniCenu(int MeniID, int NovaCena)
        {
            try
            {
                var meni = await Context.MeniKeteringas.FindAsync(MeniID);

                if (meni == null)
                {
                    return BadRequest("Pogresno unet meni"); 
                }

                meni.CenaMenija = NovaCena; // Ažuriramo cenu menija

                Context.MeniKeteringas.Update(meni); // Označavamo meni kao ažuriran

                await Context.SaveChangesAsync(); // Čuvamo promene u bazi podataka

                return Ok(meni); // Vraćamo ažurirani meni
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // Vraćamo grešku ako dođe do izuzetka
            }
        }

        #endregion
        #region ObrisiMeni
        [HttpDelete("ObrisiMeni/{MeniID}")]
        public async Task<ActionResult> ObrisiMeni (int MeniID){
            try{
                var meni = await Context.MeniKeteringas.FindAsync(MeniID);
                if (meni == null){
                    return BadRequest("Pogresno unet meni");
                }

                Context.MeniKeteringas.Remove(meni);
                await Context.SaveChangesAsync(); 

                return Ok("Obrisan je");


            }
            catch (Exception e){
                return BadRequest(e.Message);
            }

            
        }

        #endregion
      
        #region PromeniSliku
       [HttpPut("PromeniSliku/{MeniID}/{NovaSlika}")]
        public async Task<ActionResult> PromeniSliku(int MeniID, string NovaSlika)
        {
            try
            {
                var meni = await Context.MeniKeteringas.FindAsync(MeniID);

                if (meni == null)
                {
                    return BadRequest("Pogresno unet meni"); 
                }

                meni.Slika = NovaSlika; 

                //Context.MeniKeteringas.Update(meni); 

                await Context.SaveChangesAsync(); 

                return Ok(meni); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); 
            }
        }

        #endregion
        #region PrommeniOpis
        [HttpPut("PromeniOpis/{MeniID}/{NoviOpis}")]
        public async Task<ActionResult> PromeniOpis(int MeniID, string NoviOpis)
        {
            try
            {
                var meni = await Context.MeniKeteringas.FindAsync(MeniID);

                if (meni == null)
                {
                    return BadRequest("Pogresno unet meni"); 
                }

                meni.Opis = NoviOpis; 

                //Context.MeniKeteringas.Update(meni); 

                await Context.SaveChangesAsync(); 

                return Ok(meni); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); 
            }
        }
        #endregion


        #region AzurirajSastavMenija
        //public required List<string> SastavMenija {get; set; }// pecivo, cevapi
        [HttpPut("AzurirajSastav/{MeniID}/{StavkaUMeniju}")]
        public async Task<ActionResult> AzurirajSastav(int MeniID, string StavkaUMeniju)
        {
            try{
                var meni = await Context.MeniKeteringas.FindAsync(MeniID);

                if (meni == null){
                    return BadRequest("Nema taj meni");
                }

                if (meni.SastavMenija.Contains(StavkaUMeniju)){
                    meni.SastavMenija.Remove(StavkaUMeniju);
                }
                else {
                    meni.SastavMenija.Add(StavkaUMeniju);
                   // Context.MeniKeteringas.Update(meni);
                }

                
                await Context.SaveChangesAsync();
                return Ok(meni);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        
        
        }

        #endregion
                        
                    
                

    }     


    }
