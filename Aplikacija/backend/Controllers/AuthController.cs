using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using backend.DTOs;
using backend.Utilities;
using Microsoft.AspNetCore.Http;

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
        public async Task<ActionResult> RegistrationKorisnik([FromBody] RegistrationKorisnik request)
        {

            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var postojiEmail = await Context.Korisnici.AnyAsync(k => k.Email == request.Email);
                if (postojiEmail)
                {
                    return BadRequest("Korisnik sa ovim email-om već postoji.");
                }

                string lozinkaHash = BCrypt.Net.BCrypt.HashPassword(request.Lozinka);
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

                await Context.Korisnici.AddAsync(korisnik);
                await Context.SaveChangesAsync();

                return Ok(new { Context.Korisnici });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("RegistrationAgencija")]
        public async Task<ActionResult> RegistrationAgencija([FromBody] RegistrationAgencija request)
        {

            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var postojiEmail = await Context.Korisnici.AnyAsync(k => k.Email == request.Email);
                if (postojiEmail)
                {
                    return BadRequest("Korisnik sa ovim email-om već postoji.");
                }

                string lozinkaHash = BCrypt.Net.BCrypt.HashPassword(request.Lozinka);
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

                return Ok(new { agencija });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] Login request)
        {

            try
            {
                KorisnikAgencija? loginObject = await Context.KorisniciAgencije.FirstOrDefaultAsync(p => p.Email == request.Email);
                if (loginObject == null)
                {
                    return BadRequest("Korisnik ne postoji, ili ste uneli pogresan email");
                }

                LoginResult loginResult;
                if (loginObject.Role == Roles.Korisnik)
                {
                    Korisnik? korisnikObject = await Context.Korisnici.FindAsync(loginObject.Id);
                    loginResult = ObjectCreatorSingleton.Instance.CreateLoginResult(loginObject, korisnikObject, null);
                }
                // TODO handle Admin auth
                else
                {
                    Agencija? agencijaObject = await Context.Agencije.FindAsync(loginObject.Id);
                    loginResult = ObjectCreatorSingleton.Instance.CreateLoginResult(loginObject, null, agencijaObject);
                }

                if (!BCrypt.Net.BCrypt.Verify(request.Lozinka, loginObject?.LozinkaHash))
                {
                    return BadRequest("Pogresna sifra");
                }

                LoginObject login = new LoginObject
                {
                    Id = loginObject!.Id,
                    Role = loginObject.Role
                };

                string accessToken = CreateToken(login!);

                login.CurrentTime = DateTime.Now.AddMinutes(15);
                string refreshToken = CreateToken(login!);

                // skladisti refresh u bazu
                // vrati usera i auth token, ref u cookie
                // Create a new cookie


                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true
                };

                Response.Cookies.Append("RefreshToken", refreshToken, cookieOptions);
                return Ok(new { accessToken, loginResult });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private string CreateToken(LoginObject loginObject)
        {

            List<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.Sid, loginObject.Id.ToString()),
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


