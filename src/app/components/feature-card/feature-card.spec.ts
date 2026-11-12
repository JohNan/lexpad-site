import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureCard } from './feature-card';

describe('FeatureCard', () => {
  let component: FeatureCard;
  let fixture: ComponentFixture<FeatureCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon, title, and description when provided', () => {
    fixture.componentRef.setInput('icon', 'code');
    fixture.componentRef.setInput('title', '16+ Syntax Grammars');
    fixture.componentRef.setInput(
      'description',
      'Deterministic token lexer in pure Kotlin JVM.',
    );
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const iconEl = compiled.querySelector('.icon-container .material-icons');
    expect(iconEl).toBeTruthy();
    expect(iconEl?.textContent?.trim()).toBe('code');

    const titleEl = compiled.querySelector('.feature-title');
    expect(titleEl?.textContent?.trim()).toBe('16+ Syntax Grammars');

    const descEl = compiled.querySelector('.feature-description');
    expect(descEl?.textContent?.trim()).toBe(
      'Deterministic token lexer in pure Kotlin JVM.',
    );
  });

  it('should not render icon container when icon is not provided', () => {
    fixture.componentRef.setInput('icon', '');
    fixture.componentRef.setInput('title', 'No Icon Feature');
    fixture.componentRef.setInput('description', 'Description without icon.');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.icon-container')).toBeNull();
    expect(compiled.querySelector('.feature-title')?.textContent?.trim()).toBe(
      'No Icon Feature',
    );
  });
});
