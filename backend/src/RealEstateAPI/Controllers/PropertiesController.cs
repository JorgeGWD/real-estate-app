using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.Models;
using RealEstateAPI.Services;

namespace RealEstateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly PropertyService _service;

        public PropertiesController(PropertyService service)
        {
            _service = service;
        }

        // GET: api/properties
        [HttpGet]
        public async Task<ActionResult<List<Property>>> GetAll(
            [FromQuery] string? name,
            [FromQuery] string? address,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {
            var properties = await _service.FilterAsync(name, address, minPrice, maxPrice);
            return Ok(properties);
        }

        // GET: api/properties/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> GetById(string id)
        {
            var property = await _service.GetByIdAsync(id);

            if (property == null)
                return NotFound(new { message = $"No property found with id {id}" });

            return Ok(property);
        }
    }
}