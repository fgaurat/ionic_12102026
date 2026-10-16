import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoSignalService } from '../todo-signal.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  private fb: FormBuilder = inject(FormBuilder);
  todoSignalService = inject(TodoSignalService);
  todoForm = this.fb.group({
    title: ['', Validators.required],
    completed: [false],
  });

  save() {
    this.todoSignalService.save(this.todoForm.value as Todo);
  }
}
