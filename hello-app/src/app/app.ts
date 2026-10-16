import { Component, signal } from '@angular/core';
import { Hello } from './hello/hello';
import { TheList } from './the-list/the-list';

@Component({
  selector: 'app-root',
  imports: [ Hello, TheList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Toto');
}
