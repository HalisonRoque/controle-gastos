using Microsoft.EntityFrameworkCore;
using webApi.Data;
using TransactionEntity = webApi.Features.Transactions.Entities.Transaction;

namespace webApi.Features.Transactions.Repositories
{
    /*Criação de Repositories para acessar o banco de dados buscando e crinado registros*/
    public class TransactionRepository : ITransactionRepository
    {
        private readonly AppDbContext _context;

        public TransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TransactionEntity>> GetAllAsync()
        {
            return await _context.Transactions.Include(t => t.Person).ToListAsync();
        }

        public async Task<TransactionEntity> CreateAsync(TransactionEntity transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }
    }
}
