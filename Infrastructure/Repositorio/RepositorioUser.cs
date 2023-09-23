using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Repositorio
{
    public class RepositorioUser : RepositoryGenerics<User>, IUsuario
    {
    }
}
