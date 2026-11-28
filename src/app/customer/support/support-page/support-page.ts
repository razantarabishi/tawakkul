import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactForm } from '../contact-form/contact-form';
import { FAQ_GROUPS, SUPPORT_PAGE, SUPPORT_PAGES } from '../support-pages';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-support-page',
  imports: [ContactForm, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './support-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportPage {
  protected readonly page = inject(SUPPORT_PAGE);
  protected readonly links = Object.values(SUPPORT_PAGES);
  protected readonly contactRoute = SUPPORT_PAGES.contact.route;
  protected readonly shippingRoute = SUPPORT_PAGES.shipping.route;
  protected readonly faqGroups = FAQ_GROUPS;
  protected readonly eyebrow =
    this.page.kind === 'policy'
      ? 'SUPPORT.LEGAL'
      : this.page.kind === 'size'
        ? null
        : this.page.eyebrow;

  private readonly languageService = inject(LanguageService);
  protected readonly sectionNumbers = computed(() =>
    Array.from(
      { length: this.page.kind === 'policy' ? this.page.sections.length : 0 },
      (_, index) =>
        this.languageService
          .formatInteger(index + 1)
          .padStart(2, this.languageService.formatInteger(0)),
    ),
  );
}
