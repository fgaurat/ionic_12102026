import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { TodoSignalService } from '../todo-signal.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-signal',
  imports: [],
  templateUrl: './todo-list-signal.component.html',
  styleUrl: './todo-list-signal.component.css',
})
export class TodoListSignalComponent {
  todoSignalService = inject(TodoSignalService);

  todos: Signal<Todo[]> = this.todoSignalService.todos;

  delete(todo: Todo) {
    this.todoSignalService.delete(todo);
  }
}
