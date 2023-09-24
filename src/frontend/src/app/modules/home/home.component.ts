import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ListaUsuariosComponent } from 'src/app/shared/lista-usuarios/lista-usuarios.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListaUsuariosComponent, NbFormFieldModule,NbInputModule,NbIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 
}
