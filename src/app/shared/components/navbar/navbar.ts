import { NgTemplateOutlet } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AutoFocus } from 'primeng/autofocus';
import { Drawer } from 'primeng/drawer';
import { AppLanguage, LanguageService } from '../../services/language.service';

export interface NavbarLink {
  label: string;
  route?: string;
}

export interface NavbarGroup {
  label: string;
  sections: readonly { label: string; links: readonly NavbarLink[] }[];
}

export interface NavbarAction extends NavbarLink {
  icon: 'search' | 'account' | 'heart' | 'bag';
  inMobileMenu?: boolean;
  opensDialog?: boolean;
  onSelect?: (trigger: HTMLButtonElement) => void;
}

@Component({
  selector: 'app-navbar',
  imports: [AutoFocus, Drawer, NgTemplateOutlet, RouterLink, TranslatePipe],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:pointerdown)': 'dismissOutside($event)',
    '(focusout)': 'dismissWhenFocusLeaves($event)',
    '(keydown.escape)': 'dismissWithEscape($event)',
  },
})
export class Navbar {
  readonly brand = input.required<{
    nameKey: string;
    wordmark: string;
    arabic: string;
    home: string;
  }>();
  readonly links = input.required<readonly (NavbarLink | NavbarGroup)[]>();
  readonly actions = input.required<readonly NavbarAction[]>();
  readonly navigationId = input('primary-navigation');
  readonly mobileSupportLinks = input<readonly NavbarLink[]>([]);

  protected readonly languageService = inject(LanguageService);
  protected readonly languages = [
    { code: 'en', label: 'ENG', nameKey: 'COMMON.LANGUAGE_ENGLISH' },
    { code: 'ar', label: 'AR', nameKey: 'COMMON.LANGUAGE_ARABIC' },
  ] satisfies readonly { code: AppLanguage; label: string; nameKey: string }[];
  protected readonly mobileOpen = signal(false);
  protected readonly mobileGroup = signal<string | null>(null);
  protected readonly openGroup = signal<string | null>(null);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private groupButton: HTMLButtonElement | null = null;
  private openedByHover = false;
  private hoverCloseTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.cancelHoverClose());
    inject(BreakpointObserver)
      .observe('(min-width: 72rem)')
      .pipe(takeUntilDestroyed())
      .subscribe(({ matches }) => {
        if (matches) {
          this.setMobileOpen(false);
        } else {
          this.closeDesktopGroup();
        }
      });
  }

  protected setMobileOpen(open: boolean): void {
    const wasOpen = this.mobileOpen();
    this.mobileOpen.set(open);
    if (!open && wasOpen) {
      this.mobileGroup.set(null);
      this.menuButton().nativeElement.focus({ preventScroll: true });
    }
  }

  protected changeLanguage(language: AppLanguage): void {
    void this.languageService.setLanguage(language);
  }

  protected toggleMobileGroup(label: string): void {
    this.mobileGroup.update((current) => (current === label ? null : label));
  }

  protected toggleGroup(label: string, button: HTMLButtonElement): void {
    this.cancelHoverClose();
    this.openedByHover = false;
    this.groupButton = button;
    this.openGroup.update((open) => (open === label ? null : label));
  }

  protected enterGroup(event: PointerEvent, label: string, button: HTMLButtonElement): void {
    if (event.pointerType !== 'mouse') {
      return;
    }

    this.cancelHoverClose();
    if (this.openGroup() !== label) {
      this.groupButton = button;
      this.openedByHover = true;
      this.openGroup.set(label);
    }
  }

  protected leaveGroup(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && this.openedByHover) {
      this.cancelHoverClose();
      // Keep the panel reachable when the pointer moves down and across from the trigger.
      this.hoverCloseTimer = setTimeout(() => this.closeDesktopGroup(), 180);
    }
  }

  protected close(): void {
    this.setMobileOpen(false);
    this.closeDesktopGroup();
  }

  private closeDesktopGroup(): void {
    this.cancelHoverClose();
    this.openGroup.set(null);
    this.groupButton = null;
    this.openedByHover = false;
  }

  private cancelHoverClose(): void {
    clearTimeout(this.hoverCloseTimer);
    this.hoverCloseTimer = undefined;
  }

  protected dismissOutside(event: PointerEvent): void {
    if (!event.composedPath().includes(this.host.nativeElement)) {
      this.closeDesktopGroup();
    }
  }

  protected dismissWhenFocusLeaves(event: FocusEvent): void {
    if (
      event.relatedTarget instanceof Node &&
      !this.host.nativeElement.contains(event.relatedTarget)
    ) {
      this.closeDesktopGroup();
    }
  }

  protected dismissWithEscape(event: Event): void {
    if (this.openGroup()) {
      event.preventDefault();
      this.groupButton?.focus();
      this.closeDesktopGroup();
    }
  }
}
