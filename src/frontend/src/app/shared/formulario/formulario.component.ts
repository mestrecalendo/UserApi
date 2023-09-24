import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [CommonModule]
})
export class FormularioComponent implements OnInit {

  userId: number;

  constructor(private usuarioService: UsuarioService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const _id = this.router.snapshot.paramMap.get('id');
    if (_id) {
      this.userId = parseInt(_id);
      this.usuarioService.GetUsuarioById(this.userId).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error: any) => { }
      });
    }
  }

}
