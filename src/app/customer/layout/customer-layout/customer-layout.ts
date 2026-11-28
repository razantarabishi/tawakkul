import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Footer, FooterLink, FooterSocialLink } from '../../../shared/components/footer/footer';
import {
  Navbar,
  NavbarAction,
  NavbarGroup,
  NavbarLink,
} from '../../../shared/components/navbar/navbar';
import { ShoppingBag } from '../../cart/shopping-bag/shopping-bag';
import { SUPPORT_PAGES } from '../../support/support-pages';

const NEW_ARRIVALS = { label: 'NAVBAR.NEW_ARRIVALS' };
const KIDS = { label: 'NAVBAR.KIDS' };
const OUR_STORY = { label: 'NAVBAR.OUR_STORY' };
const SIZE_GUIDE = SUPPORT_PAGES.size;
const WOMEN_LINKS: readonly NavbarLink[] = [
  { label: 'NAVBAR.SHOP_ALL' },
  { label: 'NAVBAR.SPORT_CHIC' },
  { label: 'NAVBAR.ABAYAS' },
  { label: 'NAVBAR.SCARVES_ACCESSORIES' },
  { label: 'NAVBAR.JACKETS_COATS' },
  { label: 'NAVBAR.MODEST_SWIMWEAR' },
];

@Component({
  selector: 'app-customer-layout',
  imports: [Footer, Navbar, RouterOutlet, ShoppingBag, TranslatePipe],
  templateUrl: './customer-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerLayout {
  private readonly shoppingBag = viewChild.required(ShoppingBag);

  protected readonly brand = {
    nameKey: 'COMMON.BRAND_NAME',
    wordmark: 'TAWAKKUL',
    arabic: 'توكّل',
    home: '/',
  };

  protected readonly navigation: readonly (NavbarLink | NavbarGroup)[] = [
    NEW_ARRIVALS,
    {
      label: 'NAVBAR.WOMEN',
      sections: [
        { label: 'NAVBAR.WOMEN', links: WOMEN_LINKS },
        {
          label: 'NAVBAR.DISCOVER',
          links: [
            NEW_ARRIVALS,
            { label: 'NAVBAR.TAWAKKUL_SET' },
            { label: 'NAVBAR.ALL_COLLECTIONS' },
            SIZE_GUIDE,
          ],
        },
      ],
    },
    KIDS,
    OUR_STORY,
  ];

  protected readonly actions: readonly NavbarAction[] = [
    { label: 'NAVBAR.SEARCH', icon: 'search' },
    { label: 'COMMON.SIGN_IN', icon: 'account', inMobileMenu: true },
    { label: 'COMMON.WISHLIST', icon: 'heart', inMobileMenu: true },
    {
      label: 'CUSTOMER.SHOPPING_BAG.EMPTY_LABEL',
      icon: 'bag',
      opensDialog: true,
      onSelect: (trigger) => this.shoppingBag().open(trigger),
    },
  ];

  protected readonly website = { label: 'tawakkulmodest.com', url: 'https://tawakkulmodest.com/' };
  protected readonly shopLinks: readonly FooterLink[] = [NEW_ARRIVALS, ...WOMEN_LINKS, KIDS];
  protected readonly mobileSupportLinks: readonly NavbarLink[] = [
    SUPPORT_PAGES.contact,
    SUPPORT_PAGES.faq,
    SIZE_GUIDE,
    SUPPORT_PAGES.shipping,
  ];
  protected readonly careLinks: readonly FooterLink[] = [
    ...this.mobileSupportLinks,
    { label: 'FOOTER.TRACK_ORDER' },
    { label: 'FOOTER.MY_ACCOUNT' },
  ];
  protected readonly aboutLinks: readonly FooterLink[] = [
    OUR_STORY,
    { label: 'FOOTER.CONNECTION' },
  ];
  protected readonly legalLinks: readonly FooterLink[] = [
    SUPPORT_PAGES.privacy,
    SUPPORT_PAGES.terms,
    SUPPORT_PAGES.shipping,
  ];
  protected readonly socialLinks: readonly FooterSocialLink[] = [
    { label: 'FOOTER.INSTAGRAM', icon: 'instagram' },
    { label: 'FOOTER.TELEGRAM', icon: 'telegram' },
    { label: 'FOOTER.YOUTUBE', icon: 'youtube' },
  ];
}
