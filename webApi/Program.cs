using Microsoft.EntityFrameworkCore;
using webApi.Data;
using webApi.Features.Categories.Repositories;
using webApi.Features.Categories.Services;
using webApi.Features.Persons.Repositories;
using webApi.Features.Persons.Services;
using webApi.Features.Transactions.Repositories;
using webApi.Features.Transactions.Services;
using webApi.Middlewares;

/*Cria o builder da aplicação, que configura todos os serviços, middleware e pipeline HTTP*/
var builder = WebApplication.CreateBuilder(args);

/*Adiciona o DbContext do Entity Framework à aplicação, usando SQLite*/

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

/*Adiciona suporte aos controllers da aplicação*/
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

/*Adiciona o Swagger para gerar a documentação interativa da API*/
builder.Services.AddSwaggerGen();

/*Registra serviços e repositórios com injeção de dependência no sistema*/
builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

/*Permite apenas esse servidor de front-end
Permite qualquer método (GET, POST, PUT, DELETE)*/
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        }
    );
});

var app = builder.Build();

/*Adiciona o middleware do Swagger*/
app.UseSwagger();
app.UseSwaggerUI();

/*Redireciona requisições HTTP para HTTPS automaticamente*/
app.UseHttpsRedirection();

/*Aplica a política de CORS definida anteriormente*/
app.UseCors("AllowFrontend");

app.UseAuthorization();

/*Redireciona requisições HTTP para HTTPS automaticamente*/
app.UseMiddleware<ExceptionMiddleware>();

/*Faz o mapeamento dos controllers para rotas da API*/
app.MapControllers();

app.Run();
