// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;

// namespace backend.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class OglasController : ControllerBase
//     {
//         public ZurkaNaKlikDbContext Context { get; set; }
//         private readonly IConfiguration _configuration;

//         public OglasController(ZurkaNaKlikDbContext context, IConfiguration configuration)
//         {
//             Context = context;
//             _configuration = configuration;
//         }

//         [HttpPost("DodajOglas/{idKorisnik}")]
//         public async Task<ActionResult> RegistrationKorisnik([FromBody]OglasObjekta dodatOglas, int idKorisnik){

//             try{

//                 Korisnik? korisnik = await Context.Korisniks.FindAsync(idKorisnik);
                
//                 if (korisnik == null){
//                     return BadRequest("Korisnik ne postoji");
//                 }
                
//                 var oglas = new OglasObjekta
//                 {
//                     ListaTipProslava = dodatOglas.ListaTipProslava,
//                     ListaTipProstora = dodatOglas.ListaTipProstora,
//                     Naziv = dodatOglas.Naziv,
//                     Grad = dodatOglas.Grad,
//                     Lokacija = dodatOglas.Lokacija,
//                     CenaPoDanu = dodatOglas.CenaPoDanu,
//                     BrojSoba = dodatOglas.BrojSoba,
//                     Kvadratura = dodatOglas.Kvadratura,
//                     BrojKreveta = dodatOglas.Kvadratura,
//                     BrojKupatila = dodatOglas.BrojKupatila,
//                     Grejanje = dodatOglas.Grejanje,
//                     ListDodatneOpreme = dodatOglas.ListDodatneOpreme,
//                     BrTel = dodatOglas.BrTel,
//                     Opis = dodatOglas.Opis,
//                     Slike = dodatOglas.Slike,
//                     BrojOcena = dodatOglas.BrojOcena,
//                     VlasnikOglasa = korisnik

//                 };


//                 await Context.OglasObjektas.AddAsync(oglas);
//                 await Context.SaveChangesAsync();

//                 return Ok(new {Context.OglasObjektas});
//             }
//             catch (Exception e)
//             {
//                 return BadRequest(e.Message);
//             }
//         }


//     }
// }