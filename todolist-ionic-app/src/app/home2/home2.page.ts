import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { settings } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonIcon,
    RouterLink,
  ],
})
export class Home2Page {
  constructor() {
    addIcons({ settings });
  }
}
