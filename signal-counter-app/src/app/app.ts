import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title: WritableSignal<string> = signal('signal-counter-app');
  readonly count: WritableSignal<number> = signal(0);
  readonly doubleCount: Signal<number> = computed(() => this.count() * 2);

  setTo3() {
    this.count.set(3);
  }
  inc() {
    this.count.update((value) => value + 1);
  }

  constructor() {
    effect(() => {
      console.log(`doubleCount ${this.doubleCount()} and the counter is ${this.count()}`);
    });
  }
}
