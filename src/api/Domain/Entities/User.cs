using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Domain.Entities
{
    public class User
    {
        public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }

        private DateTime _dataNascimento;
        public DateTime DataNascimento {
            get { return _dataNascimento; }

            set {
                if (!this.ValidaIdade(value))
                {
                   throw new FormatException("A idade do usuário não pode ser menor que 15 anos");
                }
                _dataNascimento = value;
            } 
        }
        public virtual EscolaridadeType IdEscolaridade { get; set; }

        private bool ValidaIdade(DateTime data)
        {
            var dataNascimento = Convert.ToDateTime(data);
            var IdadeDoUsuario = DateTime.Today.Year - dataNascimento.Year;

            if (dataNascimento > DateTime.Today.AddYears(-IdadeDoUsuario))
            {
                IdadeDoUsuario--;
            }

            if (IdadeDoUsuario <= 15)
            {
               return false;
            }

            return true;
        }

    }
}
