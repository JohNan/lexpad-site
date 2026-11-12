import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    data: {
      title: 'Home - LexPad: File & Code Editor',
      description:
        'Material 3 Android scratchpad, file viewer, and code/Markdown editor with 16+ syntax grammars, split-screen GFM preview, regex search & replace, and URL/JSON developer utilities.',
    },
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features').then((m) => m.Features),
    data: {
      title: 'Features - LexPad: File & Code Editor',
      description:
        'Explore the pure-Kotlin 16+ grammar syntax engine, instant scratchpad buffers, CommonMark/GFM split-screen studio, regex capture-group replace, URL/JSON tools, and 25 MB log viewer.',
    },
  },
  {
    path: 'security',
    loadComponent: () => import('./pages/security/security').then((m) => m.Security),
    data: {
      title: 'Security & Privacy Architecture - LexPad: File & Code Editor',
      description:
        'Learn how LexPad keeps 100% of scratchpads and SAF files strictly on-device with zero Nanzen cloud servers, hardware-backed BiometricPrompt lock, and bounded URI readers.',
    },
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
    data: {
      title: 'Privacy Policy - LexPad: File & Code Editor',
      description:
        'Read the LexPad privacy policy detailing 100% local document storage, Storage Access Framework permissions, BiometricPrompt protection, and Google Play Billing.',
    },
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms').then((m) => m.Terms),
    data: {
      title: 'Terms of Service - LexPad: File & Code Editor',
      description:
        'Read the Terms of Service for LexPad: File & Code Editor (com.johnan.lexpad).',
    },
  },
  { path: '**', redirectTo: '' },
];
