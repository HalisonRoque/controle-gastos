using webApi.Features.Transactions.DTOs;

namespace webApi.Features.Transactions.Services
{
    public interface ITransactionService
    {
        Task<List<ResponseTransactionDto>> GetAllAsync();
        Task<ResponseTransactionDto> CreateAsync(CreateTransactionDto dto);
        Task<PersonBalanceResponseDto> GetBalanceAsync(int? personId, int page, int pageSize);
        Task<CategoryBalanceResponseDto> GetCategoryBalanceAsync();
    }
}
