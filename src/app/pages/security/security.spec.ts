import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Security } from './security';

describe('Security', () => {
  let component: Security;
  let fixture: ComponentFixture<Security>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Security],
    }).compileComponents();

    fixture = TestBed.createComponent(Security);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title and zero-trust badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Security & Privacy Architecture',
    );
    expect(compiled.textContent).toContain('Zero-Trust Architecture');
  });

  it('should detail all 9 pillars of LexPad security architecture', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const expectedPillars = [
      '100% Local On-Device Buffer Store',
      'Zero Nanzen Cloud Servers',
      'Scoped Android SAF Permissions',
      'Hardware-Backed BiometricPrompt Lock',
      'Bounded 25 MB URI Reader Defense',
      'Linear/ICU-Safe BitSet Syntax Engine',
      'Ephemeral In-Memory Dev Tools',
      'Signed Google Play In-App Updates',
      'Audited Open-Source Licenses',
    ];

    for (const pillar of expectedPillars) {
      expect(compiled.textContent).toContain(pillar);
    }
  });

  it('should explicitly document local storage sandboxing in filesDir/buffers/', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('filesDir/buffers/');
  });
});
