using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace backend.Controllers

{
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        public ZurkaNaKlikDbContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public AuthController(ZurkaNaKlikDbContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }

        [HttpPost("RegistrationKorisnik")]
        public async Task<ActionResult> RegistrationKorisnik([FromBody]RegistrationKorisnik request){

            try{
                 
                string lozinkaHash = BCrypt.Net.BCrypt.HashPassword(request.Lozinka);

                var korisnik = new Korisnik
                {
                    Ime = request.Ime,
                    Prezime = request.Prezime,
                    Email = request.Email,
                    BrTel = request.BrTel,
                    LozinkaHash = lozinkaHash,
                    Role = request.Role,
                    SlikaProfila = request.SlikaProfila
                };


                await Context.Korisniks.AddAsync(korisnik);
                await Context.SaveChangesAsync();

                return Ok(new {Context.Korisniks});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginKorisnik request){
            try{
                var korisnik = await Context.KorisnikAgencijas.FirstOrDefaultAsync(p => p.Email == request.Email);

                if (korisnik == null){
                    return BadRequest("Korisnik ne postoji, ili ste uneli pogresan email");
                }

                if(!BCrypt.Net.BCrypt.Verify(request.Lozinka, korisnik?.LozinkaHash)){
                    return BadRequest("Pogresna sifra");
                }

                string token = CreateToken(korisnik!);

                return Ok(new {token});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        private string CreateToken([FromBody] KorisnikAgencija korisnikAgencija){

            List<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.Name, korisnikAgencija.Ime),
                new Claim(ClaimTypes.Email, korisnikAgencija.Email),
                new Claim(ClaimTypes.Role, korisnikAgencija.Role.ToString())
            };

            
            DotNetEnv.Env.Load();
            string envTokenKey = Environment.GetEnvironmentVariable("TOKEN")!;
            // Izvlaci podatke iz appsettings.json
            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(envTokenKey));
             

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}

//http only cooke na backend i tu da smestam jwt i to da seljem