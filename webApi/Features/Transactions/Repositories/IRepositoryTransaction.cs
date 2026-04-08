using TransactionEntity = webApi.Features.Transactions.Entities.Transaction;

namespace webApi.Features.Transactions.Repositories
{
    public interface ITransactionRepository
    {
        Task<List<TransactionEntity>> GetAllAsync();
        Task<TransactionEntity> CreateAsync(TransactionEntity transaction);
    }
}
