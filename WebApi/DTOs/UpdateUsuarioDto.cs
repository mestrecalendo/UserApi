﻿
using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace WebApi.DTOs
{
    public class UpdateUsuarioDto
    {
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Nome deve ter entre 3 e 20 caracteres!")]
        public string Nome { get; set; }

        [StringLength(100, MinimumLength = 3, ErrorMessage = "Nome deve ter entre 3 e 100 caracteres!")]
        public string Sobrenome { get; set; }

        [StringLength(50, ErrorMessage = "Email deve ter no máximo 50 caracteres!")]
        [RegularExpression(@"^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*\s+<(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})>$|^(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})$", ErrorMessage = "Formato do E-mail Inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A data de nascimento é obrigatória")]
        public DateTime DataNascimento { get; set; }

        public EscolaridadeType IdEscolaridade { get; set; }
    }
}
