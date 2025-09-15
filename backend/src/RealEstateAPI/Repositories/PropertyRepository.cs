using RealEstateAPI.Models;
using MongoDB.Driver;

namespace RealEstateAPI.Repositories
{
    public class PropertyRepository
    {
        private readonly IMongoCollection<Property> _properties;

        public PropertyRepository(IMongoDatabase database)
        {
            _properties = database.GetCollection<Property>("Properties");
        }

        public async Task<List<Property>> GetAllAsync() =>
            await _properties.Find(_ => true).ToListAsync();

        public async Task<Property?> GetByIdAsync(string id) =>
            await _properties.Find(p => p.Id == id).FirstOrDefaultAsync();

        public async Task<List<Property>> FilterAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)
        {
            var filter = Builders<Property>.Filter.Empty;

            if (!string.IsNullOrEmpty(name))
                filter &= Builders<Property>.Filter.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(name, "i"));

            if (!string.IsNullOrEmpty(address))
                filter &= Builders<Property>.Filter.Regex(p => p.Address, new MongoDB.Bson.BsonRegularExpression(address, "i"));

            if (minPrice.HasValue)
                filter &= Builders<Property>.Filter.Gte(p => p.Price, minPrice.Value);

            if (maxPrice.HasValue)
                filter &= Builders<Property>.Filter.Lte(p => p.Price, maxPrice.Value);

            return await _properties.Find(filter).ToListAsync();
        }

        // ✅ Nuevo método
        public async Task CreateAsync(Property property)
        {
            await _properties.InsertOneAsync(property);
        }
    }
}