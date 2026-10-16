import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular';
import { PreferencesService } from '../settings/preferences.service';
import { addIcons } from 'ionicons';
import { colorPalette } from 'ionicons/icons';
import { ThemeService } from '../settings/theme.service';
import { RouterLink } from '@angular/router';
import { PreferencesService2 } from '../settings/preferences.service copy';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonNote,
    IonTitle,
    IonToggle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class PreferencesPage {
  prefs = inject(PreferencesService2);
  themeService = inject(ThemeService);

  readonly modeLabels = { system: 'Système', light: 'Clair', dark: 'Sombre' };

  constructor() {
    addIcons({ colorPalette });
  }
}
