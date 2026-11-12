import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark-theme');
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark-theme');
  });

  it('should be created', () => {
    service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });

  it('should initialize with dark theme if localStorage has theme="dark"', () => {
    localStorage.setItem('theme', 'dark');
    service = TestBed.inject(ThemeService);

    expect(service.isDarkMode()).toBe(true);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  it('should initialize with light theme if localStorage has theme="light"', () => {
    localStorage.setItem('theme', 'light');
    service = TestBed.inject(ThemeService);

    expect(service.isDarkMode()).toBe(false);
    expect(document.body.classList.contains('dark-theme')).toBe(false);
  });

  it('should toggle theme from light to dark and back, updating body class and persisting to localStorage', () => {
    localStorage.setItem('theme', 'light');
    service = TestBed.inject(ThemeService);

    expect(service.isDarkMode()).toBe(false);
    expect(document.body.classList.contains('dark-theme')).toBe(false);

    // Toggle to dark
    service.toggleTheme();
    expect(service.isDarkMode()).toBe(true);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Toggle back to light
    service.toggleTheme();
    expect(service.isDarkMode()).toBe(false);
    expect(document.body.classList.contains('dark-theme')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
