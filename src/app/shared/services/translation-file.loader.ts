import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable()
export class TranslationFileLoader implements TranslateLoader {
  private readonly translations = inject(HttpClient)
    .get<Record<string, TranslationObject | undefined>>('assets/i18n/translations.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  getTranslation(language: string): Observable<TranslationObject> {
    return this.translations.pipe(map((translations) => translations[language] ?? {}));
  }
}
