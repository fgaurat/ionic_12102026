import { HttpClient } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { Todo } from './todo';
import { SqliteService } from '../sqlite/sqlite.service';

@Service()
export class TodoService {
  private http = inject(HttpClient);
  private sqlite = inject(SqliteService);

  // #region toto
  // L'état de la liste : un signal que les composants lisent
  readonly todos = signal<Todo[]>([]);
  readonly offline = signal(false);
  // #endregion

  // true tant que le premier chargement n'est pas terminé (sert aux skeletons)
  readonly loading = signal(true);

  async load() {
    try {
      const todos = await firstValueFrom(
        this.http.get<Todo[]>(environment.urlTodos),
      );
      this.todos.set(todos);
      this.offline.set(false);
      // Mise à jour du cache en arrière-plan : on n'attend pas SQLite pour afficher la liste
      void this.cache(() => this.sqlite.replaceAll(todos));
    } catch (e) {
      // API injoignable : on affiche ce que SQLite a gardé
      this.todos.set((await this.cache(() => this.sqlite.all())) ?? []);
      this.offline.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  // Récupère une tâche : depuis le signal si elle y est, sinon depuis l'API
  async get(id: number): Promise<Todo> {
    const cached = this.todos().find((t) => t.id === id);
    if (cached) return cached;
    return firstValueFrom(this.http.get<Todo>(`${environment.urlTodos}/${id}`));
  }

  async add(title: string) {
    const created = await firstValueFrom(
      this.http.post<Todo>(environment.urlTodos, { title, completed: false }),
    );
    this.todos.update((list) => [...list, created]);
  }

  async update(
    todo: Todo,
    changes: Partial<Pick<Todo, 'title' | 'completed'>>,
  ): Promise<Todo> {
    const updated = await firstValueFrom(
      this.http.patch<Todo>(`${environment.urlTodos}/${todo.id}`, changes),
    );
    this.todos.update((list) =>
      list.map((t) => (t.id === updated.id ? updated : t)),
    );
    return updated;
  }

  toggle(todo: Todo): Promise<Todo> {
    return this.update(todo, { completed: !todo.completed });
  }

  async remove(todo: Todo) {
    await firstValueFrom(
      this.http.delete(`${environment.urlTodos}/${todo.id}`),
    );
    this.todos.update((list) => list.filter((t) => t.id !== todo.id));
  }

  private async cache<T>(action: () => Promise<T>): Promise<T | undefined> {
    try {
      return await action();
    } catch (err) {
      console.error('SQLite :', err);
      return undefined;
    }
  }
}
