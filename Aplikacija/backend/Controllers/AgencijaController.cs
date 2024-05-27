using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        #region VratiKategorije
        [HttpGet("VratiKategorije")]
        public async Task<ActionResult> VratiKategorije()
        {
            try
            {
                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);

                Agencija? agencija = await Context.Agencije.FindAsync(idAgencije);
                if (agencija == null)
                {
                    return BadRequest("Ne postoji agencija sa tim id-jem");
                }

                List<Kategorija>? kategorija = await Context.Kategorije.Where(k => k.Agencija!.Id == idAgencije).ToListAsync();

                return Ok(kategorija);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        #endregion

        #region  DodajKategoriju
        //dodavanje kategorije preko rute id agencije = radi
        [HttpPost("DodajKategoriju")]
        public async Task<ActionResult> DodajKategoriju([FromBody] Kategorija kategorija)
        {
            try
            {

                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);


                // if (HttpContext.Items.TryGetValue("idAgencije", out var idAgencijeObj))
                // {
                //     idAgencije = int.Parse(idAgencijeObj as string);

                // }

                // if(idAgencije < 0){
                //     return BadRequest("kako si minus");
                // }

                Agencija? agencija = await Context.Agencije.FindAsync(idAgencije);
                if (agencija == null)
                {
                    return BadRequest("Ne postoji agencija sa tim id-jem");
                }

                var k = new Kategorija
                {

                    Naziv = kategorija.Naziv,
                    Agencija = agencija

                };

                await Context.Kategorije.AddAsync(k);
                await Context.SaveChangesAsync();
                return Ok(k);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        #endregion

        //put i delete
        #region ObrisiKategoriju
        [HttpDelete("ObrisiKategoriju/{KategorijaID}")]
        public async Task<ActionResult> ObrisiKategoriju(int KategorijaID)
        {
            try
            {

                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);

                var kategorija = await Context.Kategorije.Include(x => x.ListaMenija).Where(x => x.Agencija!.Id == idAgencije).FirstOrDefaultAsync(x => x.Id == KategorijaID);

                if (kategorija == null)
                {
                    return BadRequest("Nema takve kategorije");
                }

                kategorija.ListaMenija!.ForEach(meniji =>
                {
                    Context.MenijiKeteringa.Remove(meniji);
                });

                Context.Kategorije.Remove(kategorija);
                await Context.SaveChangesAsync();
                return Ok(kategorija);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        #endregion

        //ovo vrati sve menije pa ce preko id agencije = novo
        #region VratiSveMenije
        [HttpGet("VratiSveMenije/{idAgencije}")]
        public async Task<IActionResult> VratiSveMenije(int idAgencije)
        {
            try
            {
                var kategorije = await Context.Kategorije.Include(x => x.ListaMenija).Where(x => x.Agencija!.Id == idAgencije).ToListAsync();



                // if (HttpContext.Items.TryGetValue("idAgencije", out var idAgencijeObj))
                // {
                //     idAgencije = int.Parse(idAgencijeObj as string);

                // }

                // if(idAgencije < 0){
                //     return BadRequest("kako si minus");
                // }
                //Agencija? agencija = await Context.Agencije.FindAsync(idAgencije);
                // var kategorije = await Context.Kategorije.Where(k=>k.Agencija!.Id == idAgencije).ToListAsync();

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






        #region DodavanjeMenija
        //radi
        [HttpPost("DodajMeni/{idKategorije}")]
        public async Task<ActionResult> DodajMeni([FromBody] MeniKeteringa meniketeringa, int idKategorije)
        {
            try
            {

                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);

                Kategorija? kategorija = await Context.Kategorije.Include(x => x.Agencija).Where(x => x.Id == idKategorije).SingleOrDefaultAsync();
                if (kategorija == null)
                {
                    return BadRequest("Ne postoji kategorija sa tim id-jem");
                }

                var meni = new MeniKeteringa
                {
                    Naziv = meniketeringa.Naziv,
                    CenaMenija = meniketeringa.CenaMenija,
                    Slika = meniketeringa.Slika,
                    Opis = meniketeringa.Opis,
                    SastavMenija = meniketeringa.SastavMenija,
                    Kategorija = kategorija

                };

                await Context.MenijiKeteringa.AddAsync(meni);
                await Context.SaveChangesAsync();
                return Ok(meni);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        #endregion


        #region AzurirajMeni

        [HttpPut("AzurirajMeni")]
        public async Task<ActionResult> AzurirajMeni([FromBody] MeniKeteringa meni)
        {
            try
            {
                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);

                MeniKeteringa? m = await Context.MenijiKeteringa.Include(x => x.Kategorija).Where(x => x.Id == meni.Id).Where(x => x.Kategorija!
                .Agencija!.Id == idAgencije).IgnoreQueryFilters().FirstOrDefaultAsync();

                if (m == null)
                {
                    return BadRequest("Meni ne postoji");
                }

                m.CenaMenija = meni.CenaMenija;
                m.Naziv = meni.Naziv;
                m.Opis = meni.Opis;
                m.SastavMenija = meni.SastavMenija;
                m.Slika = meni.Slika;

                await Context.SaveChangesAsync();

                return Ok(new { m });

                // if (meni == null)
                // {
                //     return BadRequest("Pogresno unet meni"); 
                // }

                // meni.CenaMenija = NovaCena; // Ažuriramo cenu menija

                // Context.MenijiKeteringa.Update(meni); // Označavamo meni kao ažuriran

                // await Context.SaveChangesAsync(); // Čuvamo promene u bazi podataka

                // return Ok(meni); // Vraćamo ažurirani meni
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // Vraćamo grešku ako dođe do izuzetka
            }
        }

        #endregion

        #region ObrisiMeni
        [HttpDelete("ObrisiMeni/{MeniID}")]
        public async Task<ActionResult> ObrisiMeni(int MeniID)
        {
            try
            {
                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);

                // TODO ovo ne sme tako da se radi
                var meni = await Context.MenijiKeteringa.FindAsync(MeniID);
                if (meni == null)
                {
                    return BadRequest("Pogresno unet meni");
                }

                // var kategorijaMenija = await Context.Kategorije.FindAsync();

                Context.MenijiKeteringa.Remove(meni);
                await Context.SaveChangesAsync();

                return Ok(meni);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }

        #endregion


        #region VratiMenije
        [HttpGet("VratiMenije")]
        public async Task<ActionResult> VratiMenije()
        {
            try
            {
                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);
                List<Kategorija>? kategorije = await Context.Kategorije.Where(k => k.Agencija!.Id == idAgencije).ToListAsync();

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

        #region ObrisiAgenciju

        [HttpDelete("ObrisiAgenciju")]

        public async Task<ActionResult> ObrisiAgenciju()
        {
            try
            {
                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);
                Agencija? agencija = await Context.Agencije.FindAsync(idAgencije);

                Context.Agencije.Remove(agencija!);
                await Context.SaveChangesAsync();

                return Ok("Obrisan je");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);

            }
        }

        #endregion
        
        // #region  PrikaziSveMenije
        // [HttpGet("PrikaziSveMenije/{idKategorije}")]
        // public async Task<IActionResult> PrikaziSveMenije(int idKategorije){
        //     try{

        //         var meniji = await Context.MenijiKeteringa.Where(k=>k.Kategorija!.Id== idKategorije).ToListAsync();

        //     if (meniji == null){
        //         return BadRequest("Nema takvih kategorija i agencija zajedno");
        //     }
        //     else {
        //         return Ok(meniji);
        //     }   

        //     }
        //     catch(Exception ex){
        //         return BadRequest(ex.Message);
        //     }

        // }

        // #endregion


        // #region PrikaziSveMenijeJedneAgencije
        // [HttpGet("PrikaziSveMenije/{idKategorije}")]
        // public async Task<IActionResult> PrikaziSveMenije(int idKategorije){
        //     try{

        //         var meniji = await Context.MenijiKeteringa.Where(k=>k.Kategorija!.Id== idKategorije).ToListAsync();

        //     if (meniji == null){
        //         return BadRequest("Nema takvih kategorija i agencija zajedno");
        //     }
        //     else {
        //         return Ok(meniji);
        //     }   

        //     }
        //     catch(Exception ex){
        //         return BadRequest(ex.Message);
        //     }

        // }

        //#endregion


        //prikazi sve porudzbine
        #region  PrikaziSvePorudzbine
        [HttpGet("PrikaziSvePorudzbine")]
        public async Task<IActionResult> PrikaziSvePorudzbine()
        {
            try
            {
                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);

                var zahtevizaketering = await Context.ZahteviZaKetering
                                                                    .Where(i => i.Agencija!.Id == idAgencije)
                                                                    .IgnoreQueryFilters()
                                                                    .ToListAsync();




                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        #endregion

        //odobri porudbinu
        #region  OdobriPorudzbinu
        [HttpPut("OdobriPorudzbinu/{idZahteva}")]
        public async Task<IActionResult> OdobriPorudzbinu(int idZahteva)
        {
            try
            {

                var zahtevizaketering = await Context.ZahteviZaKetering.FirstOrDefaultAsync(x => x.Id == idZahteva);


                if (zahtevizaketering != null && zahtevizaketering.StatusRezervacije == false)
                {
                    zahtevizaketering.StatusRezervacije = !zahtevizaketering.StatusRezervacije;
                }



                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        #endregion

        #region  OdbijanjePoridzbine
        [HttpGet("OdbijanjePoridzbine/{idZahteva}")]
        public async Task<IActionResult> OdbijanjePoridzbine(int idZahteva)
        {
            try
            {

                var zahtevizaketering = await Context.ZahteviZaKetering.FirstOrDefaultAsync(x => x.Id == idZahteva);

                if (zahtevizaketering == null)
                {
                    return BadRequest();
                }

                zahtevizaketering.ZakupljeniOglas = null;

                Context.Remove(zahtevizaketering);


                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        #endregion



    }



    //prikaz svih agencija

    //sortiranje i filteri





}
