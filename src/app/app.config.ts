import { provideToastr } from 'ngx-toastr';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './interceptor/loading/loading-interceptor';
import { headerInterceptorInterceptor } from './interceptor/headerInterceptor/header-interceptor-interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes ,   withInMemoryScrolling({
    scrollPositionRestoration: 'top'
  })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([loadingInterceptor , headerInterceptorInterceptor])),
    importProvidersFrom(NgxSpinnerModule),
      provideToastr(),
      provideTranslateService({
        fallbackLang: 'en',
        loader: provideTranslateHttpLoader({ prefix: '/assets/i18n/', suffix: '.json' }),
      }),
  ]
};
