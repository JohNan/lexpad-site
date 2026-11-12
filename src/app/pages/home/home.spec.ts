import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';
import { ThemeService } from '../../services/theme';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero section with LexPad headline and badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'LexPad — File & Code Editor',
    );
    expect(compiled.textContent).toContain(
      'Material 3 Android Code, Markdown & File Studio',
    );
    expect(compiled.textContent).toContain('Instant multi-tab scratchpad');
  });

  it('should render the Google Play CTA link targeting com.johnan.lexpad', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const playStoreLinks = compiled.querySelectorAll(
      'a[href*="play.google.com/store/apps/details"]',
    );
    expect(playStoreLinks.length).toBeGreaterThan(0);
    playStoreLinks.forEach((link) => {
      expect(link.getAttribute('href')).toContain('id=com.johnan.lexpad');
    });
  });

  it('should render key LexPad feature cards in the value proposition grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const expectedCards = [
      'Instant Multi-Tab Scratchpad',
      '16+ Polyglot Syntax Grammars',
      'Split-Screen GFM Markdown',
      'Regex Search & Capture Replace',
      'RFC 3986 URL & Query Splitter',
      'Offline JSON Formatter & Minifier',
      'Virtualized 25 MB Log Viewer',
      'Direct Android SAF File Editing',
      'Docked Quick-Symbol Toolbar',
      '100% Local & Biometric Lock',
      'Native in 5 Languages',
      'LexPad Pro Studio Toolkit',
    ];

    for (const card of expectedCards) {
      expect(compiled.textContent).toContain(card);
    }
  });

  it('should embed ScreenshotShowcase and EditorStudioPreview components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-screenshot-showcase')).toBeTruthy();
    expect(compiled.querySelector('app-editor-studio-preview')).toBeTruthy();
  });

  it('should update hero screenshot image source based on theme mode', () => {
    const heroImg = fixture.nativeElement.querySelector(
      '.hero-screen-img',
    ) as HTMLImageElement;

    themeService.isDarkMode.set(false);
    fixture.detectChanges();
    expect(heroImg.getAttribute('src')).toBe(
      'screenshots/code_editor_light.png',
    );

    themeService.isDarkMode.set(true);
    fixture.detectChanges();
    expect(heroImg.getAttribute('src')).toBe('screenshots/code_editor_dark.png');
  });
});
