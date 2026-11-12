import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';

@Component({
  selector: 'app-test-button-host',
  standalone: true,
  imports: [Button],
  template: `
    <app-button
      id="default-btn"
      variant="primary"
      (btnClick)="onClickDefault()"
    >
      <span>Click Me</span>
    </app-button>
    <app-button
      id="disabled-btn"
      variant="secondary"
      [disabled]="true"
      (btnClick)="onClickDisabled()"
    >
      <span>Disabled Button</span>
    </app-button>
    <app-button
      id="link-btn"
      variant="outlined"
      href="https://play.google.com/store/apps/details?id=com.johnan.lexpad"
      target="_blank"
      (btnClick)="onClickLink()"
    >
      <span>Download</span>
    </app-button>
    <app-button
      id="disabled-link-btn"
      variant="primary"
      href="https://example.com"
      [disabled]="true"
      (btnClick)="onClickDisabledLink()"
    >
      <span>Disabled Link</span>
    </app-button>
  `,
})
class TestButtonHostComponent {
  defaultClicked = false;
  disabledClicked = false;
  linkClicked = false;
  disabledLinkClicked = false;

  onClickDefault() {
    this.defaultClicked = true;
  }
  onClickDisabled() {
    this.disabledClicked = true;
  }
  onClickLink() {
    this.linkClicked = true;
  }
  onClickDisabledLink() {
    this.disabledLinkClicked = true;
  }
}

describe('Button', () => {
  let hostComponent: TestButtonHostComponent;
  let hostFixture: ComponentFixture<TestButtonHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button, TestButtonHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestButtonHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    await hostFixture.whenStable();
  });

  it('should create button elements with projected content', () => {
    const el = hostFixture.nativeElement as HTMLElement;
    const defaultBtn = el.querySelector('#default-btn button') as HTMLButtonElement;
    expect(defaultBtn).toBeTruthy();
    expect(defaultBtn.textContent).toContain('Click Me');
    expect(defaultBtn.classList.contains('btn')).toBe(true);
    expect(defaultBtn.classList.contains('primary')).toBe(true);
    expect(defaultBtn.disabled).toBe(false);
  });

  it('should render anchor variant when href is provided', () => {
    const el = hostFixture.nativeElement as HTMLElement;
    const linkEl = el.querySelector('#link-btn a') as HTMLAnchorElement;
    expect(linkEl).toBeTruthy();
    expect(linkEl.getAttribute('href')).toBe(
      'https://play.google.com/store/apps/details?id=com.johnan.lexpad',
    );
    expect(linkEl.getAttribute('target')).toBe('_blank');
    expect(linkEl.classList.contains('btn')).toBe(true);
    expect(linkEl.classList.contains('outlined')).toBe(true);
    expect(linkEl.textContent).toContain('Download');
  });

  it('should emit btnClick event on button click when not disabled', () => {
    const el = hostFixture.nativeElement as HTMLElement;
    const defaultBtn = el.querySelector('#default-btn button') as HTMLButtonElement;
    defaultBtn.click();
    expect(hostComponent.defaultClicked).toBe(true);
  });

  it('should respect disabled guard and not emit btnClick when disabled', () => {
    const el = hostFixture.nativeElement as HTMLElement;
    const disabledBtn = el.querySelector('#disabled-btn button') as HTMLButtonElement;
    expect(disabledBtn.disabled).toBe(true);
    disabledBtn.click();
    expect(hostComponent.disabledClicked).toBe(false);

    const disabledLink = el.querySelector('#disabled-link-btn a') as HTMLAnchorElement;
    expect(disabledLink.classList.contains('disabled')).toBe(true);
    disabledLink.click();
    expect(hostComponent.disabledLinkClicked).toBe(false);
  });
});
