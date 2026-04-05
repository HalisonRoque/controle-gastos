namespace webApi.Features.Transactions.DTOs
{
    public class PersonBalanceDto
    {
        public int PersonId { get; set; }
        public string PersonName { get; set; } = string.Empty;

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        public decimal Saldo => TotalReceitas - TotalDespesas;
    }
}
