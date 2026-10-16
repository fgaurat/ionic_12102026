import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
  ToastController,
} from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {
  ErrorHandler,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

class MyErrorHandler implements ErrorHandler {
  private toastController: ToastController = inject(ToastController);
  handleError(error: unknown): void {
    console.error('[GlobalErrorHandler]', error);

    const message = error instanceof Error ? error.message : String(error);
    this.toastController
      .create({
        message: `Erreur : ${message}`,
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      })
      .then((toast) => toast.present());
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ErrorHandler, useClass: MyErrorHandler },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideBrowserGlobalErrorListeners(),
    provideIonicAngular(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
    ),
  ],
});
