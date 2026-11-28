import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

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
  onSelect?: () => void;
}

@Component({
  selector: 'app-navbar',
  imports: [NgTemplateOutlet, RouterLink],
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
    name: string;
    wordmark: string;
    arabic: string;
    home: string;
  }>();
  readonly links = input.required<readonly (NavbarLink | NavbarGroup)[]>();
  readonly actions = input.required<readonly NavbarAction[]>();
  readonly navigationId = input('primary-navigation');

  protected readonly mobileOpen = signal(false);
  protected readonly openGroup = signal<string | null>(null);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private groupButton: HTMLButtonElement | null = null;

  protected toggleMobile(): void {
    this.openGroup.set(null);
    this.mobileOpen.update((open) => !open);
  }

  protected toggleGroup(label: string, button: HTMLButtonElement): void {
    this.groupButton = button;
    this.openGroup.update((open) => (open === label ? null : label));
  }

  protected close(): void {
    this.mobileOpen.set(false);
    this.openGroup.set(null);
    this.groupButton = null;
  }

  protected dismissOutside(event: PointerEvent): void {
    if (!event.composedPath().includes(this.host.nativeElement)) {
      this.close();
    }
  }

  protected dismissWhenFocusLeaves(event: FocusEvent): void {
    if (
      event.relatedTarget instanceof Node &&
      !this.host.nativeElement.contains(event.relatedTarget)
    ) {
      this.close();
    }
  }

  protected dismissWithEscape(event: Event): void {
    if (this.openGroup()) {
      event.preventDefault();
      this.openGroup.set(null);
      this.groupButton?.focus();
    } else if (this.mobileOpen()) {
      event.preventDefault();
      this.close();
      this.menuButton().nativeElement.focus();
    }
  }
}
