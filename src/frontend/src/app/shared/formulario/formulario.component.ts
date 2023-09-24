import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { idade } from './validatorData';
import { User } from 'src/app/models/user';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { AlertService } from 'src/app/service/alert.service';
import { EscolaridadeService } from 'src/app/service/escolaridade.service';
import { Escolaridade } from 'src/app/models/escolaridade';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [CommonModule, NbDatepickerModule, ReactiveFormsModule, FormsModule, NbInputModule, NbButtonModule, NbSelectModule, NbCardModule]
})
export class FormularioComponent implements OnInit {

  userId: number;
  UserForm: FormGroup;
  listaEscolaridade?: Escolaridade[];

  constructor(private escolaridadeService: EscolaridadeService, private alertService: AlertService, private usuarioService: UsuarioService, private router: ActivatedRoute, private route: Router, private formBuilder: FormBuilder) {
    this.escolaridadeService.ListarEscolaridades().subscribe({
      next: (data) => {
        this.listaEscolaridade = data;
      },
      error: (error: any) => {
        this.alertService.showToast("Error", error ? error.status : "Algo deu Errado", 5000, 'danger', 1)
      }
    }
    )
  }

  ngOnInit(): void {
    const _id = this.router.snapshot.paramMap.get('id');

    this.UserForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      dataNascimento: ['', [Validators.required, idade]],
      escolaridade: ['', [Validators.required]],
    })

    if (_id) {
      this.userId = parseInt(_id);
      this.usuarioService.GetUsuarioById(this.userId).subscribe({
        next: (data) => {
          console.log(data, data.idEscolaridade);
          this.UserForm.get('nome')?.setValue(data.nome);
          this.UserForm.get('sobrenome')?.setValue(data.sobrenome);
          this.UserForm.get('email')?.setValue(data.email);
          this.UserForm.get('dataNascimento')?.setValue(new Date(data.dataNascimento));
          this.UserForm.get('escolaridade')?.setValue(data.idEscolaridade.toString());
        },
        error: (error: any) => {
        this.alertService.showToast("Error", error ? error.status : "Algo deu Errado", 5000, 'danger', 1)
        }
      });
    }
  }

  submitForm() {
    if (this.userId) {
      this.editar()
    } else {
      this.cadastrar()
    }
  }

  cadastrar() {
    if (!this.UserForm.valid) {
      this.getFormValidationErrors()
      return
    }

    const novoUsuario: User = {
      nome: this.UserForm.get('nome')?.value,
      sobrenome: this.UserForm.get('sobrenome')?.value,
      email: this.UserForm.get('email')?.value,
      dataNascimento: this.UserForm.get('dataNascimento')?.value,
      idEscolaridade: parseInt(this.UserForm.get('escolaridade')?.value),
    };

    this.usuarioService.cadastrarNovoUsuario(novoUsuario).subscribe({
      complete: () => {
        this.route.navigate(['/'])
        this.alertService.showToast("Sucesso", "Usuário Salvo", 5000, 'success', 1)
      },
      error: (error: any) => {
        this.alertService.showToast("Error", error ? error.status : "Algo deu Errado", 5000, 'danger', 1)
      }
    }
    )
  }

  editar() {
    if (!this.UserForm.valid) {
      this.getFormValidationErrors()
      return
    }

    const novoUsuario: User = {
      nome: this.UserForm.get('nome')?.value,
      sobrenome: this.UserForm.get('sobrenome')?.value,
      email: this.UserForm.get('email')?.value,
      dataNascimento: this.UserForm.get('dataNascimento')?.value,
      idEscolaridade: parseInt(this.UserForm.get('escolaridade')?.value),
    };

    this.usuarioService.AtualizarUsuario(this.userId, novoUsuario).subscribe({
      complete: () => {
        this.route.navigate(['/'])
        this.alertService.showToast("Sucesso", "Usuário Salvo", 5000, 'success', 1)
      },
      error: (error: any) => {
        this.alertService.showToast("Error", error ? error.status : "Algo deu Errado", 5000, 'danger', 1)
      }
    }
    )
  }

  getFormValidationErrors() {
    Object.keys(this.UserForm.controls).forEach(key => {
      const controlErrors = this.UserForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.alertService.showToast(`Campo:  ${key}, Error:  ${keyError}`,`${controlErrors[keyError].length > 5 ? controlErrors[keyError] : "Preencha os campos corretamente"}`, 5000, 'danger', 3)
        });
      }
    });
  }

}
