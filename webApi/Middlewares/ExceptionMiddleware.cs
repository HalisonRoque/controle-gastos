using System.Text.Json;
using webApi.Exceptions;

/*Middleware para captura e envio de exceptions no sistema, deixando mais amigavel mensagens de erro*/
namespace webApi.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (BaseException ex)
            {
                context.Response.StatusCode = ex.StatusCode;
                context.Response.ContentType = "application/json";

                var response = new { message = ex.Message, status = ex.StatusCode };

                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
            catch (Exception)
            {
                context.Response.StatusCode = 500;

                var response = new { message = "Internal server error" };

                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
        }
    }
}
