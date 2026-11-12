import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Terms } from './terms';

describe('Terms', () => {
  let component: Terms;
  let fixture: ComponentFixture<Terms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Terms],
    }).compileComponents();

    fixture = TestBed.createComponent(Terms);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render LexPad Terms of Service headline, effective date, package, and publisher', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Terms of Service for LexPad: File & Code Editor',
    );
    expect(compiled.textContent).toContain('November 12, 2026');
    expect(compiled.textContent).toContain('com.johnan.lexpad');
    expect(compiled.textContent).toContain('Nanzen');
  });

  it('should cover all required legal sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('1. Acceptance of Terms');
    expect(compiled.textContent).toContain(
      '2. Local File Editing & User Backup Responsibility',
    );
    expect(compiled.textContent).toContain(
      '3. Pro Subscriptions & One-Time Purchases',
    );
    expect(compiled.textContent).toContain('4. Intellectual Property');
    expect(compiled.textContent).toContain('5. Disclaimer of Warranty');
    expect(compiled.textContent).toContain('6. Limitation of Liability');
    expect(compiled.textContent).toContain('7. Contact Us');
  });

  it('should reference Google Play In-App Billing, :editor-core and :editor-ui intellectual property', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Google Play In-App Billing');
    expect(compiled.textContent).toContain('LexPad Pro');
    expect(compiled.textContent).toContain(':editor-core');
    expect(compiled.textContent).toContain(':editor-ui');
  });

  it('should render contact email link to info@nanzen.se inside #contact-email', () => {
    const emailLink = fixture.nativeElement.querySelector('#contact-email a');
    expect(emailLink).toBeTruthy();
    expect(emailLink.getAttribute('href')).toBe('mailto:info@nanzen.se');
    expect(emailLink.textContent).toContain('info@nanzen.se');
  });
});
