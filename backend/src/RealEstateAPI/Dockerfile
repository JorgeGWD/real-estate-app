# Imagen base para ASP.NET Core runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 10000

# Imagen para build con SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar todo el backend
COPY . .

# Restaurar dependencias y compilar
RUN dotnet restore RealEstateAPI.csproj
RUN dotnet publish RealEstateAPI.csproj -c Release -o /app/publish

# Imagen final
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "RealEstateAPI.dll", "--urls", "http://0.0.0.0:10000"]