import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { idade, validatorData } from './validatorData';
import { User } from 'src/app/models/user';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbInputModule, NbSelectModule, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [CommonModule,NbDatepickerModule, ReactiveFormsModule, FormsModule, NbInputModule, NbButtonModule, NbSelectModule, NbCardModule]
})
export class FormularioComponent implements OnInit {

  userId: number;
  UserForm: FormGroup;
  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;

  constructor(private toastrService: NbToastrService, private usuarioService: UsuarioService, private router: ActivatedRoute, private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      sobrenome: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required,Validators.email, Validators.maxLength(50)]],
      dataNascimento: ['', [Validators.required, idade]],
      escolaridade: ['', [Validators.required]],
    })

    const _id = this.router.snapshot.paramMap.get('id');
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
        error: (error: any) => { }
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
      this.getFormValidationErrors(this.logicalPositions.BOTTOM_END)
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
      },
      error: (e: any) => {
        alert(JSON.stringify(e))
      }
    }
    )
  }


  editar() {
    if (!this.UserForm.valid) {
      this.getFormValidationErrors(this.logicalPositions.BOTTOM_END)
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
      },
      error: (e: any) => {
        alert(JSON.stringify(e))
      }
    }
    )
  }

  getFormValidationErrors(position: NbGlobalPosition) {
    Object.keys(this.UserForm.controls).forEach(key => {
      const controlErrors = this.UserForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log(controlErrors);

          this.toastrService.show(`${controlErrors[keyError].length > 5 ? controlErrors[keyError] : "Preencha os campos corretamente"}`, `Campo:  ${key}, Error:  ${keyError}`, { limit: 3, position, duration: 5000, status: 'danger' });
        });
      }
    });
  }

}
