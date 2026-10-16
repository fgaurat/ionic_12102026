import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, ToastController } from '@ionic/angular';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private toastController = inject(ToastController);

  constructor() {}

  ngOnInit(): void {
    Network.addListener('networkStatusChange', async (status) => {
      console.log('Network status changed', status);
      const toast = await this.toastController.create({
        header: 'Header',
        message: `Network status: ${status.connectionType}`,
        duration: 1000,
      });

      await toast.present();
    });
  }
}
