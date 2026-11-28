import { InjectionToken } from '@angular/core';

interface SupportLink {
  route: string;
  label: string;
}

type SupportPageConfig = SupportLink &
  (
    | { kind: 'contact' | 'faq'; eyebrow: string; description: string }
    | { kind: 'size' }
    | { kind: 'policy'; policy: string; sections: readonly string[] }
  );

export const SUPPORT_PAGES = {
  contact: {
    route: '/contact',
    label: 'COMMON.CONTACT_US',
    kind: 'contact',
    eyebrow: 'SUPPORT.CONTACT.EYEBROW',
    description: 'SUPPORT.CONTACT.INTRO',
  },
  faq: {
    route: '/faq',
    label: 'COMMON.FAQ',
    kind: 'faq',
    eyebrow: 'SUPPORT.FAQ.EYEBROW',
    description: 'SUPPORT.FAQ.INTRO',
  },
  size: { route: '/size-guide', label: 'COMMON.SIZE_GUIDE', kind: 'size' },
  shipping: {
    route: '/shipping-returns',
    label: 'COMMON.SHIPPING_AND_RETURNS',
    kind: 'policy',
    policy: 'SUPPORT.SHIPPING',
    sections: ['DELIVERY', 'DESTINATIONS', 'CUSTOM', 'RETURNS', 'CONTACT'],
  },
  privacy: {
    route: '/privacy',
    label: 'FOOTER.PRIVACY_POLICY',
    kind: 'policy',
    policy: 'SUPPORT.PRIVACY',
    sections: ['COLLECTION', 'USAGE', 'LOCAL_STORAGE', 'RIGHTS', 'CONTACT'],
  },
  terms: {
    route: '/terms',
    label: 'FOOTER.TERMS_AND_CONDITIONS',
    kind: 'policy',
    policy: 'SUPPORT.TERMS',
    sections: ['INTRODUCTION', 'ORDERS', 'PAYMENT', 'DELIVERY', 'INTELLECTUAL_PROPERTY'],
  },
} as const satisfies Record<string, SupportPageConfig>;

export const SUPPORT_PAGE = new InjectionToken<SupportPageConfig>('Customer care page');

export const FAQ_GROUPS = [
  { id: 'ORDERS', questions: ['ACCOUNT', 'TRACKING', 'CHANGE'] },
  { id: 'SIZING', questions: ['FIT', 'CUSTOM'] },
  { id: 'SHIPPING', questions: ['DESTINATIONS', 'RETURNS'] },
  { id: 'PAYMENT', questions: ['METHODS'] },
] as const;
