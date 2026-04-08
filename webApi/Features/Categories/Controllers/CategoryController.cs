using Microsoft.AspNetCore.Mvc;
using webApi.Features.Categories.DTOs;
using webApi.Features.Categories.Services;

namespace webApi.Features.Categories.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        // GET: /api/category
        [HttpGet("all")]
        public async Task<IActionResult> GetAll([FromQuery] string? purpose)
        {
            return Ok(await _service.GetAllCategoryAsync(purpose));
        }

        // POST: api/category
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDto category)
        {
            var result = await _service.CreateCategoryAsync(category);
            return Ok(result);
        }

        // POST: api/category/id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _service.GetCategoryByIdAsync(id));
        }
    }
}
