import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly themeState = signal<Theme>('light');

  readonly theme = this.themeState.asReadonly();
  readonly isDark = () => this.themeState() === 'dark';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('nova-theme');
      this.setTheme(savedTheme === 'dark' ? 'dark' : 'light', false);
    }
  }

  toggle(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  private setTheme(theme: Theme, persist = true): void {
    this.themeState.set(theme);
    this.document.documentElement.dataset['theme'] = theme;

    if (persist && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nova-theme', theme);
    }
  }
}
