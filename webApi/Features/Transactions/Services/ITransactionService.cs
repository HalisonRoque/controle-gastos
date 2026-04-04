using webApi.Features.Transactions.DTOs;

namespace webApi.Features.Transactions.Services
{
    public interface ITransactionService
    {
        Task<List<ResponseTransactionDto>> GetAllAsync();
        Task<ResponseTransactionDto> CreateAsync(CreateTransactionDto dto);
    }
}
