using webApi.Features.Transactions.Entities;

namespace webApi.Features.Transactions.Repositories
{
    public interface ITransactionRepository
    {
        Task<List<Transaction>> GetAllAsync();
        Task<Transaction> CreateAsync(Transaction transaction);
    }
}
