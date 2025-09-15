using RealEstateAPI.Models;
using MongoDB.Driver;

namespace RealEstateAPI.Data
{
    public static class SeedData
    {
        public static void Initialize(IMongoDatabase database)
        {
            var properties = database.GetCollection<Property>("Properties");

            if (!properties.Find(_ => true).Any())
            {
                var seedProperties = new List<Property>
                {
                    new Property
                    {
                        IdOwner = "OWNER001",
                        Name = "Modern Apartment",
                        Address = "123 Main St, Bogotá",
                        Price = 250000,
                        ImageUrl = "https://picsum.photos/400/300?random=1"
                    },
                    new Property
                    {
                        IdOwner = "OWNER002",
                        Name = "Luxury Villa",
                        Address = "45 Avenida Norte, Medellín",
                        Price = 850000,
                        ImageUrl = "https://picsum.photos/400/300?random=2"
                    },
                    new Property
                    {
                        IdOwner = "OWNER003",
                        Name = "Country House",
                        Address = "Km 12 Via Cali - Palmira",
                        Price = 400000,
                        ImageUrl = "https://picsum.photos/400/300?random=3"
                    },
                    new Property
                    {
                        IdOwner = "OWNER004",
                        Name = "Studio Downtown",
                        Address = "Calle 80 #25-10, Bogotá",
                        Price = 150000,
                        ImageUrl = "https://picsum.photos/400/300?random=4"
                    }
                };

                properties.InsertMany(seedProperties);
            }
        }
    }
}