using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult> PrikaziOglas(int idOglasa){

            try{
                OglasObjekta? oglas = await Context.OglasiObjekta
                                    .Include(o => o.VlasnikOglasa)
                                    .FirstOrDefaultAsync(o => o.Id == idOglasa);
                
                if (oglas == null){
                    return BadRequest("Oglas ne postoji");
                }

                
                

                return Ok(new {oglas});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

        



    }
}