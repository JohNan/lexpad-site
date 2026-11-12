import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router, provideRouter } from '@angular/router';
import { SeoService } from './seo';

@Component({ selector: 'app-dummy-home', standalone: true, template: '' })
class DummyHomeComponent {}

@Component({ selector: 'app-dummy-privacy', standalone: true, template: '' })
class DummyPrivacyComponent {}

describe('SeoService', () => {
  let service: SeoService;
  let router: Router;
  let titleService: Title;
  let metaService: Meta;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: '',
            component: DummyHomeComponent,
            data: {
              title: 'Home - LexPad: File & Code Editor',
              description: 'Material 3 Android scratchpad, file viewer, and code/Markdown editor...',
            },
          },
          {
            path: 'privacy-policy',
            component: DummyPrivacyComponent,
            data: {
              title: 'Privacy Policy - LexPad: File & Code Editor',
              description: 'Read the LexPad privacy policy detailing 100% local document storage...',
            },
          },
        ]),
        Title,
        Meta,
      ],
    });
    service = TestBed.inject(SeoService);
    router = TestBed.inject(Router);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    doc = TestBed.inject(DOCUMENT);
    service.init();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update title, meta description, og tags, and canonical link on navigation to "/"', async () => {
    await router.navigateByUrl('/');

    expect(titleService.getTitle()).toBe('Home - LexPad: File & Code Editor');
    expect(metaService.getTag('name="description"')?.getAttribute('content')).toBe(
      'Material 3 Android scratchpad, file viewer, and code/Markdown editor...',
    );
    expect(metaService.getTag('property="og:title"')?.getAttribute('content')).toBe(
      'Home - LexPad: File & Code Editor',
    );
    expect(metaService.getTag('property="og:description"')?.getAttribute('content')).toBe(
      'Material 3 Android scratchpad, file viewer, and code/Markdown editor...',
    );
    expect(metaService.getTag('property="og:url"')?.getAttribute('content')).toBe(
      'https://lexpad.nanzen.se/',
    );

    const canonical = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical?.getAttribute('href')).toBe('https://lexpad.nanzen.se/');
  });

  it('should update title, meta description, og tags, and canonical link on navigation to "/privacy-policy"', async () => {
    await router.navigateByUrl('/privacy-policy');

    expect(titleService.getTitle()).toBe('Privacy Policy - LexPad: File & Code Editor');
    expect(metaService.getTag('name="description"')?.getAttribute('content')).toBe(
      'Read the LexPad privacy policy detailing 100% local document storage...',
    );
    expect(metaService.getTag('property="og:title"')?.getAttribute('content')).toBe(
      'Privacy Policy - LexPad: File & Code Editor',
    );
    expect(metaService.getTag('property="og:description"')?.getAttribute('content')).toBe(
      'Read the LexPad privacy policy detailing 100% local document storage...',
    );
    expect(metaService.getTag('property="og:url"')?.getAttribute('content')).toBe(
      'https://lexpad.nanzen.se/privacy-policy',
    );

    const canonical = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical?.getAttribute('href')).toBe('https://lexpad.nanzen.se/privacy-policy');
  });

  it('should fall back to default title and description when route data is empty', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'empty', component: DummyHomeComponent }]),
        Title,
        Meta,
      ],
    });
    const s = TestBed.inject(SeoService);
    const r = TestBed.inject(Router);
    const t = TestBed.inject(Title);
    const m = TestBed.inject(Meta);
    s.init();
    await r.navigateByUrl('/empty');

    expect(t.getTitle()).toBe('LexPad — Android File, Code & Markdown Editor');
    expect(m.getTag('name="description"')?.getAttribute('content')).toContain(
      'Material 3 Android scratchpad',
    );
  });
});
