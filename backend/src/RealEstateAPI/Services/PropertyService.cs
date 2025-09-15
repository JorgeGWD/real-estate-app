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

        public async Task<List<Property>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Property?> GetByIdAsync(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<List<Property>> FilterAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)
        {
            return await _repository.FilterAsync(name, address, minPrice, maxPrice);
        }
    }
}