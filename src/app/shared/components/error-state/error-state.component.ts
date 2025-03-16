import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-error-state',
  imports: [CommonModule, MatIconModule, MatButtonModule, ButtonComponent],
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.scss',
})
export class ErrorStateComponent {
  icon = input<string>('error');
  title = input<string>('Error Occurred');
  message = input<string>('There was a problem processing your request.');
  buttonText = input<string>('Retry');
  buttonIcon = input<string>('refresh');

  retryClick = output<void>();
}
