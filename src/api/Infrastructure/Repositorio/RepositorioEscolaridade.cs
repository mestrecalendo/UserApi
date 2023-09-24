using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Configuracao;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositorio
{
    public class RepositorioEscolaridade : IEscolaridade
    {
        private readonly DbContextOptions<ContextDb> _OptionsBuilder;

        public RepositorioEscolaridade()
        {
            _OptionsBuilder = new DbContextOptions<ContextDb>();
        }

        public async Task<IList<Escolaridade>> ListarEscolaridade()
        {
            using var banco = new ContextDb(_OptionsBuilder);
            return await
                banco.Escolaridade
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
