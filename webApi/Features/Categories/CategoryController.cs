using Microsoft.AspNetCore.Mvc;
using webApi.Features.Categories.Entities;
using webApi.Features.Categories.Services;

namespace webApi.Features.Categories
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

        // GET: api/category
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllCategoryAsync());
        }

        // POST: api/category
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Category category)
        {
            var result = await _service.CreateCategoryAsync(category);
            return Ok(result);
        }
    }
}
