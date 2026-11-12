import { Component, HostListener, Input, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme';

type ScreenshotCategory =
  | 'code'
  | 'scratchpad'
  | 'markdown'
  | 'devtools'
  | 'largefiles'
  | 'security';

interface ScreenshotItem {
  id: string;
  title: string;
  category: ScreenshotCategory;
  description: string;
  lightImage: string;
  darkImage: string;
  badge?: string;
}

@Component({
  selector: 'app-screenshot-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screenshot-showcase.html',
  styleUrl: './screenshot-showcase.scss',
})
export class ScreenshotShowcase implements OnInit {
  public themeService = inject(ThemeService);

  @Input() initialCategory = 'all';

  activeThemeMode: 'light' | 'dark' | 'auto' = 'auto';
  effectiveTheme: 'light' | 'dark' = 'dark';
  selectedCategory = 'all';
  activeModalItem: ScreenshotItem | null = null;

  constructor() {
    effect(() => {
      const isDark = this.themeService.isDarkMode();
      if (this.activeThemeMode === 'auto') {
        this.effectiveTheme = isDark ? 'dark' : 'light';
      }
    });
  }

  categories = [
    { id: 'all', label: 'All Views' },
    { id: 'code', label: 'Code & Grammars' },
    { id: 'scratchpad', label: 'Scratchpad & Tabs' },
    { id: 'markdown', label: 'GFM Markdown' },
    { id: 'devtools', label: 'Regex & Dev Tools' },
    { id: 'largefiles', label: '25 MB Log Viewer' },
    { id: 'security', label: 'Themes & Security' },
  ];

  screenshots: ScreenshotItem[] = [
    {
      id: 'code-editor',
      title: 'Multi-Tab Code Editor & Gutter',
      category: 'code',
      badge: '16+ Grammars',
      lightImage: 'screenshots/code_editor_light.png',
      darkImage: 'screenshots/code_editor_dark.png',
      description:
        'Edit Kotlin, Rust, TypeScript, Python, SQL, and YAML with viewport-culled line numbers, undo/redo stacks, and a docked Quick-Symbol bar.',
    },
    {
      id: 'instant-scratchpad',
      title: 'Zero-Ceremony Multi-Tab Scratchpad',
      category: 'scratchpad',
      badge: 'Instant Capture',
      lightImage: 'screenshots/instant_scratchpad_light.png',
      darkImage: 'screenshots/instant_scratchpad_dark.png',
      description:
        'Paste JSON payloads, cURL snippets, or OAuth redirect URLs directly into persistent local scratchpad tabs with automatic language detection.',
    },
    {
      id: 'markdown-preview',
      title: 'CommonMark & GFM Markdown Preview',
      category: 'markdown',
      badge: 'Markdown Studio',
      lightImage: 'screenshots/markdown_preview_light.png',
      darkImage: 'screenshots/markdown_preview_dark.png',
      description:
        'Render GitHub Flavored Markdown tables, fenced code blocks, and interactive task checklists—with side-by-side split view on tablets and foldables.',
    },
    {
      id: 'regex-search',
      title: 'Regex Search & Capture-Group Replace',
      category: 'devtools',
      badge: 'Regex Engine',
      lightImage: 'screenshots/regex_search_light.png',
      darkImage: 'screenshots/regex_search_dark.png',
      description:
        'Find and refactor across buffers using case-sensitive, whole-word, and regular-expression matching with $1 capture-group replacements.',
    },
    {
      id: 'url-json-tools',
      title: 'RFC 3986 URL & JSON Power Tools',
      category: 'devtools',
      badge: 'Developer Tools',
      lightImage: 'screenshots/url_json_tools_light.png',
      darkImage: 'screenshots/url_json_tools_dark.png',
      description:
        'Percent-encode or decode URI segments, split dense OAuth query strings onto readable lines, and pretty-print or minify JSON payloads offline.',
    },
    {
      id: 'large-file-viewer',
      title: 'Virtualized 25 MB Log & Dump Viewer',
      category: 'largefiles',
      badge: 'OOM-Safe Streaming',
      lightImage: 'screenshots/large_file_viewer_light.png',
      darkImage: 'screenshots/large_file_viewer_dark.png',
      description:
        'Inspect multi-megabyte Kubernetes ingress logs, stack traces, and CSV exports smoothly through a bounded URI reader and virtualized line viewport.',
    },
    {
      id: 'language-picker',
      title: 'Polyglot Grammar Switcher & Auto-Detect',
      category: 'code',
      badge: 'Syntax Lexer',
      lightImage: 'screenshots/language_picker_light.png',
      darkImage: 'screenshots/language_picker_dark.png',
      description:
        'Switch between 16+ dedicated syntax lexers—including C/Rust/Go, Kotlin/Java, Shell, INI/TOML, XML, Diff, and Log—or lock per-tab overrides.',
    },
    {
      id: 'settings-security',
      title: 'Studio Palettes, Biometric Lock & Pro',
      category: 'security',
      badge: 'Themes & Privacy',
      lightImage: 'screenshots/settings_security_light.png',
      darkImage: 'screenshots/settings_security_dark.png',
      description:
        'Customize Obsidian Dark, Dracula, Nord Dark, or Daylight themes, tune monospace font metrics, and guard sensitive notes with Android BiometricPrompt.',
    },
  ];

  ngOnInit() {
    this.selectedCategory = this.initialCategory;
    if (this.activeThemeMode === 'auto') {
      this.effectiveTheme = this.themeService.isDarkMode() ? 'dark' : 'light';
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent) {
    if (!this.activeModalItem) {
      return;
    }
    if (event.key === 'Escape') {
      this.closeModal();
    } else if (event.key === 'ArrowRight') {
      this.navigateModal(1);
    } else if (event.key === 'ArrowLeft') {
      this.navigateModal(-1);
    }
  }

  setThemeMode(mode: 'light' | 'dark' | 'auto') {
    this.activeThemeMode = mode;
    if (mode === 'auto') {
      this.effectiveTheme = this.themeService.isDarkMode() ? 'dark' : 'light';
    } else {
      this.effectiveTheme = mode;
    }
  }

  setCategory(catId: string) {
    this.selectedCategory = catId;
  }

  get filteredScreenshots(): ScreenshotItem[] {
    if (this.selectedCategory === 'all') {
      return this.screenshots;
    }
    return this.screenshots.filter((s) => s.category === this.selectedCategory);
  }

  getImagePath(item: ScreenshotItem): string {
    const theme =
      this.activeThemeMode === 'auto'
        ? this.themeService.isDarkMode()
          ? 'dark'
          : 'light'
        : this.effectiveTheme;
    return theme === 'dark' ? item.darkImage : item.lightImage;
  }

  openModal(item: ScreenshotItem) {
    this.activeModalItem = item;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.activeModalItem = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  navigateModal(direction: number) {
    if (!this.activeModalItem) return;
    const currentList = this.filteredScreenshots;
    const currentIndex = currentList.findIndex((s) => s.id === this.activeModalItem?.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + direction + currentList.length) % currentList.length;
      this.activeModalItem = currentList[nextIndex];
    }
  }
}
