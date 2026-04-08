namespace webApi.Features.Transactions.DTOs
{
    public class PersonBalanceDto
    {
        public int PersonId { get; set; }

        public string PersonName { get; set; } = string.Empty;

        public decimal TotalIncome { get; set; }

        public decimal TotalExpenses { get; set; }

        public decimal Saldo => TotalIncome - TotalExpenses;
    }
}
