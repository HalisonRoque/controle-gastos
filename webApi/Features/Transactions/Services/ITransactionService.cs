using webApi.Features.Transactions.DTOs;

namespace webApi.Features.Transactions.Services
{
    /*Declaração de inteface para as funções usadas no service, onde recebe os mesmo dados*/
    public interface ITransactionService
    {
        Task<List<ResponseTransactionDto>> GetAllAsync(string? person);
        Task<ResponseTransactionDto> CreateAsync(CreateTransactionDto dto);
        Task<PersonBalanceResponseDto> GetBalanceAsync();
        Task<CategoryBalanceResponseDto> GetCategoryBalanceAsync();
    }
}
