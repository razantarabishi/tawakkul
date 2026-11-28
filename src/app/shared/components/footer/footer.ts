import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly brand = input.required<{
    name: string;
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

  protected readonly year = new Date().getFullYear();
}
