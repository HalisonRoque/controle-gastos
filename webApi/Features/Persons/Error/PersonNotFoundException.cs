using System.Net;
using webApi.Exceptions;

namespace webApi.Features.Persons.Error
{
    public class PersonNotFoundException : BaseException
    {
        public PersonNotFoundException()
            : base("Usuário não encontrado!", HttpStatusCode.NotFound) { }
    }
}
