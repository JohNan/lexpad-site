import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPolicy } from './privacy-policy';

describe('PrivacyPolicy', () => {
  let component: PrivacyPolicy;
  let fixture: ComponentFixture<PrivacyPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicy],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render LexPad package com.johnan.lexpad and Nanzen developer info', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Privacy Policy for LexPad: File & Code Editor',
    );
    expect(compiled.textContent).toContain('com.johnan.lexpad');
    expect(compiled.textContent).toContain('Nanzen');
    expect(compiled.textContent).toContain('November 12, 2026');
  });

  it('should detail 100% local document storage in filesDir/buffers/ and SAF permissions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      '100% Local Document & Scratchpad Storage',
    );
    expect(compiled.textContent).toContain('filesDir/buffers/');
    expect(compiled.textContent).toContain('Storage Access Framework (SAF)');
    expect(compiled.textContent).toContain('OpenDocument');
    expect(compiled.textContent).toContain('CreateDocument');
  });

  it('should document biometric lock and third-party services (Play Billing, Crashlytics, Analytics)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('BiometricPrompt');
    expect(compiled.textContent).toContain(
      'Google Play Services & Google Play Billing',
    );
    expect(compiled.textContent).toContain('pro_version_unlock');
    expect(compiled.textContent).toContain('pro_subscription_monthly');
    expect(compiled.textContent).toContain('Firebase Crashlytics');
    expect(compiled.textContent).toContain('Firebase Analytics');
  });

  it('should render contact email link to info@nanzen.se inside #contact-email', () => {
    const emailLink = fixture.nativeElement.querySelector('#contact-email a');
    expect(emailLink).toBeTruthy();
    expect(emailLink.getAttribute('href')).toBe('mailto:info@nanzen.se');
    expect(emailLink.textContent).toContain('info@nanzen.se');
  });
});
