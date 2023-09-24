import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbActionsModule, NbCardModule, NbDialogModule } from '@nebular/theme';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';


@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule,NbDialogModule, NbCardModule, NbActionsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit{
  listaUsuarios?: any[]

  constructor(private usuarioService: UsuarioService,private router: Router,private alertService: AlertService) { }

  ngOnInit(): void {
    this.usuarioService.ListarUsuarios().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.showToast("Error", error ? error.status : "Algo deu Errado", 5000, 'danger', 1)
      }
    });
  }


  removeUsuario(id: number) {
    this.usuarioService.ExcluirUsuario(id).subscribe({
      next: () => {
        this.ngOnInit();
        this.alertService.showToast("Sucesso", "Usuário removido", 5000, 'success', 1)
      },
      error: (error: any) => {
        this.alertService.showToast("Error", error ? error.status : "Algo deu Errado", 5000, 'danger', 1)
      }
    })
  }

  editarUsuario(idUsuario: number){
    this.router.navigate(['/cadastrar-usuario',{id: idUsuario} ])
  }
}
