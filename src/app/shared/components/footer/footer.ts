import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

export interface FooterLink {
  label: string;
  route?: string;
}

export interface FooterSocialLink {
  label: string;
  icon: 'instagram' | 'telegram' | 'youtube';
  url?: string;
}

@Component({
  selector: 'app-footer',
  imports: [NgTemplateOutlet, RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly brand = input.required<{
    nameKey: string;
    wordmark: string;
    arabic: string;
    home: string;
  }>();
  readonly tagline = input.required<string>();
  readonly supportingLine = input.required<string>();
  readonly website = input.required<{ label: string; url: string }>();
  readonly shopLinks = input.required<readonly FooterLink[]>();
  readonly careLinks = input.required<readonly FooterLink[]>();
  readonly aboutLinks = input.required<readonly FooterLink[]>();
  readonly legalLinks = input.required<readonly FooterLink[]>();
  readonly socialLinks = input<readonly FooterSocialLink[]>([]);

  private readonly languageService = inject(LanguageService);
  protected readonly year = computed(() =>
    this.languageService.formatInteger(new Date().getFullYear()),
  );
}
