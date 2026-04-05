namespace webApi.Features.Transactions.DTOs
{
    public class CategoryBalanceResponseDto
    {
        public List<CategoryBalanceDto> Data { get; set; } = new();

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal SaldoLiquido => TotalReceitas - TotalDespesas;
    }
}
