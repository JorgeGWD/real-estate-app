using RealEstateAPI.Models;
using RealEstateAPI.Repositories;

namespace RealEstateAPI.Services
{
    public class PropertyService
    {
        private readonly PropertyRepository _repository;

        public PropertyService(PropertyRepository repository)
        {
            _repository = repository;
        }

        public Task<List<Property>> FilterAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice) =>
            _repository.FilterAsync(name, address, minPrice, maxPrice);

        public Task<Property?> GetByIdAsync(string id) =>
            _repository.GetByIdAsync(id);

        // ✅ Nuevo método
        public Task CreateAsync(Property property) =>
            _repository.CreateAsync(property);
    }
}