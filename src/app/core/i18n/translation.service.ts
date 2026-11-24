import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { afterNextRender, computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'en' | 'ar';
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly translateService = inject(TranslateService);
  private readonly languageState = signal<Language>('en');
  readonly language = this.languageState.asReadonly();
  readonly isArabic = computed(() => this.languageState() === 'ar');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        const saved = localStorage.getItem('nova-language');
        this.setLanguage(saved === 'ar' ? 'ar' : 'en');
      });
    }
  }

  setLanguage(language: Language): void {
    this.languageState.set(language);
    this.translateService.use(language).subscribe();
    this.document.documentElement.lang = language;
    this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (isPlatformBrowser(this.platformId)) localStorage.setItem('nova-language', language);
  }

  toggleLanguage(): void {
    this.setLanguage(this.languageState() === 'en' ? 'ar' : 'en');
  }

  translate(value: string | null | undefined): string {
    if (!value) return '';
    return this.translateService.instant(value) as string;
  }
}
