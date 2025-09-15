using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.Models;
using RealEstateAPI.Services;
using RealEstateAPI.DTOs;

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
        public async Task<ActionResult<List<PropertyDto>>> GetAll(
            [FromQuery] string? name,
            [FromQuery] string? address,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {
            var properties = await _service.FilterAsync(name, address, minPrice, maxPrice);

            var dtoList = properties.Select(p => new PropertyDto
            {
                Id = p.Id,
                IdOwner = p.IdOwner,
                Name = p.Name,
                Address = p.Address,
                Price = p.Price,
                ImageUrl = p.ImageUrl,
                Owner = null // TODO: mapear Owner cuando se implemente
            }).ToList();

            return Ok(dtoList);
        }

        // GET: api/properties/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyDto>> GetById(string id)
        {
            var property = await _service.GetByIdAsync(id);

            if (property == null)
                return NotFound(new { message = $"No property found with id {id}" });

            var dto = new PropertyDto
            {
                Id = property.Id,
                IdOwner = property.IdOwner,
                Name = property.Name,
                Address = property.Address,
                Price = property.Price,
                ImageUrl = property.ImageUrl,
                Owner = null // TODO: mapear Owner cuando se implemente
            };

            return Ok(dto);
        }

        // POST: api/properties
        [HttpPost]
        public async Task<ActionResult<PropertyDto>> Create(PropertyDto dto)
        {
            var property = new Property
            {
                IdOwner = dto.IdOwner,
                Name = dto.Name,
                Address = dto.Address,
                Price = dto.Price,
                ImageUrl = dto.ImageUrl
            };

            await _service.CreateAsync(property);

            dto.Id = property.Id; // se asigna desde MongoDB

            return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
        }
    }
}