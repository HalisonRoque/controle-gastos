/*DTO destinado para retorno de contas por categoria*/
namespace webApi.Features.Transactions.DTOs
{
    public class CategoryBalanceResponseDto
    {
        public List<CategoryBalanceDto> Data { get; set; } = new();

        public decimal TotalIncome { get; set; }

        public decimal TotalExpenses { get; set; }

        public decimal Balance { get; set; }
    }
}
