import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkThemeClass = 'dark-theme';
  public isDarkMode = signal<boolean>(false);
  private isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);

    this.isBrowser = isPlatformBrowser(platformId);
    this.initTheme();
  }

  private initTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);

    this.isDarkMode.set(isDark);
    this.applyTheme(isDark);
  }

  public toggleTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    if (!this.isBrowser) {
      return;
    }

    if (isDark) {
      document.body.classList.add(this.darkThemeClass);
    } else {
      document.body.classList.remove(this.darkThemeClass);
    }
  }
}
