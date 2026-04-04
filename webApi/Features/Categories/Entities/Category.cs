using webApi.Features.Transactions.Entities;

namespace webApi.Features.Categories.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Description { get; set; } = string.Empty;

        public string Purpose { get; set; } = string.Empty;

        // Relacionamento com Transactions
        public List<Transaction> Transactions { get; set; } = new();
    }
}
