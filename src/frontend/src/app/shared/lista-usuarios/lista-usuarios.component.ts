import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbActionsModule, NbCardModule, NbDialogModule } from '@nebular/theme';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { SearchInputComponent } from "../search-input/search-input.component";


@Component({
    selector: 'app-lista-usuarios',
    standalone: true,
    templateUrl: './lista-usuarios.component.html',
    styleUrls: ['./lista-usuarios.component.scss'],
    imports: [CommonModule, NbDialogModule, NbCardModule, NbActionsModule, SearchInputComponent]
})
export class ListaUsuariosComponent implements OnInit{
  private listaUsuarios?: any;
  public getAllUsers?: any;

  constructor(private usuarioService: UsuarioService,private router: Router,private alertService: AlertService) { }

  ngOnInit(): void {
    this.usuarioService.ListarUsuarios().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
        this.getAllUsers = this.listaUsuarios
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

  public getSearch(value: string){
    const filter = this.listaUsuarios?.filter( (res: any ) => {
      console.log(res)
      return !res.nome.indexOf(value.toLowerCase());
    });

    this.getAllUsers = filter;
  }
}
