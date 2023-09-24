import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbActionsModule, NbCardModule, NbDialogModule } from '@nebular/theme';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule,NbDialogModule, NbCardModule, NbActionsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit{
  listaUsuarios?: any[]

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.ListarUsuarios().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
      },
      error: (error: any) => { }
    });
  }


  removeUsuario(id: number) {
    this.usuarioService.ExcluirUsuario(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
