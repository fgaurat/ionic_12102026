import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { EMPTY, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todoService = inject(TodoService);

  changeDetectorRef = inject(ChangeDetectorRef);

  // todos: Todo[] = [];
  todos$: Observable<Todo[]> = EMPTY;
  constructor() {
    this.todos$ = this.todoService.findAll();
  }

  delete(todo: Todo) {
    console.log(todo);
    // this.todoService.delete(todo).subscribe(() => {
    //   this.todos$ = this.todoService.findAll();
    //   this.changeDetectorRef.detectChanges();
    // });

    this.todos$ = this.todoService.delete(todo).pipe(
      switchMap(() => this.todoService.findAll())
    );
  }

  // constructor() {
  //   this.todoService.findAll().subscribe((data) => {
  //     console.log(data);
  //     this.todos = data;
  //     this.changeDetectorRef.detectChanges();
  //   });
  // }
}
