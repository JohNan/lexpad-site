# LexPad — Marketing Website

Official marketing and product website for **LexPad: File & Code Editor** (`https://lexpad.nanzen.se/`), built with Angular 21, TypeScript, SCSS, and Vitest.

## Overview

The website showcases the technical architecture, security model, and feature set of LexPad (`com.johnan.lexpad`), the production-grade Material 3 Android scratchpad, file viewer, and code/Markdown editor:

- **Modular Clean Architecture & Pure-Kotlin Engine (`:editor-core`):** Standalone JVM library (`io.github.johnan:editor-core`) with zero Android dependencies, featuring a deterministic 16+ grammar syntax lexer (`SyntaxLexer`), paste content heuristics (`LanguageDetector`), and `BitSet` non-overlapping span safety.
- **Reusable Jetpack Compose Editor Library (`:editor-ui`):** Standalone UI component library (`io.github.johnan:editor-ui`) providing `CodeEditorSurface`, hardware-accelerated viewport-culled line gutters, undo/redo state management, and docked quick-symbol toolbars.
- **Zero-Ceremony Scratchpads & Native File System (SAF):** Multi-tab scratchpad workspace persisting to sandboxed internal storage (`filesDir/buffers/`), plus direct in-place file editing via Android Storage Access Framework (`OpenDocument`, `CreateDocument`) and `ACTION_PROCESS_TEXT` system integration.
- **CommonMark & GFM Markdown Studio:** AST-based Markdown preview (`MarkdownDocumentParser` via `GFMFlavourDescriptor`) supporting tables, strikethrough, alert callouts, interactive task checklists with bidirectional buffer sync, and adaptive split-screen workspace (`AdaptiveMarkdownWorkspace`).
- **Search, Regex & Developer Utilities:** High-performance `TextSearchEngine` with capture-group regex substitution (`$1`, `$2`), RFC 3986 percent-encoding and query parameter splitting/joining (`UrlTextTools`), and strict JSON formatting/minification (`JsonTextTools`).
- **Virtualized Large File Viewer:** High-density virtualized log viewer (`LargeFileViewerSurface`) powered by `BoundedUriReader` to safely inspect 1 MB to 25 MB crash logs and database dumps without memory pressure.
- **On-Device Confidentiality & Biometrics:** 100% local document storage, zero Nanzen cloud servers or telemetry relays, and hardware-backed `BiometricPrompt` app lock.
- **Multi-Language Localization:** Complete UI localization across 5 locales: English (`en-US`), German (`de-DE`), Spanish (`es-ES`), French (`fr-FR`), and Swedish (`sv-SE`).
- **LexPad Pro Tier:** Curated studio color palettes (Dracula, Nord Dark, Solarized), full regex capture replacements, deep URL/JSON utilities, and adaptive split-screen layout.
- **Cross-Site Ecosystem:** Integrated discovery for Nanzen's companion utilities, including [SQL Pulse](https://sql-pulse.nanzen.se/) and [Android SSH Client](https://ssh-client.nanzen.se/).

## Tech Stack

- **Framework:** Angular 21 (Standalone Components, Signals, New Control Flow `@if`/`@for`)
- **Styling:** SCSS, CSS Custom Properties, Material Icons, Material 3 Design System (Electric Indigo & Obsidian Slate)
- **Testing:** Vitest & `@angular/build:unit-test`
- **Toolchain:** Node.js 20+ & npm

## Development Workflow

### Install Dependencies

```bash
npm install
```

### Start Local Development Server

```bash
npm run start
```

Navigate to `http://localhost:4200/`.

### Run Unit Tests

```bash
npm run test -- --watch=false
```

### Run Linter

```bash
npm run lint
```

### Build for Production

```bash
npm run build
```

The optimized production artifacts will be compiled into `dist/lexpad-marketing-site/browser/`, and the `postbuild` script will generate static route fallbacks and copy `.htaccess`.
