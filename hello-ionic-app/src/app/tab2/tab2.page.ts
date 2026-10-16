import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
} from '@ionic/angular';
import { DataService } from '../data-service';
import { Todos } from '../todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonLabel,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCheckbox,
    FormsModule,
  ],
})
export class Tab2Page {
  readonly dataService = inject(DataService);

  readonly todos: Todos = this.dataService.todos;

  constructor() {}
}
