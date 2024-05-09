using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Services;

namespace backend.Middleware
{
    public class ValidateUserIdMiddleware
    {
        private readonly RequestDelegate _next;
        //private readonly IUserService _userService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ValidateUserIdMiddleware(RequestDelegate next, IHttpContextAccessor httpContextAccessor)
        {
            _next = next;
            //_userService = userService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task Invoke(HttpContext context)
        {
            var userIdFromToken = string.Empty;
            if(_httpContextAccessor.HttpContext is not null)
            {
                userIdFromToken = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Sid) ?? string.Empty;
            }

            var idKorisnika = context.Request.RouteValues["idKorisnika"]?.ToString();

            if (userIdFromToken != idKorisnika)
            {
                context.Response.StatusCode = 403; // Forbidden
                await context.Response.WriteAsync("Nisi ti taj pravi");
                return;
            }

            await _next(context);
        }
    }
}