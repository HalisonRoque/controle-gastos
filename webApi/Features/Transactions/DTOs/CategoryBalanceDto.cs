/*DTO destinado para busca de categorias*/
namespace webApi.Features.Transactions.DTOs
{
    public class CategoryBalanceDto
    {
        public int CategoryId { get; set; }
        public string CategoryDescription { get; set; } = string.Empty;

        public decimal TotalIncome { get; set; }

        public decimal TotalExpenses { get; set; }

        public decimal BalanceItem => TotalIncome - TotalExpenses;
    }
}
