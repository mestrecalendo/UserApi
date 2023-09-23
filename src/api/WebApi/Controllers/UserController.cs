using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Configuracao;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Threading.Tasks;
using WebApi.DTOs;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsuario _interfaceUsuario;
        private ContextDb _context;
        public UserController(IUsuario InterfaceUsuario, ContextDb ContextDb)
        {
            _interfaceUsuario = InterfaceUsuario;
            _context = ContextDb;
        }
        
        [HttpGet]
        public async Task<object> ListaUsuarios()
        {
            return await _interfaceUsuario.List();
        }

        [HttpPost]
        public async Task<object> AdicionaUsuario([FromBody] CreateUsuarioDto usuario)
        {
            User novoUsuario = new()
            {
                Nome = usuario.Nome,
                Sobrenome = usuario.Sobrenome,
                Email = usuario.Email,
                DataNascimento = usuario.DataNascimento,
                IdEscolaridade = usuario.IdEscolaridade,
            };

            try
            {
                await _interfaceUsuario.Add(novoUsuario);
                return CreatedAtAction(nameof(GetUsuarioPorId), new { Id = novoUsuario.IdUsuario }, usuario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<object> GetUsuarioPorId(int id)
        {
            var usuario = await _interfaceUsuario.GetEntityById(id);
            if (usuario == null) return NotFound();

            return Ok(usuario);
        }

        [HttpPut("{id}")]
        public async Task<object> AtualizaUsuario(int id, [FromBody] UpdateUsuarioDto novoUsuario)
        {
            var usuario = await _context.Usuario.FirstOrDefaultAsync(x => x.IdUsuario == id);
            if (usuario == null) return NotFound();

            try
            {
                usuario.Nome = novoUsuario.Nome;
                usuario.Sobrenome = novoUsuario.Sobrenome;
                usuario.Email = novoUsuario.Email;
                usuario.DataNascimento = novoUsuario.DataNascimento;
                usuario.IdEscolaridade = novoUsuario.IdEscolaridade;

                await _interfaceUsuario.Update(usuario);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpDelete("{id}")]
        public async Task<object> RemoveUsuario(int id)
        {
            var usuario = await _context.Usuario.FirstOrDefaultAsync(x => x.IdUsuario == id);
            if (usuario == null) return NotFound();

            try
            {
                await _interfaceUsuario.Delete(usuario);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
