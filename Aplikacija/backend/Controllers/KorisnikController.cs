using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Services;
using backend.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Korisnik")]
    public class KorisnikController : Controller
    {
        private readonly IUserService _userService;
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public KorisnikController(ZurkaNaKlikDbContext context, IConfiguration configuration, IUserService userService)
        {
            Context = context;
            _configuration = configuration;
            _userService = userService;
        }

        #region DodajOmiljeniOglas
        [HttpPut("DodajOmiljeniOglas/{idOglasa}")]
        public async Task<ActionResult> DodajOmiljeniOglas(int idOglasa)
        {
            try
            {
                // var currId = _userService.GetMyId();
                // if(currId != idKorisnika.ToString()){
                //     return BadRequest("Nisi ti taj bebo");
                // }
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                Korisnik? korisnik = await Context.Korisnici.Include(k => k.ListaOmiljenihOglasaObjekata).FirstOrDefaultAsync(k => k.Id == idKorisnika);

                if (korisnik == null)
                {
                    return BadRequest("Korisnik ne postoji");
                }

                OglasObjekta? oglas = await Context.OglasiObjekta.FirstOrDefaultAsync(o => o.Id == idOglasa);

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


                return Ok(new { korisnik.ListaOmiljenihOglasaObjekata });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion


        #region ObrisiOmiljeniOglas
        [HttpDelete("ObrisiOmiljeniOglas/{idOglasa}")]

        public async Task<ActionResult> ObrisiOmiljeniOglas(int idOglasa)
        {
            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                Korisnik? korisnik = await Context.Korisnici.FindAsync(idKorisnika);

                if (korisnik == null)
                {
                    return BadRequest("Korisnik ne postoji");
                }

                OglasObjekta? oglas = await Context.OglasiObjekta.FindAsync(idOglasa);

                if (oglas == null)
                {
                    return BadRequest("Oglas ne postoji");
                }

                korisnik!.ListaOmiljenihOglasaObjekata!.Remove(oglas);


                await Context.SaveChangesAsync();

                return Ok(new { Context.OglasiObjekta });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }





        #endregion


       
        //Da vrati sve zakupljene oglase jednog korisnika ako adminu to treba

        #region PrikaziSveZakupljeneOglase
        [HttpGet("PrikaziSveZakupljeneOglase")]
        public async Task<IActionResult> PrikaziSveKorisnike()
        {
            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                var korisnik = await Context.Korisnici.Where(x => x.Id == idKorisnika).IgnoreQueryFilters().Include(x => x.ListaZakupljenihOglasa).FirstAsync();

                if (korisnik == null)
                {
                    return BadRequest("Nema korisnika za prikaz");
                }

                var listaoglasa = korisnik.ListaZakupljenihOglasa;

                if (listaoglasa == null)
                {
                    return BadRequest("Dati korisnik nema zakupljenih oglasa");
                }

                return Ok(new { listaoglasa });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region DodajOglas
        [HttpPost("DodajOglas")]
        public async Task<ActionResult> DodajOglas([FromBody] OglasObjektaBasic dodatOglas)
        {

            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                Korisnik? korisnik = await Context.Korisnici.FindAsync(idKorisnika);

                if (korisnik == null)
                {
                    return BadRequest("Korisnik ne postoji");
                }

                dodatOglas.ocena = 0;
                dodatOglas.brojOcena = 0;
                dodatOglas.zauzetiDani = [];
                OglasObjekta oglas = ObjectCreatorSingleton.Instance.ToOglas(dodatOglas);
                oglas.VlasnikOglasa = korisnik;

                // var oglas = new OglasObjekta
                // {
                //     ListaTipProslava = dodatOglas.ListaTipProslava,
                //     ListaTipProstora = dodatOglas.ListaTipProstora,
                //     Naziv = dodatOglas.Naziv,
                //     Grad = dodatOglas.Grad,
                //     Lokacija = dodatOglas.Lokacija,
                //     CenaPoDanu = dodatOglas.CenaPoDanu,
                //     BrojSoba = dodatOglas.BrojSoba,
                //     Kvadratura = dodatOglas.Kvadratura,
                //     BrojKreveta = dodatOglas.Kvadratura,
                //     BrojKupatila = dodatOglas.BrojKupatila,
                //     Grejanje = dodatOglas.Grejanje,
                //     ListDodatneOpreme = dodatOglas.ListDodatneOpreme,
                //     BrTel = dodatOglas.BrTel,
                //     Opis = dodatOglas.Opis,
                //     Slike = dodatOglas.Slike,
                //     BrojOcena = dodatOglas.BrojOcena,
                //     ZauzetiDani = dodatOglas.ZauzetiDani,
                //     VlasnikOglasa = korisnik
                // };

                /*korisnik.ListaObjavljenihOglasaObjekta?.Add(oglas);*/
                // Postavljanje vlasnika oglasa

                Context.OglasiObjekta.Add(oglas);
                await Context.SaveChangesAsync();

                OglasObjektaResponse response = ObjectCreatorSingleton.Instance.ToOglasResult(oglas);
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        #region ObrisiOglas
        [HttpDelete("ObrisiOglas/{idOglasa}")]
        public async Task<ActionResult> ObrisiOglas(int idOglasa)
        {

            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);
                Korisnik? korisnik = await Context.Korisnici.FindAsync(idKorisnika);

                if (korisnik == null)
                {
                    return BadRequest("Korisnik ne postoji");
                }

                OglasObjekta? oglas = await Context.OglasiObjekta.FindAsync(idOglasa);

                if (oglas == null)
                {
                    return BadRequest("Oglas ne postoji");
                }

                if (oglas.VlasnikOglasa!.Id != korisnik.Id)
                {
                    return BadRequest("Ti nisi vlasnik oglasa bato");
                }


                Context.OglasiObjekta.Remove(oglas);
                await Context.SaveChangesAsync();

                return Ok(new { Context.OglasiObjekta });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        //ovde je sve odjednom ne mora svaki properti da ima posebno azuriranje
        #region IzmeniOglas
        [HttpPut("IzmeniOglas")]
        public async Task<ActionResult> IzmeniOglas([FromBody] OglasObjekta o)
        {

            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                OglasObjekta? oglas = await Context.OglasiObjekta.Where(k => k.Id == o.Id)
                                                            .IgnoreQueryFilters()
                                                            .FirstOrDefaultAsync(o => o.VlasnikOglasa!.Id == idKorisnika);


                if (oglas == null)
                {
                    return BadRequest("Oglas ne postoji");
                }

                oglas.ListaTipProslava = o.ListaTipProslava;
                oglas.ListaTipProstora = o.ListaTipProstora;
                oglas.Naziv = o.Naziv;
                oglas.Grad = o.Grad;
                oglas.Lokacija = o.Lokacija;
                oglas.CenaPoDanu = o.CenaPoDanu;
                oglas.BrojSoba = o.BrojSoba;
                oglas.Kvadratura = o.Kvadratura;
                oglas.BrojKreveta = o.BrojKreveta;
                oglas.BrojKupatila = o.BrojKupatila;
                oglas.Grejanje = o.Grejanje;
                oglas.ListDodatneOpreme = o.ListDodatneOpreme;
                oglas.BrTel = o.BrTel;
                oglas.Opis = o.Opis;
                oglas.Slike = o.Slike;



                await Context.SaveChangesAsync();

                return Ok(new { oglas });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion 

        #region OceniAgenciju
        [HttpPut("OceniAgenciju/{idAgencije}/{novaOcena}")]
        public async Task<ActionResult> OceniAgenciju(int idAgencije, int novaOcena)
        {
            try
            {

                //int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                var agencija = await Context.Agencije.FindAsync(idAgencije);

                if (agencija == null)
                {
                    return BadRequest("Ne postoji takva agencija");
                }


                agencija.Ocena = (agencija.Ocena * agencija.BrojOcena + novaOcena) / ++agencija.BrojOcena;
                // 3 4 5    12/3 = 4
                // 3 4 5 3 15/4 = 3.75
                // 4+3/4 = 1.75


                Context.Agencije.Update(agencija);

                await Context.SaveChangesAsync();

                return Ok(agencija);



            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region OceniOglas
        [HttpPut("OceniOglas/{idOglasa}/{novaOcena}")]
        public async Task<ActionResult> OceniOglas(int idOglasa, int novaOcena)
        {
            try
            {

                //int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                var oglas = await Context.Agencije.FindAsync(idOglasa);

                if (oglas == null)
                {
                    return BadRequest("Ne postoji takva agencija");
                }


                oglas.Ocena = (oglas.Ocena * oglas.BrojOcena + novaOcena) / ++oglas.BrojOcena;
                // 3 4 5    12/3 = 4
                // 3 4 5 3 15/4 = 3.75
                // 4+3/4 = 1.75


                Context.Agencije.Update(oglas);

                await Context.SaveChangesAsync();

                return Ok(oglas);



            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region ZakupiOglas
        [HttpPost("ZakupiOglas/{idOglasa}/trazenidatumi")]
        public async Task<ActionResult> ZakupiOglas(int idOglasa, List<DateTime> trazenidatumi)
        {
            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                var korisnik = await Context.Korisnici.FindAsync(idKorisnika);


                OglasObjekta? oglas = await Context.OglasiObjekta.FindAsync(idOglasa);

                if (oglas == null)
                {
                    return BadRequest("ne postoji takav objekat");
                }

                bool slobodan = !oglas.ZauzetiDani!.Any(date => trazenidatumi.Any(trazeniDatum => trazeniDatum.Date == date.Date));


                if (slobodan)
                {

                    oglas.ZauzetiDani!.AddRange(trazenidatumi);

                    ZakupljeniOglas zakupljenoglas = new ZakupljeniOglas
                    {
                        Oglas = oglas,
                        Korisnik = korisnik!,
                        DatumZakupa = DateTime.Now,
                        ZakupljenOd = trazenidatumi[0],
                        ZakupljenDo = trazenidatumi[trazenidatumi.Count - 1],
                        ZahtevZaKetering = null
                    };

                    Context.ZakupljeniOglasi.Add(zakupljenoglas);
                    await Context.SaveChangesAsync();

                    return Ok(new { zakupljenoglas });

                }
                else
                {

                    return BadRequest("Objekat je zauzet u datom periodu");
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region  PosaljiZahtevZaKetering
        [HttpPost("PosaljiZahtevZaKetering/{idZakupljenOglas}/{idAgencije}/{mogucnostDostave}/listamenija")]
        public async Task<IActionResult> PosaljiZahtevZaKetering(bool mogucnostDostave, int idZakupljenOglas, int idAgencije, [FromBody]List<PorucenMeni> listamenija)
        {
            try
            {

                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                var zakupljenioglas = await Context.ZakupljeniOglasi.Include(i => i.Korisnik).Include(i => i.ZahtevZaKetering).IgnoreQueryFilters().FirstOrDefaultAsync( f => f.Id == idZakupljenOglas);


                if (zakupljenioglas == null)
                {
                    return BadRequest("Nema takvog zakupljenog oglasa");
                }


                if (zakupljenioglas!.Korisnik!.Id != idKorisnika)
                {
                    return BadRequest("nisi ti taj bebo");
                }

                if(zakupljenioglas.ZahtevZaKetering != null){
                    return BadRequest("Ovaj oglas vec ima zakupljen ketering");
                }


                var agencija = await Context.Agencije.Include(i => i.ListaZahtevZaKetering).IgnoreQueryFilters().FirstOrDefaultAsync(f => f.Id == idAgencije);


                if (agencija == null)
                {
                    return BadRequest("nisi postojeca agencija");
                }

                List<int> idMenija = listamenija.Select(o => o.idMenija).ToList();

                //return Ok( new { idMenija});

                var novizahtev = new ZahtevZaKetering
                {
                    ZakupljeniOglas = zakupljenioglas,
                    DatumRezervacije = zakupljenioglas.ZakupljenOd,
                    StatusRezervacije = true,
                    Agencija = agencija,
                };

                
                int ukupnaCena = 0;
                foreach(var o in listamenija){

                    MeniKeteringa? jedanMeni = await Context.MenijiKeteringa
                            .Include(i => i.Kategorija)
                            .ThenInclude(t => t!.Agencija)
                            .IgnoreQueryFilters()
                            .FirstOrDefaultAsync(f => f.Id == o.idMenija);

                    
                    //


                    if(jedanMeni == null){
                        return BadRequest("Taj meni ne postoji");
                    }

                    novizahtev.ZakupljeniMeniji?.Add(jedanMeni);
                    
                    if(jedanMeni?.Kategorija!.Agencija!.Id != idAgencije){
                        return BadRequest("nisu iz iste agencije meniji");
                    }

                    ukupnaCena += jedanMeni.CenaMenija * o.kg;
                }

                //return Ok("ovde deckoo");

                agencija!.ListaZahtevZaKetering!.Add(novizahtev);

                if(mogucnostDostave == true)
                    ukupnaCena += agencija.CenaDostave;

                novizahtev.KonacnaCena = ukupnaCena;

                zakupljenioglas.ZahtevZaKetering = novizahtev;

                Context.ZahteviZaKetering.Add(novizahtev);
                await Context.SaveChangesAsync();

                return Ok(new { novizahtev });

                
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        #endregion

        #region OtkaziZahtevZaKetering
        [HttpDelete("OtkaziZahtevZaKetering/{idZakupljenogKeteringa}")]
        public async Task<ActionResult> OtkaziZahtevZaKetering(int idZakupljenogKeteringa)
        {
            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                var korisnik = await Context.Korisnici.FindAsync(idKorisnika);

                var ketering = await Context.ZahteviZaKetering
                .Where(x => x.Id == idZakupljenogKeteringa).FirstOrDefaultAsync();

                if (ketering == null)
                {
                    return BadRequest("Ne postoji takav zakupljen oglas");
                }

                ketering!.Agencija!.ListaZahtevZaKetering!.Remove(ketering);
                Context.ZahteviZaKetering.Remove(ketering);

                return Ok(ketering);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Otkazi zakup objekta


        [HttpDelete("OtkaziRezervacijuObjekta/{idZakupljenogOglasa}")]
        public async Task<ActionResult> OtkaziRezervacijuObjekta(int idZakupljenogOglasa)
        {
            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);




                var korisnik = await Context.Korisnici.FindAsync(idKorisnika);

                var oglas = await Context.ZakupljeniOglasi.Include(x => x.Korisnik).Where(x => x.Korisnik!.Id == idKorisnika)
                .Where(x => x.Id == idZakupljenogOglasa).FirstOrDefaultAsync();

                if (oglas == null)
                {
                    return BadRequest("Ne postoji takav zakupljen oglas");
                }

                List<DateTime> sviDaniUOpsegu = Enumerable.Range(0, (oglas.ZakupljenDo - oglas.ZakupljenOd).Days + 1)
                                                        .Select(offset => oglas.ZakupljenOd.AddDays(offset))
                                                        .ToList();




                var daniZaUklanjanje = oglas.Oglas?.ZauzetiDani!
                        .Where(d => sviDaniUOpsegu.Contains(d))
                        .ToList();

                // Ukloni datume iz liste ZauzetiDani
                oglas.Oglas?.ZauzetiDani!.RemoveAll(d => sviDaniUOpsegu.Contains(d));

                // Sačuvaj promene u bazi
                Context.SaveChanges();

                Context.ZakupljeniOglasi.Remove(oglas);

                return Ok(oglas);


            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion


        #region Prikaz omiljenih oglasa (idKorisnika)
        [HttpGet("PrikaziSveOmiljeneOglase")]
        public async Task<IActionResult> PrikaziSveOmiljeneOglase()
        {

            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                //Korisnik? korisnik = await Context.Korisnici.FindAsync(idKorisnika);

                var omiljenioglasi = await Context.Korisnici.Where(x => x.Id == idKorisnika).Select(x => x.ListaOmiljenihOglasaObjekata).ToArrayAsync();

                return Ok(omiljenioglasi);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        #endregion


        #region ObrisiKorisnika
        [HttpDelete("ObrisiKorisnika")]
        public async Task<ActionResult> ObrisiKorisnika()
        {
            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                Korisnik? k = await Context.Korisnici.FindAsync(idKorisnika);

                Context.Korisnici.Remove(k!);

                await Context.SaveChangesAsync();

                return Ok("Obrisan je korisnik");


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        // Izmena podataka (idKorisnika)
        #region IzmeniPodatkeOKorisniku
        [HttpPut("IzmeniPodatkeOKorisniku")]
        public async Task<ActionResult> IzmeniPodatkeOKorisniku([FromBody] Korisnik korisnik)
        {
            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                var k = new
                {
                    Ime = korisnik.Ime,
                    Email = korisnik.Email,
                    BrTel = korisnik.BrTel,
                    LozinkaHash = korisnik.LozinkaHash,
                    SlikaProfila = korisnik.SlikaProfila,
                    Lokacija = korisnik.Lokacija,
                    Prezime = korisnik.Prezime
                };

                await Context.SaveChangesAsync();
                return Ok(new { k });


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        #endregion


        #region PrikaziOglaseKorisnika
        [HttpGet("PrikaziOglaseKorisnika")]
        public async Task<ActionResult> PrikaziOglaseKorisnika()
        {
            try
            {
                int idKorisnika = int.Parse((HttpContext.Items["idKorisnika"] as string)!);

                Korisnik? korisnik = await Context.Korisnici.Include(o => o.ListaObjavljenihOglasaObjekta).FirstOrDefaultAsync(k => k.Id == idKorisnika);

                if (korisnik == null)
                {
                    return BadRequest("Korisnik nema objavljene oglase");
                }

                // TODO WHY
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


        // PRovera neka nije bitnooooo
        
        // #region  PrikaziSveMenije
        // [HttpGet("PrikaziSveMenije/{idKategorije}")]
        // public async Task<IActionResult> PrikaziSveMenije(int idKategorije){
        //     try{

        //         var meniji = await Context.ZahteviZaKetering.Include(i => i.ZakupljeniMeniji).ToListAsync();
                


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


        #region PrikaziZakupljeniOglas
        [HttpGet("PrikaziZakupljeniOglas/{idzakupljenogobjekta}")]
        public async Task<IActionResult> PrikaziZakupljeniOglas(int idzakupljenogobjekta){
            try{
                var zakupljenioglas = await Context.ZakupljeniOglasi
                                            .Include(x => x.ZahtevZaKetering)
                                            .Where(x =>x.Id ==idzakupljenogobjekta)
                                            .Select(x => new {
                                                x.Id,
                                                x.DatumZakupa,
                                                x.ZakupljenOd,
                                                x.ZakupljenDo,
                                                x.ZahtevZaKetering

                                            })
                                            .FirstOrDefaultAsync();

                if (zakupljenioglas == null){
                    return  BadRequest("Nema takvog zakupljenog oglasa");
                }

                return Ok(zakupljenioglas);

                // var rez = zakupljenioglas.Select(x => new {
                //     x.Id,
                //    // x.Oglas,
                //    x.DatumZakupa,
                //    x.ZakupljenOd,
                //    x.ZakupljenDo,
                //    ZahtevZaKetering = x.ZahtevZaKetering



                // });

    
               


            }
            catch (Exception ex){
                return BadRequest(ex.Message);
            }
        }




        #endregion

        
        





        



    }
}
