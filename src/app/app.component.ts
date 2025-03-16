import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorDisplayComponent } from './shared/components/error-display/error-display.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'paper-take-home-test';
}
