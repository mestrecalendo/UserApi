using Domain.Interfaces;
using Infrastructure.Configuracao;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EscolaridadeController
    {
        private readonly IEscolaridade _interfaceEscolaridade;
   
        public EscolaridadeController(IEscolaridade InterfaceEscolaridade)
        {
            _interfaceEscolaridade = InterfaceEscolaridade;
           
        }

        [HttpGet]
        public async Task<object> ListaUsuarios()
        {
            return await _interfaceEscolaridade.ListarEscolaridade();
        }
    }
}
