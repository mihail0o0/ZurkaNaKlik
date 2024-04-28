namespace backend.Controllers

{
    [Route("[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public AdminController(ZurkaNaKlikDbContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }

        [HttpGet("Svi korisnici")]
        public async Task<ActionResult> SviKorisnici(){

            try{
                 
                var listaKorisnika = await Context.Korisniks.ToListAsync<Korisnik>();

                return Ok(new {listaKorisnika});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("Sve agencije")]
        public async Task<ActionResult> SveAgencije(){

            try{
                 
                var listaAgencija = await Context.Agencije.ToListAsync<Agencija>();

                return Ok(new {listaAgencija});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}