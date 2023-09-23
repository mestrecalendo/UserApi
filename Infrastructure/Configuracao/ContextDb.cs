using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Configuracao
{
    public class ContextDb : DbContext
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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasKey(t => t.IdUsuario);
            builder.Entity<Escolaridade>().HasKey(t => t.IdEscolaridade);

            base.OnModelCreating(builder);
        }

        public string ObterStringConexao()
        {
            return "Data Source=CALENDOSCOPIO;Initial Catalog=usuario_db;Integrated Security=True;TrustServerCertificate=True";
        
        }
    }
}
