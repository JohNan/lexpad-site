import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the root component', () => {
    expect(component).toBeTruthy();
  });

  it('should expose lexpad-marketing-site title signal', () => {
    expect((component as unknown as { title: () => string }).title()).toEqual(
      'lexpad-marketing-site',
    );
  });

  it('should render skip link, app-navbar, main#main-content, and app-footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const skipLink = compiled.querySelector('a.skip-link');
    expect(skipLink).toBeTruthy();
    expect(skipLink?.getAttribute('href')).toBe('#main-content');
    expect(skipLink?.textContent).toContain('Skip to main content');

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    const mainEl = compiled.querySelector('main#main-content');
    expect(mainEl).toBeTruthy();
    expect(mainEl?.getAttribute('tabindex')).toBe('-1');
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
