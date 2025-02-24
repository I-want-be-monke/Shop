using DildoShop.Server.DataBase;
using DildoShop.Server.Service; // Убедитесь, что вы добавили это пространство имен
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Добавляем DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Добавляем CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Добавляем Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "Описание вашего API",
        TermsOfService = new Uri("https://example.com/terms"),
        Contact = new OpenApiContact
        {
            Name = "Ваше имя",
            Url = new Uri("https://example.com/contact")
        },
        License = new OpenApiLicense
        {
            Name = "Лицензия",
            Url = new Uri("https://example.com/license")
        }
    });
});


builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITwoFactorAuthService, TwoFactorAuthService>();


builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowAll");

// Включаем Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = "swagger";
});

// Обработка ошибок
app.UseExceptionHandler("/error");

app.MapPost("/error", (HttpContext httpContext) =>
{
    var exception = httpContext.Features.Get<IExceptionHandlerFeature>()?.Error;
    return Results.Problem(detail: exception?.Message);
});

app.MapFallbackToFile("index.html");

app.MapControllers();
app.Run();
