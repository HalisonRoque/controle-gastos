using Microsoft.EntityFrameworkCore;
using webApi.Data;
using webApi.Features.Transactions.Entities;

namespace webApi.Features.Transactions.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly AppDbContext _context;

        public TransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Transaction>> GetAllAsync()
        {
            return await _context
                .Transactions.Include(t => t.Person)
                .Include(t => t.Category)
                .ToListAsync();
        }

        public async Task<Transaction> CreateAsync(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }
    }
}
