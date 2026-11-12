import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Features } from './features';

describe('Features', () => {
  let component: Features;
  let fixture: ComponentFixture<Features>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Features],
    }).compileComponents();

    fixture = TestBed.createComponent(Features);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title and badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'LexPad Feature Matrix',
    );
    expect(compiled.textContent).toContain('Editor Architecture');
  });

  it('should render Polyglot Code Engine (:editor-core) category and features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      'Polyglot Code Engine (:editor-core)',
    );
    expect(compiled.textContent).toContain('16+ Syntax Grammars');
    expect(compiled.textContent).toContain('Paste Content Heuristics');
    expect(compiled.textContent).toContain(
      'Viewport-Culled Line Gutter & Undo/Redo',
    );
    expect(compiled.textContent).toContain('Docked Quick-Symbol Toolbar');
  });

  it('should render Instant Scratchpad & Native File Access category and features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      'Instant Scratchpad & Native File Access',
    );
    expect(compiled.textContent).toContain(
      'Zero-Ceremony Multi-Tab Scratchpads',
    );
    expect(compiled.textContent).toContain('Direct SAF In-Place Editing');
    expect(compiled.textContent).toContain(
      'System Share & PROCESS_TEXT Integration',
    );
  });

  it('should render CommonMark & GFM Markdown Studio category and features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('CommonMark & GFM Markdown Studio');
    expect(compiled.textContent).toContain('GFM Tables, Alerts & Strikethrough');
    expect(compiled.textContent).toContain('Interactive Task Checklists');
    expect(compiled.textContent).toContain('Adaptive Split-Screen Workspace');
  });

  it('should render Search, Regex & Developer Utilities category and features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      'Search, Regex & Developer Utilities',
    );
    expect(compiled.textContent).toContain('Regex Capture-Group Replace');
    expect(compiled.textContent).toContain(
      'RFC 3986 URL Encoder & Query Splitter',
    );
    expect(compiled.textContent).toContain('Strict JSON Formatter & Minifier');
  });

  it('should render Large File Inspection & Localization category and features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      'Large File Inspection & Localization',
    );
    expect(compiled.textContent).toContain('Virtualized 25 MB Log Viewer');
    expect(compiled.textContent).toContain('Bounded OOM-Safe URI Streaming');
    expect(compiled.textContent).toContain(
      '5 Native Languages (EN, DE, ES, FR, SV)',
    );
  });

  it('should render LexPad Pro Toolkit category and features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('LexPad Pro Toolkit');
    expect(compiled.textContent).toContain(
      'Studio Color Palettes: Dracula & Nord Dark',
    );
    expect(compiled.textContent).toContain('Full Regex & Batch Replace Unlock');
    expect(compiled.textContent).toContain('Multi-Line URL & JSON Power Tools');
    expect(compiled.textContent).toContain(
      'Biometric App Lock & Adaptive Split-Screen',
    );
  });
});
