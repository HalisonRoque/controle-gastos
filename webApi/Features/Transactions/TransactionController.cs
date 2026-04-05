using Microsoft.AspNetCore.Mvc;
using webApi.Features.Transactions.DTOs;
using webApi.Features.Transactions.Services;

namespace webApi.Features.Transactions
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

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateTransactionDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        [HttpGet("transaction/balance")]
        public async Task<IActionResult> GetBalance(
            [FromQuery] int? personId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10
        )
        {
            var result = await _service.GetBalanceAsync(personId, page, pageSize);
            return Ok(result);
        }

        [HttpGet("category/balance")]
        public async Task<IActionResult> GetCategoryBalance()
        {
            var result = await _service.GetCategoryBalanceAsync();
            return Ok(result);
        }
    }
}
