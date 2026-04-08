using webApi.Features.Transactions.DTOs;

namespace webApi.Features.Transactions.Services
{
    public interface ITransactionService
    {
        Task<List<ResponseTransactionDto>> GetAllAsync(string? person);
        Task<ResponseTransactionDto> CreateAsync(CreateTransactionDto dto);
        Task<PersonBalanceResponseDto> GetBalanceAsync();
        Task<CategoryBalanceResponseDto> GetCategoryBalanceAsync();
    }
}
