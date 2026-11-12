import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render LexPad brand title', () => {
    const brandElement = fixture.nativeElement.querySelector(
      '.footer-brand-title',
    );
    expect(brandElement.textContent).toContain(
      'LexPad — File, Code & Markdown Editor for Android',
    );
  });

  it('should render primary footer navigation routes with ariaCurrentWhenActive="page"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll(
      '.footer-links a:not(.cross-site-footer-link)',
    );
    expect(links.length).toBe(5);

    const labels = Array.from(links).map((a) => a.textContent?.trim());
    expect(labels).toEqual([
      'Home',
      'Features',
      'Security',
      'Privacy Policy',
      'Terms',
    ]);
  });

  it('should render cross-site links to SQL Pulse and SSH Client', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const crossLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      'a.cross-site-footer-link',
    );
    expect(crossLinks.length).toBe(2);

    expect(crossLinks[0].getAttribute('href')).toBe('https://sql-pulse.nanzen.se/');
    expect(crossLinks[0].textContent).toContain('SQL Pulse for Android');

    expect(crossLinks[1].getAttribute('href')).toBe('https://ssh-client.nanzen.se/');
    expect(crossLinks[1].textContent).toContain('SSH Client for Android');
  });

  it('should render copyright with current year, Nanzen and LexPad', () => {
    const copyrightElement =
      fixture.nativeElement.querySelector('.footer-copyright');
    expect(copyrightElement.textContent).toContain(
      `${component.currentYear} Nanzen — LexPad`,
    );
  });
});
