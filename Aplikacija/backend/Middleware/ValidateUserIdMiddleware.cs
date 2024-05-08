using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;

namespace backend.Middleware
{
    public class ValidateUserIdMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IUserService _userService;

        public ValidateUserIdMiddleware(RequestDelegate next, IUserService userService)
        {
            _next = next;
            _userService = userService;
        }

        public async Task Invoke(HttpContext context)
        {
            var userIdFromToken = _userService.GetMyId();
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