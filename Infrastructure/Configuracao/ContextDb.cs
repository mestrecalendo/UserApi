using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Configuracao
{
    internal class ContextDb : DbContext
    {
        public ContextDb(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Usuario { get; set; }
        public DbSet<Escolaridade> Escolaridade { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(ObterStringConexao());
                base.OnConfiguring(optionsBuilder);
            }
        }

        public string ObterStringConexao()
        {
            return "";
        
        }
    }
}
