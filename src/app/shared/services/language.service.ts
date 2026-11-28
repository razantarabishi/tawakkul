import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

export type AppLanguage = 'en' | 'ar';

const DEFAULT_LANGUAGE: AppLanguage = 'en';
const STORAGE_KEY = 'tawakkul.language';

function isAppLanguage(value: string | null): value is AppLanguage {
  return value === 'en' || value === 'ar';
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly current = signal<AppLanguage>(DEFAULT_LANGUAGE);

  readonly language = this.current.asReadonly();
  readonly direction = computed(() => (this.language() === 'ar' ? 'rtl' : 'ltr'));
  private readonly integerFormatter = computed(
    () =>
      new Intl.NumberFormat(this.language(), {
        numberingSystem: this.language() === 'ar' ? 'arab' : 'latn',
        useGrouping: false,
      }),
  );

  constructor() {
    this.translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(({ lang }) => {
      if (isAppLanguage(lang)) {
        this.current.set(lang);
        this.document.documentElement.lang = lang;
        this.document.documentElement.dir = this.direction();
        this.persist(lang);
      }
    });
  }

  async initialize(): Promise<void> {
    try {
      await firstValueFrom(this.translate.setFallbackLang(DEFAULT_LANGUAGE));
    } catch {
      // A later selection can retry the asset request without blocking application bootstrap.
    }

    const preferred = this.readPreference();
    if (!(await this.setLanguage(preferred)) && preferred !== DEFAULT_LANGUAGE) {
      await this.setLanguage(DEFAULT_LANGUAGE);
    }
  }

  async setLanguage(language: string): Promise<boolean> {
    if (!isAppLanguage(language)) {
      return false;
    }

    try {
      await firstValueFrom(this.translate.use(language));
      return true;
    } catch {
      return false;
    }
  }

  formatInteger(value: number): string {
    return this.integerFormatter().format(value);
  }

  private readPreference(): AppLanguage {
    try {
      const saved = this.document.defaultView?.localStorage.getItem(STORAGE_KEY) ?? null;
      return isAppLanguage(saved) ? saved : DEFAULT_LANGUAGE;
    } catch {
      return DEFAULT_LANGUAGE;
    }
  }

  private persist(language: AppLanguage): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Language changes still work when storage is unavailable.
    }
  }
}
