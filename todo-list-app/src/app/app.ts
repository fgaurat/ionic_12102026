import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoForm } from './todo/todo-form/todo-form';
import { TodoList } from './todo/todo-list/todo-list';
import { TodoListSignalComponent } from './todo/todo-list-signal/todo-list-signal.component';

@Component({
  selector: 'app-root',
  imports: [TodoForm, TodoList, TodoListSignalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo-list-app');
}
