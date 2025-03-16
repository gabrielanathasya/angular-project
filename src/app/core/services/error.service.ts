import { Injectable, signal } from '@angular/core';

export interface ErrorState {
  status: number | null;
  message: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errorState = signal<ErrorState>({
    status: null,
    message: '',
    visible: false,
  });

  showError(status: number, message: string): void {
    this.errorState.set({
      status,
      message,
      visible: true,
    });
  }

  hideError(): void {
    this.errorState.update((state) => ({
      ...state,
      visible: false,
    }));
  }
}
