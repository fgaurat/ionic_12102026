import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Todo } from './todo';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
//ng g s todo-signal --type=service
export class TodoSignalService {
  private readonly httpClient = inject(HttpClient);
  private readonly todoResource = httpResource<Todo[]>(() => environment.urlTodos, {
    defaultValue: [],
  });

  //readonly todos = this.todoResource.value;

  readonly todos = computed<Todo[]>(() =>
    this.todoResource.hasValue() ? this.todoResource.value() : [],
  );

  readonly error = this.todoResource.error;
  readonly isLoading = this.todoResource.isLoading;

  delete(todo: Todo): void {
    const url = `${environment.urlTodos}/${todo.id}`;
    this.httpClient.delete<void>(url).subscribe(() => this.todoResource.reload());
  }

  save(todo: Omit<Todo, 'id'>): void {
    this.httpClient.post<Todo>(environment.urlTodos, todo).subscribe((newTodo) => {
      this.updateLocal((todos) => [...todos, newTodo]);
    });
  }

  // update() lit aussi value() : en état d'erreur il lèverait une exception.
  // Sans valeur valide, on recharge depuis le serveur à la place.
  private updateLocal(updater: (todos: Todo[]) => Todo[]): void {
    if (this.todoResource.hasValue()) {
      this.todoResource.update(updater);
    } else {
      this.todoResource.reload();
    }
  }
}
