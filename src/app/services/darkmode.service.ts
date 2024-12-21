import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkmodeService {
  constructor() {
    effect(() => {
      window.localStorage.setItem('darkModeSignal',JSON.stringify(this.theme()));
    })
  }

  theme = signal<string>(JSON.parse(window.localStorage.getItem('darkModeSignal') ?? 'null'));

  updateTheme() {
    this.theme.update((value) => (value === 'dark' ? 'null' : 'dark'));
  }
}
