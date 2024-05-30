using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
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
         public async Task<ActionResult> VratiKategorije() {
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


        #region VratiMenijeSaKategorijama
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
        

        //prikazi sve porudzbine
        #region  PrikaziSvePorudzbine
        [HttpGet("PrikaziSvePorudzbine")]
        public async Task<IActionResult> PrikaziSvePorudzbine()
        {
            try
            {
                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);

                var zahtevizaketering = await Context.ZahteviZaKetering
                                                                    .Include(i => i.Agencija)
                                                                    .Where(i => i.Agencija!.Id == idAgencije)
                                                                    .IgnoreQueryFilters()
                                                                    .ToListAsync();

                if(zahtevizaketering == null){
                    return BadRequest("Ovaj zahtev nija validan");
                }


                return Ok( new { zahtevizaketering });
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

                if(zahtevizaketering == null){
                    return BadRequest("Ovaj zahtev nija validan");
                }


                return Ok( new { zahtevizaketering!.StatusRezervacije });
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

                var zahtevizaketering = await Context.ZahteviZaKetering.Include(i => i.ZakupljeniOglas).IgnoreQueryFilters().FirstOrDefaultAsync(x => x.Id == idZahteva);

                if (zahtevizaketering == null)
                {
                    return BadRequest();
                }

                zahtevizaketering.ZakupljeniOglas = null;

                //zahtevizaketering.ZakupljeniOglas.ZahtevZaKetering = null;

                Context.ZahteviZaKetering.Remove(zahtevizaketering);
                await Context.SaveChangesAsync();


                return Ok( new { zahtevizaketering.StatusRezervacije });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        #endregion

        #region AzurirajAgenciju

        [HttpPut("AzurirajAgenciju")]
        public async Task<ActionResult> AzurirajAgenciju([FromBody] Agencija agencija){
            try{

                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);

                var a = new {
                    Ime = agencija.Ime,
                    Email = agencija.Email,
                    BrTel = agencija.BrTel,
                    LozinkaHash = agencija.LozinkaHash,
                    SlikaProfila = agencija.SlikaProfila,
                    Lokacija = agencija.Lokacija,
                    Opis = agencija.Opis,
                    MogucnostDostave = agencija.MogucnostDostave,
                    CenaDostave = agencija.CenaDostave

                };

                await Context.SaveChangesAsync();
                return Ok(new { a });


            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        #endregion

         #region AzurirajKategoriju

        [HttpPut("AzurirajKategoriju")]
        public async Task<ActionResult> AzurirajKategoriju([FromBody] Kategorija kategorija){
            try{

                int idAgencije = int.Parse((HttpContext.Items["idAgencije"] as string)!);

                var a = new {
                    Naziv = kategorija.Naziv

                };

                await Context.SaveChangesAsync();
                return Ok(new { a });


            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        #endregion

        //vrati kategorije i menije za neku agenciju(idagencije)

       

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



    //prikaz svih agencija

    //sortiranje i filteri





}
