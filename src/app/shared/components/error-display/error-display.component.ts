import { Component, inject } from '@angular/core';
import { ErrorService } from '../../../core/services/error.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-display',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './error-display.component.html',
  styleUrl: './error-display.component.scss',
})
export class ErrorDisplayComponent {
  errorService = inject(ErrorService);
}
