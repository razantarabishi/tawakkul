import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AutoFocus } from 'primeng/autofocus';
import { Drawer } from 'primeng/drawer';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-shopping-bag',
  imports: [AutoFocus, Drawer, RouterLink, TranslatePipe],
  templateUrl: './shopping-bag.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingBag {
  readonly collectionRoute = input<string>();

  private readonly languageService = inject(LanguageService);
  protected readonly direction = this.languageService.direction;
  protected readonly emptyCount = computed(() => this.languageService.formatInteger(0));
  protected readonly visible = signal(false);
  protected readonly drawerAttributes = {
    root: {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'shopping-bag-title',
    },
  };

  private trigger: HTMLButtonElement | null = null;

  open(trigger: HTMLButtonElement): void {
    this.trigger = trigger;
    this.visible.set(true);
  }

  protected setVisible(visible: boolean): void {
    this.visible.set(visible);
    if (!visible) {
      this.trigger?.focus({ preventScroll: true });
      this.trigger = null;
    }
  }
}
