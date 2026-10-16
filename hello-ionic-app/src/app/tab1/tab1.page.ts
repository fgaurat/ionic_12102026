import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonAlert,
  IonButtons,
  AlertButton,
  AlertController,
} from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonAlert,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class Tab1Page {
  alertController = inject(AlertController);

  constructor() {}

  alertButtons: AlertButton[] = [
    { text: 'Ok', role: 'confirm' },
    { text: 'Cancel', role: 'cancel' },
  ];

  onDidDismiss(event: CustomEvent) {
    console.log(event.detail.role);
  }

  async onShowAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Un autre message',
      buttons: this.alertButtons,
    });

    await alert.present()

    const {role} = await alert.onDidDismiss()
    console.log(role)
  }
}
