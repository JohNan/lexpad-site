import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorStudioPreview } from './editor-studio-preview';

describe('EditorStudioPreview', () => {
  let component: EditorStudioPreview;
  let fixture: ComponentFixture<EditorStudioPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorStudioPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorStudioPreview);
    component = fixture.componentInstance;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify all 4 studio palettes and update current theme', () => {
    expect(component.themes.length).toBe(4);
    const themeIds = component.themes.map((t) => t.id);
    expect(themeIds).toEqual(['obsidian', 'dracula', 'nord', 'daylight']);

    // Default theme is obsidian
    expect(component.activeThemeId).toBe('obsidian');
    expect(component.currentTheme.name).toBe('Obsidian Slate');
    expect(component.currentTheme.bg).toBe('#0B0E14');

    // Switch to dracula
    component.setTheme('dracula');
    expect(component.activeThemeId).toBe('dracula');
    expect(component.currentTheme.name).toBe('Dracula Pro');
    expect(component.currentTheme.bg).toBe('#21222C');

    // Switch to nord
    component.setTheme('nord');
    expect(component.activeThemeId).toBe('nord');
    expect(component.currentTheme.name).toBe('Nord Dark');
    expect(component.currentTheme.bg).toBe('#242933');

    // Switch to daylight
    component.setTheme('daylight');
    expect(component.activeThemeId).toBe('daylight');
    expect(component.currentTheme.name).toBe('Daylight Studio');
    expect(component.currentTheme.bg).toBe('#F6F8FC');
  });

  it('should switch across all 3 workspace tabs via DOM clicks and methods', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Initially in code tab
    expect(component.activeTab).toBe('code');
    expect(compiled.querySelector('.code-mode-content')).toBeTruthy();
    expect(compiled.querySelector('.markdown-split-content')).toBeNull();
    expect(compiled.querySelector('.devtools-content')).toBeNull();

    // Switch to markdown via DOM click
    const markdownBtn = compiled.querySelector(
      '#tab-markdown',
    ) as HTMLButtonElement;
    markdownBtn.click();
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.activeTab).toBe('markdown');
    expect(compiled.querySelector('.markdown-split-content')).toBeTruthy();
    expect(compiled.querySelector('.code-mode-content')).toBeNull();

    // Switch to devtools via DOM click
    const devtoolsBtn = compiled.querySelector(
      '#tab-devtools',
    ) as HTMLButtonElement;
    devtoolsBtn.click();
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.activeTab).toBe('devtools');
    expect(compiled.querySelector('.devtools-content')).toBeTruthy();

    // Switch back to code via method
    component.setTab('code');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.activeTab).toBe('code');
    expect(compiled.querySelector('.code-mode-content')).toBeTruthy();
  });

  it('should step regex matches with wraparound and toggle $1 replace ("suspend fun")', () => {
    component.setTab('code');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    expect(component.activeMatchIndex).toBe(0);
    expect(component.matchCount).toBe(3);

    // Step forward: 0 -> 1 -> 2 -> 0
    component.stepRegexMatch(1);
    expect(component.activeMatchIndex).toBe(1);
    component.stepRegexMatch(1);
    expect(component.activeMatchIndex).toBe(2);
    component.stepRegexMatch(1);
    expect(component.activeMatchIndex).toBe(0);

    // Step backward: 0 -> 2
    component.stepRegexMatch(-1);
    expect(component.activeMatchIndex).toBe(2);

    // Toggle regex replace
    expect(component.regexReplaced).toBe(false);
    component.toggleRegexReplace();
    expect(component.regexReplaced).toBe(true);

    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('suspend fun');
    expect(compiled.textContent).toContain('Undo Replace');

    // Toggle back
    component.toggleRegexReplace();
    expect(component.regexReplaced).toBe(false);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Replace All ($1)');
  });

  it('should toggle GFM Markdown task checkboxes', () => {
    component.setTab('markdown');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    expect(component.markdownTasks[0].done).toBe(true);
    expect(component.markdownTasks[2].done).toBe(false);

    // Toggle task-3 to done
    component.toggleMarkdownTask('task-3');
    expect(component.markdownTasks[2].done).toBe(true);

    // Toggle task-1 to undone
    component.toggleMarkdownTask('task-1');
    expect(component.markdownTasks[0].done).toBe(false);

    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const checkboxes = compiled.querySelectorAll<HTMLInputElement>(
      '.md-task-row input[type="checkbox"]',
    );
    expect(checkboxes.length).toBe(3);
    expect(checkboxes[0].checked).toBe(false);
    expect(checkboxes[2].checked).toBe(true);
  });

  it('should toggle RFC 3986 URL split/join and JSON pretty/minify modes', () => {
    component.setTab('devtools');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    // URL split mode
    expect(component.urlSplitMode).toBe(true);
    component.toggleUrlSplit();
    expect(component.urlSplitMode).toBe(false);

    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(component.rawUrl);

    component.toggleUrlSplit();
    expect(component.urlSplitMode).toBe(true);

    // JSON pretty mode
    expect(component.jsonPrettyMode).toBe(true);
    component.toggleJsonPretty();
    expect(component.jsonPrettyMode).toBe(false);

    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(component.minifiedJson);

    component.toggleJsonPretty();
    expect(component.jsonPrettyMode).toBe(true);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(component.prettyJson);
  });

  it('should insert quick symbols and clean up timers reliably', () => {
    expect(component.quickSymbols.length).toBeGreaterThan(0);
    expect(component.quickSymbols).toContain('->');
    expect(component.quickSymbols).toContain('{');

    component.insertSymbol('->');
    expect(component.lastInsertedSymbol).toBe('->');

    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const feedback = fixture.nativeElement.querySelector('.symbol-feedback');
    expect(feedback?.textContent).toContain('Inserted ->');

    // Inserting another symbol replaces it
    component.insertSymbol('{');
    expect(component.lastInsertedSymbol).toBe('{');

    // Destroy cleans up timeout without throwing
    component.ngOnDestroy();
  });
});
