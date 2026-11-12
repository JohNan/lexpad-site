import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenshotShowcase } from './screenshot-showcase';
import { ThemeService } from '../../services/theme';

describe('ScreenshotShowcase', () => {
  let component: ScreenshotShowcase;
  let fixture: ComponentFixture<ScreenshotShowcase>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenshotShowcase],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenshotShowcase);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    component.closeModal();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all 7 categories and 8 screenshots initially', () => {
    expect(component.categories.length).toBe(7);
    expect(component.screenshots.length).toBe(8);
    expect(component.filteredScreenshots.length).toBe(8);
  });

  it('should filter screenshots correctly across all categories', () => {
    // code category (2 items)
    component.setCategory('code');
    expect(component.filteredScreenshots.length).toBe(2);
    expect(component.filteredScreenshots.map((s) => s.id)).toEqual([
      'code-editor',
      'language-picker',
    ]);

    // scratchpad category (1 item)
    component.setCategory('scratchpad');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('instant-scratchpad');

    // markdown category (1 item)
    component.setCategory('markdown');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('markdown-preview');

    // devtools category (2 items)
    component.setCategory('devtools');
    expect(component.filteredScreenshots.length).toBe(2);
    expect(component.filteredScreenshots.map((s) => s.id)).toEqual([
      'regex-search',
      'url-json-tools',
    ]);

    // largefiles category (1 item)
    component.setCategory('largefiles');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('large-file-viewer');

    // security category (1 item)
    component.setCategory('security');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('settings-security');

    // all category (8 items)
    component.setCategory('all');
    expect(component.filteredScreenshots.length).toBe(8);
  });

  it('should resolve image paths for light, dark, and auto modes', () => {
    const item = component.screenshots[0]; // code-editor

    // Light mode
    component.setThemeMode('light');
    expect(component.effectiveTheme).toBe('light');
    expect(component.getImagePath(item)).toBe(item.lightImage);

    // Dark mode
    component.setThemeMode('dark');
    expect(component.effectiveTheme).toBe('dark');
    expect(component.getImagePath(item)).toBe(item.darkImage);

    // Auto mode with ThemeService dark
    themeService.isDarkMode.set(true);
    component.setThemeMode('auto');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(component.getImagePath(item)).toBe(item.darkImage);

    // Auto mode with ThemeService light
    themeService.isDarkMode.set(false);
    component.setThemeMode('auto');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(component.getImagePath(item)).toBe(item.lightImage);
  });

  it('should open and close modal and update document body overflow style', () => {
    expect(component.activeModalItem).toBeNull();
    const item = component.screenshots[0];

    component.openModal(item);
    expect(component.activeModalItem).toBe(item);
    expect(document.body.style.overflow).toBe('hidden');

    component.closeModal();
    expect(component.activeModalItem).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  it('should navigate next and prev with wraparound in modal', () => {
    component.setCategory('all');
    const first = component.screenshots[0];
    const last = component.screenshots[component.screenshots.length - 1];

    component.openModal(first);
    expect(component.activeModalItem?.id).toBe(first.id);

    // Next
    component.navigateModal(1);
    expect(component.activeModalItem?.id).toBe(component.screenshots[1].id);

    // Prev back to first
    component.navigateModal(-1);
    expect(component.activeModalItem?.id).toBe(first.id);

    // Prev from first should wrap around to last
    component.navigateModal(-1);
    expect(component.activeModalItem?.id).toBe(last.id);

    // Next from last should wrap around to first
    component.navigateModal(1);
    expect(component.activeModalItem?.id).toBe(first.id);
  });

  it('should handle keyboard Escape, ArrowRight, and ArrowLeft when modal is open', () => {
    component.setCategory('all');
    component.openModal(component.screenshots[0]);

    // ArrowRight should advance
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(component.activeModalItem?.id).toBe(component.screenshots[1].id);

    // ArrowLeft should go back
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(component.activeModalItem?.id).toBe(component.screenshots[0].id);

    // Escape should close modal
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.activeModalItem).toBeNull();
  });

  it('should ignore keyboard events when modal is closed', () => {
    component.closeModal();
    expect(component.activeModalItem).toBeNull();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(component.activeModalItem).toBeNull();
  });
});
