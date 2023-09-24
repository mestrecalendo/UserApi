import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbFormFieldModule, NbInputModule } from '@nebular/theme';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, NbFormFieldModule, NbInputModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

}
