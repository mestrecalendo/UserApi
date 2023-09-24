import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from "../../shared/input/input.component";
import { NbCardModule, NbLayoutModule } from '@nebular/theme';

@Component({
    selector: 'app-formulario',
    standalone: true,
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.scss'],
    imports: [CommonModule]
})
export class FormularioComponent {

}
