import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from './todo';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  httpClient = inject(HttpClient);

  findAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(environment.urlTodos);
  }

  delete(todo: Todo): Observable<void> {
    const url = `${environment.urlTodos}/${todo.id}`;
    return this.httpClient.delete<void>(url);
  }
}
