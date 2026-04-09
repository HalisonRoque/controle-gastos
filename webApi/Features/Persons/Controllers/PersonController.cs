using Microsoft.AspNetCore.Mvc;
using webApi.Features.Persons.DTOs;
using webApi.Features.Persons.Services;

/*Controller de pessoas usado para criação de endpoint pra por meio de metodos http fazer a comunição com o frontend*/
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

        // GET: /api/person/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAll([FromQuery] string? name)
        {
            return Ok(await _service.GetAllAsync(name));
        }

        // GET: /api/person/id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _service.GetByIdAsync(id));
        }

        // POST: api/person/create
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreatePersonDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        // PUT: api/person/id
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePersonDto dto)
        {
            await _service.UpdateAsync(id, dto);
            return NoContent();
        }

        // DELETE: api/person/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
