using Microsoft.AspNetCore.Mvc;
using webApi.Features.Persons.DTOs;
using webApi.Features.Persons.Services;

namespace webApi.Features.Persons.Controllers
{
    [ApiController]
    [Route("api/person")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _service;

        public PersonController(IPersonService service)
        {
            _service = service;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll([FromQuery] string? name)
        {
            return Ok(await _service.GetAllAsync(name));
        }

        // GET: api/person/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _service.GetByIdAsync(id));
        }

        // POST: api/person
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreatePersonDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        // PUT: api/person/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePersonDto dto)
        {
            await _service.UpdateAsync(id, dto);
            return NoContent();
        }

        // DELETE: api/person/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
