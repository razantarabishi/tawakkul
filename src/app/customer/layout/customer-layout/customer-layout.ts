import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, FooterLink, FooterSocialLink } from '../../../shared/components/footer/footer';
import {
  Navbar,
  NavbarAction,
  NavbarGroup,
  NavbarLink,
} from '../../../shared/components/navbar/navbar';

const NEW_ARRIVALS = { label: 'New Arrivals' };
const KIDS = { label: 'Tawakkul Kids' };
const OUR_STORY = { label: 'Our Story' };
const SIZE_GUIDE = { label: 'Size Guide' };
const SHIPPING_AND_RETURNS = { label: 'Shipping & Returns' };
const WOMEN_LINKS: readonly NavbarLink[] = [
  { label: 'Shop All' },
  { label: 'Sport Chic' },
  { label: 'Abayas' },
  { label: 'Scarves & Accessories' },
  { label: 'Jackets & Coats' },
  { label: 'Modest Swimwear' },
];

@Component({
  selector: 'app-customer-layout',
  imports: [Footer, Navbar, RouterOutlet],
  templateUrl: './customer-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerLayout {
  protected readonly brand = {
    name: 'Tawakkul Modest',
    wordmark: 'TAWAKKUL',
    arabic: 'توكّل',
    home: '/',
  };

  protected readonly navigation: readonly (NavbarLink | NavbarGroup)[] = [
    NEW_ARRIVALS,
    {
      label: 'Women',
      sections: [
        { label: 'Women', links: WOMEN_LINKS },
        {
          label: 'Discover',
          links: [
            NEW_ARRIVALS,
            { label: 'The Tawakkul Set' },
            { label: 'All Collections' },
            SIZE_GUIDE,
          ],
        },
      ],
    },
    KIDS,
    OUR_STORY,
  ];

  protected readonly actions: readonly NavbarAction[] = [
    { label: 'Search', icon: 'search' },
    { label: 'Sign in', icon: 'account', inMobileMenu: true },
    { label: 'Wishlist', icon: 'heart', inMobileMenu: true },
    { label: 'Shopping bag', icon: 'bag' },
  ];

  protected readonly website = { label: 'tawakkulmodest.com', url: 'https://tawakkulmodest.com/' };
  protected readonly shopLinks: readonly FooterLink[] = [NEW_ARRIVALS, ...WOMEN_LINKS, KIDS];
  protected readonly careLinks: readonly FooterLink[] = [
    { label: 'Contact Us' },
    { label: 'FAQ' },
    SIZE_GUIDE,
    SHIPPING_AND_RETURNS,
    { label: 'Track an Order' },
    { label: 'My Account' },
  ];
  protected readonly aboutLinks: readonly FooterLink[] = [
    OUR_STORY,
    { label: 'A Connection Beyond Fashion' },
  ];
  protected readonly legalLinks: readonly FooterLink[] = [
    { label: 'Privacy Policy' },
    { label: 'Terms & Conditions' },
    SHIPPING_AND_RETURNS,
  ];
  protected readonly socialLinks: readonly FooterSocialLink[] = [
    { label: 'Instagram', icon: 'instagram' },
    { label: 'Telegram', icon: 'telegram' },
    { label: 'YouTube', icon: 'youtube' },
  ];
}
