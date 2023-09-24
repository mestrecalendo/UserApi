import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from 'src/app/shared/formulario/formulario.component';
import { NbActionsModule } from '@nebular/theme';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule,FormularioComponent,NbActionsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  constructor(private usuarioService: UsuarioService,private router: Router) { }

  goBack(){
    this.router.navigate(['/'])
  }
}
