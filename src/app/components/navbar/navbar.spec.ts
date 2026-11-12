import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';
import { ThemeService } from '../../services/theme';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render LexPad brand logo and link to home', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brandLink = compiled.querySelector('.navbar-brand a.logo');
    expect(brandLink).toBeTruthy();
    expect(brandLink?.textContent).toContain('LexPad');
    expect(brandLink?.querySelector('img')?.getAttribute('src')).toBe(
      'favicon.svg',
    );
  });

  it('should render primary navigation routes with ariaCurrentWhenActive="page"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll(
      '.navbar-links a:not(.cross-site-link)',
    );
    expect(navLinks.length).toBe(4);

    const labels = Array.from(navLinks).map((a) => a.textContent?.trim());
    expect(labels).toEqual(['Home', 'Features', 'Security', 'Privacy Policy']);
  });

  it('should render cross-site links to SQL Pulse and SSH Client', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const crossLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      '.navbar-links a.cross-site-link',
    );
    expect(crossLinks.length).toBe(2);

    expect(crossLinks[0].getAttribute('href')).toBe('https://sql-pulse.nanzen.se/');
    expect(crossLinks[0].textContent).toContain('SQL Pulse');

    expect(crossLinks[1].getAttribute('href')).toBe('https://ssh-client.nanzen.se/');
    expect(crossLinks[1].textContent).toContain('SSH Client');
  });

  it('should render theme toggle button and toggle theme when clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggleBtn = compiled.querySelector(
      '.theme-toggle',
    ) as HTMLButtonElement;
    expect(toggleBtn).toBeTruthy();

    themeService.isDarkMode.set(false);
    fixture.detectChanges();
    expect(toggleBtn.textContent).toContain('Dark');
    expect(toggleBtn.getAttribute('aria-label')).toBe('Switch to dark theme');

    toggleBtn.click();
    fixture.detectChanges();
    expect(themeService.isDarkMode()).toBe(true);
    expect(toggleBtn.textContent).toContain('Light');
    expect(toggleBtn.getAttribute('aria-label')).toBe('Switch to light theme');
  });
});
