using System.Reflection;
using NSwag.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<ICacheFactory, CacheFactory>();
builder.Services.AddSingleton<IStringMatcherFactory, StringMatcherFactory>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();


// app.UseSwaggerUi3(settings =>
//     {
//         settings.Path = "/api";
//         settings.DocumentPath = "/api/specification.json";
//     });

// app.UseSwaggerUi( Assembly.GetExecutingAssembly(), settings =>
// {
//     settings.Path = "/api";
//     settings.DocumentPath = "/api/specification.json";
// });

app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
