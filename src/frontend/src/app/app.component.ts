import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NbLayoutModule, NbButtonModule,NbEvaIconsModule,NbIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
}
