import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { definePreset } from '@primeuix/themes';
import Material from '@primeuix/themes/material';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';
import { provideToastr } from 'ngx-toastr';

const MyPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    },
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    providePrimeNG({
      ripple: true,
      inputStyle: 'filled',
      theme: { preset: MyPreset, options: { darkModeSelector: '.app-dark' } },
    }),
    provideSweetAlert2({
      fireOnInit: false,
      dismissOnDestroy: true,
    }),
    provideToastr(),
  ]
};
