import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AlertController,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonSkeletonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

import { PreferencesService } from '../settings/preferences.service';
import { TodoService } from '../todos/todo.service';
import { Todo } from '../todos/todo';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.page.html',
  imports: [
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonSkeletonText,
    IonTitle,
    IonToggle,
    IonToolbar,
  ],
})
export class TodoPage {
  private todoService = inject(TodoService);
  private prefs = inject(PreferencesService);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);

  // Paramètre de route :id (string), lié via withComponentInputBinding()
  id = input.required<string>();

  todo = signal<Todo | null>(null);
  notFound = signal(false);
  title = signal('');

  constructor() {
    addIcons({ trash });
  }

  // ionViewWillEnter : appelé à chaque affichage de la page (même en revenant dessus)
  async ionViewWillEnter() {
    try {
      const todo = await this.todoService.get(Number(this.id()));
      this.todo.set(todo);
      this.title.set(todo.title);
    } catch {
      this.notFound.set(true);
    }
  }

  // On ignore les ionChange déclenchés par un changement programmatique (checked déjà à jour)
  async toggle(checked: boolean) {
    const todo = this.todo();
    if (todo && todo.completed !== checked)
      this.todo.set(await this.todoService.toggle(todo));
  }

  async save() {
    const todo = this.todo();
    const title = this.title().trim();
    if (!todo || !title || title === todo.title) return;
    this.todo.set(await this.todoService.update(todo, { title }));
  }

  async remove() {
    const todo = this.todo();
    if (!todo) return;
    if (this.prefs.confirmDelete() && !(await this.confirm())) return;
    await this.todoService.remove(todo);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  private async confirm(): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: 'Supprimer cette tâche ?',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Supprimer', role: 'confirm' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }
}
