using System.Net;
using webApi.Exceptions;

namespace webApi.Features.Categories.Error
{
    public class CategoryInvalidPurposeException : BaseException
    {
        public CategoryInvalidPurposeException()
            : base("Finalidade Inválida. Use: Receita, Despesa ou Ambas", HttpStatusCode.BadRequest)
        { }
    }
}
