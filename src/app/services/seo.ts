import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private doc = inject(DOCUMENT);

  init() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        const title = data['title'] || 'LexPad — Android File, Code & Markdown Editor';
        const description =
          data['description'] ||
          'Material 3 Android scratchpad, file viewer, and code/Markdown editor with 16+ syntax grammars, split-screen GFM preview, regex search & replace, and URL/JSON developer utilities.';

        this.titleService.setTitle(title);
        this.metaService.updateTag({ name: 'description', content: description });
        this.metaService.updateTag({ property: 'og:title', content: title });
        this.metaService.updateTag({ property: 'og:description', content: description });

        const cleanPath = this.router.url.split('?')[0].split('#')[0];
        const canonicalUrl =
          cleanPath === '/'
            ? 'https://lexpad.nanzen.se/'
            : `https://lexpad.nanzen.se${cleanPath}`;
        this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
        this.updateCanonicalLink(canonicalUrl);
      });
  }

  private updateCanonicalLink(url: string): void {
    let linkEl = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkEl) {
      linkEl = this.doc.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', url);
  }
}
