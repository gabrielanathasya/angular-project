import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [CommonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
  icon = input<string>('');
  fullWidth = input<boolean>(false);
  responsiveFullWidth = input<boolean>(false);
  disabled = input<boolean>(false);

  click = output<void>();
}
