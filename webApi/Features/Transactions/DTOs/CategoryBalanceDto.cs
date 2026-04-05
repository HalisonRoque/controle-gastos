namespace webApi.Features.Transactions.DTOs
{
    public class CategoryBalanceDto
    {
        public int CategoryId { get; set; }
        public string CategoryDescription { get; set; } = string.Empty;

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        public decimal Saldo => TotalReceitas - TotalDespesas;
    }
}
