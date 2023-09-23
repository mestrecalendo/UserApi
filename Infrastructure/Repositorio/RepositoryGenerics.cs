using Domain.Interfaces;
using Infrastructure.Configuracao;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositorio
{
    public class RepositoryGenericsy<T> : IGeneric<T> where T : BaseEntity
    {
        private ContextDb context;

        public BaseRepository(ContextDb _context)
        {
            this.context = _context;
        }

        public void Add(T obj)
        {
            context.Set<T>().Add(obj);
            context.SaveChanges();
        }

        public void Update(T obj)
        {
            context.Entry(obj).State = EntityState.Modified;
            context.SaveChanges();
        }

        public async Task DeleteAsync(int id)
        {
            context.Set<T>().Remove(await SelectAsync(id));
            context.SaveChanges();
        }

        public Task<List<T>> SelectAsync() => context.Set<T>().ToListAsync();
    }
}
