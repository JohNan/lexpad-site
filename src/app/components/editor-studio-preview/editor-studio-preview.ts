import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

type StudioPaletteId = 'obsidian' | 'dracula' | 'nord' | 'daylight';
type StudioWorkspaceMode = 'code' | 'markdown' | 'devtools';

interface StudioTheme {
  id: StudioPaletteId;
  name: string;
  bg: string;
  surface: string;
  header: string;
  text: string;
  muted: string;
  accent: string;
  amber: string;
  emerald: string;
  border: string;
}

interface MarkdownTaskItem {
  id: string;
  label: string;
  done: boolean;
}

@Component({
  selector: 'app-editor-studio-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor-studio-preview.html',
  styleUrl: './editor-studio-preview.scss',
})
export class EditorStudioPreview implements OnDestroy {
  private symbolTimeoutId?: ReturnType<typeof setTimeout>;

  themes: StudioTheme[] = [
    {
      id: 'obsidian',
      name: 'Obsidian Slate',
      bg: '#0B0E14',
      surface: '#131722',
      header: '#1C2230',
      text: '#E5E9F0',
      muted: '#94A3B8',
      accent: '#818CF8',
      amber: '#F59E0B',
      emerald: '#34D399',
      border: '#2A3241',
    },
    {
      id: 'dracula',
      name: 'Dracula Pro',
      bg: '#21222C',
      surface: '#282A36',
      header: '#343746',
      text: '#F8F8F2',
      muted: '#BFBFBF',
      accent: '#BD93F9',
      amber: '#FFB86C',
      emerald: '#50FA7B',
      border: '#44475A',
    },
    {
      id: 'nord',
      name: 'Nord Dark',
      bg: '#242933',
      surface: '#2E3440',
      header: '#3B4252',
      text: '#ECEFF4',
      muted: '#D8DEE9',
      accent: '#88C0D0',
      amber: '#EBCB8B',
      emerald: '#A3BE8C',
      border: '#4C566A',
    },
    {
      id: 'daylight',
      name: 'Daylight Studio',
      bg: '#F6F8FC',
      surface: '#FFFFFF',
      header: '#EEF2F8',
      text: '#0F172A',
      muted: '#475569',
      accent: '#4F46E5',
      amber: '#D97706',
      emerald: '#059669',
      border: '#CBD5E1',
    },
  ];

  activeThemeId: StudioPaletteId = 'obsidian';
  activeTab: StudioWorkspaceMode = 'code';

  activeMatchIndex = 0;
  readonly matchCount = 3;
  regexReplaced = false;

  markdownTasks: MarkdownTaskItem[] = [
    { id: 'task-1', label: 'BitSet non-overlapping span engine (16+ grammars)', done: true },
    { id: 'task-2', label: 'Adaptive tablet & foldable split-screen GFM preview', done: true },
    { id: 'task-3', label: 'Bounded 25 MB OOM-safe read-only log streaming', done: false },
  ];

  urlSplitMode = true;
  jsonPrettyMode = true;

  quickSymbols: string[] = ['{', '}', '[', ']', '(', ')', '/', '?', '&', '=', ':', '`', '->', 'Tab'];
  lastInsertedSymbol = '';

  readonly rawUrl =
    'https://auth.nanzen.se/oauth2/authorize?client_id=lexpad-android&redirect_uri=https%3A%2F%2Flexpad.nanzen.se%2Fcallback&scope=openid%20profile&code_challenge_method=S256';

  readonly splitUrlLines = [
    'https://auth.nanzen.se/oauth2/authorize',
    '  ?client_id=lexpad-android',
    '  &redirect_uri=https://lexpad.nanzen.se/callback',
    '  &scope=openid profile',
    '  &code_challenge_method=S256',
  ];

  readonly prettyJson = `{
  "app": "com.johnan.lexpad",
  "engine": "editor-core",
  "localOnly": true,
  "grammars": 16,
  "maxViewerMb": 25
}`;

  readonly minifiedJson =
    '{"app":"com.johnan.lexpad","engine":"editor-core","localOnly":true,"grammars":16,"maxViewerMb":25}';

  ngOnDestroy() {
    if (this.symbolTimeoutId) {
      clearTimeout(this.symbolTimeoutId);
    }
  }

  get currentTheme(): StudioTheme {
    return this.themes.find((t) => t.id === this.activeThemeId) || this.themes[0];
  }

  setTheme(themeId: StudioPaletteId) {
    this.activeThemeId = themeId;
  }

  setTab(tab: StudioWorkspaceMode) {
    this.activeTab = tab;
  }

  stepRegexMatch(delta: number) {
    this.activeMatchIndex = (this.activeMatchIndex + delta + this.matchCount) % this.matchCount;
  }

  toggleRegexReplace() {
    this.regexReplaced = !this.regexReplaced;
  }

  toggleMarkdownTask(taskId: string) {
    this.markdownTasks = this.markdownTasks.map((t) =>
      t.id === taskId ? { ...t, done: !t.done } : t,
    );
  }

  toggleUrlSplit() {
    this.urlSplitMode = !this.urlSplitMode;
  }

  toggleJsonPretty() {
    this.jsonPrettyMode = !this.jsonPrettyMode;
  }

  insertSymbol(symbol: string) {
    if (this.symbolTimeoutId) {
      clearTimeout(this.symbolTimeoutId);
    }
    this.lastInsertedSymbol = symbol;
    this.symbolTimeoutId = setTimeout(() => {
      if (this.lastInsertedSymbol === symbol) {
        this.lastInsertedSymbol = '';
      }
      this.symbolTimeoutId = undefined;
    }, 1200);
  }
}
