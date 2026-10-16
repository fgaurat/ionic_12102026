import { Component, inject, Signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonRefresher,
  IonRefresherContent,
  IonItemSliding,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
  IonSkeletonText,
  IonItemOptions,
  IonItemOption,
  IonAccordion,
} from '@ionic/angular';
import { TodoService } from '../todos/todo.service';
import { Todo } from '../todos/todo';
import { addIcons } from 'ionicons';
import { add, arrowUp, beer, settings, trash } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

import { HelloPlugin } from '@sinari/hello';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonButtons,
    IonInput,
    IonLabel,
    FormsModule,
    IonItem,
    IonCheckbox,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonSkeletonText,
    RouterLink,
  ],
})
export class HomePage {
  todoService: TodoService = inject(TodoService);

  loading = this.todoService.loading;
  todos: Signal<Todo[]> = this.todoService.todos;
  todoTitle: string = '';

  constructor() {
    this.todoService.load();

    addIcons({ add, trash, settings, beer });
  }

  echo() {
    HelloPlugin.echo({ value: 'Fred' });
  }

  add() {
    this.todoService.add(this.todoTitle);
  }

  // On ignore les ionChange déclenchés par un changement programmatique
  toggle(todo: Todo, checked: boolean) {
    if (todo.completed !== checked) this.todoService.toggle(todo);
  }

  // Swipe gauche→droite : terminer / rouvrir
  async swipeToggle(todo: Todo, sliding: IonItemSliding) {
    await sliding.close();
    this.todoService.toggle(todo);
  }

  // // Swipe droite→gauche : supprimer
  async remove(todo: Todo, sliding: IonItemSliding) {
    await sliding.close();
    // if (this.prefs.confirmDelete() && !(await this.confirm())) return;
    this.todoService.remove(todo);
  }
  // Pull-to-refresh : on recharge la liste puis on referme le refresher
  async refresh(event: CustomEvent) {
    try {
      await this.todoService.load();
    } catch (e) {
      throw e;
    } finally {
      (event.target as HTMLIonRefresherElement).complete();
    }
  }
  // private async confirm(): Promise<boolean> {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Supprimer cette tâche ?',
  //     buttons: [
  //       { text: 'Annuler', role: 'cancel' },
  //       { text: 'Supprimer', role: 'confirm' },
  //     ],
  //   });
  //   await alert.present();
  //   const { role } = await alert.onDidDismiss();
  //   return role === 'confirm';
  // }
}
