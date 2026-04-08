using System.Net;
using webApi.Exceptions;

namespace webApi.Features.Transactions.Error
{
    public class UnderagePersonExpenseOnlyException : BaseException
    {
        public UnderagePersonExpenseOnlyException()
            : base("Menor de idade só pode realizar despesas.", HttpStatusCode.BadRequest) { }
    }
}
