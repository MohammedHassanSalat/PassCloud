import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkmodeService {
  constructor() {
    // Effect to store the theme in local storage whenever it changes
    effect(() => {
      window.localStorage.setItem(
        'darkModeSignal',
        JSON.stringify(this.theme())
      );
    });
  }

  // Signal to track the current theme ('dark' or 'null')
  theme = signal<string>(
    JSON.parse(window.localStorage.getItem('darkModeSignal') ?? 'null')
  );

  // Toggles the theme between 'dark' and 'null' (light mode).
  updateTheme() {
    this.theme.update((value) => (value === 'dark' ? 'null' : 'dark'));
  }
}
