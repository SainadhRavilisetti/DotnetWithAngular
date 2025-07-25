import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {}

  private createToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = "toast toast-bottom toast-end";
      document.body.appendChild(container);
    }
  }

  private createToastElement(message: string, alertClass: string, duration = 5000) {
    this.createToastContainer();

    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg', 'flex', 'items-center', 'justify-between', 'p-4', 'mb-2');

    const span = document.createElement('span');
    span.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'x';
    closeBtn.classList.add('ml-4', 'btn', 'btn-sm', 'btn-ghost');

    closeBtn.addEventListener('click', () => {
      toast.remove();
    });

    toast.appendChild(span);
    toast.appendChild(closeBtn);

    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement === toastContainer) {
        toast.remove();
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
}
