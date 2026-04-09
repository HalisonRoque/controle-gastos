using Microsoft.AspNetCore.Mvc;
using webApi.Features.Transactions.DTOs;
using webApi.Features.Transactions.Services;

/*Controller de Transações usado para criação de endpoint pra por meio de metodos http fazer a comunição com o frontend*/
namespace webApi.Features.Transactions.Controllers
{
    [ApiController]
    [Route("api/transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _service;

        public TransactionController(ITransactionService service)
        {
            _service = service;
        }

        // GET: /api/transaction/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAll([FromQuery] string? person)
        {
            return Ok(await _service.GetAllAsync(person));
        }

        // POST: /api/transaction/create
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateTransactionDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        // GET: /api/transaction/balance
        [HttpGet("balance")]
        public async Task<IActionResult> GetBalance()
        {
            var result = await _service.GetBalanceAsync();
            return Ok(result);
        }

        // GET: /api/transaction/balance/category
        [HttpGet("balance/category")]
        public async Task<IActionResult> GetCategoryBalance()
        {
            var result = await _service.GetCategoryBalanceAsync();
            return Ok(result);
        }
    }
}
