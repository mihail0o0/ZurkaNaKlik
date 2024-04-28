using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using backend.DTOs;

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

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                 
                string lozinkaHash = BCrypt.Net.BCrypt.HashPassword(request.Lozinka);

                var postojiEmail = await Context.Korisniks.AnyAsync(k => k.Email == request.Email);
                if (postojiEmail)
                {
                    return BadRequest("Korisnik sa ovim email-om već postoji.");
                }

                var korisnik = new Korisnik
                {
                    Ime = request.Ime,
                    Prezime = request.Prezime,
                    Email = request.Email,
                    BrTel = request.BrTel,
                    LozinkaHash = lozinkaHash,
                    Role = request.Role,
                    Lokacija = request.Lokacija
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

        [HttpPost("RegistrationAgencija")]
        public async Task<ActionResult> RegistrationAgencija([FromBody]RegistrationAgencija request){

            try{
                
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                string lozinkaHash = BCrypt.Net.BCrypt.HashPassword(request.Lozinka);

                var postojiEmail = await Context.Korisniks.AnyAsync(k => k.Email == request.Email);
                if (postojiEmail)
                {
                    return BadRequest("Korisnik sa ovim email-om već postoji.");
                }

                var agencija = new Agencija
                {
                    Ime = request.Ime,
                    Email = request.Email,
                    BrTel = request.BrTel,
                    LozinkaHash = lozinkaHash,
                    Role = request.Role,
                    Lokacija = request.Lokacija,
                };


                await Context.Agencije.AddAsync(agencija);
                await Context.SaveChangesAsync();

                return Ok(new {agencija});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody]Login request){

            try{
                var loginObject = await Context.KorisnikAgencijas.FirstOrDefaultAsync(p => p.Email == request.Email);

                if (loginObject == null){
                    return BadRequest("Korisnik ne postoji, ili ste uneli pogresan email");
                }

                if(!BCrypt.Net.BCrypt.Verify(request.Lozinka, loginObject?.LozinkaHash)){
                    return BadRequest("Pogresna sifra");
                }

                var login = new LoginObject{
                    Email = loginObject!.Email,
                    Role = loginObject.Role
                };

                string token = CreateToken(login!);

                return Ok(new {token});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        private string CreateToken(LoginObject loginObject){

            List<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.Email, loginObject.Email),
                new Claim(ClaimTypes.Role, loginObject.Role.ToString())
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


