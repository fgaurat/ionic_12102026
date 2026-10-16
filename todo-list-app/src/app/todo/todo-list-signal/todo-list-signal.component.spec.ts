import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListSignalComponent } from './todo-list-signal.component';

describe('TodoListSignalComponent', () => {
  let component: TodoListSignalComponent;
  let fixture: ComponentFixture<TodoListSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListSignalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListSignalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
