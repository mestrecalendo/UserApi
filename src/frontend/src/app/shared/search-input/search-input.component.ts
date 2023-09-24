import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule,NbFormFieldModule,NbInputModule,NbIconModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Output()
  public emmitSearch: EventEmitter<string> = new EventEmitter();

  public search(value: string){
    this.emmitSearch.emit(value);
  }
}
