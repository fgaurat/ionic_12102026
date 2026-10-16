import { Component, inject } from '@angular/core';
import { Todo, Todos } from '../todo';
import { DataService } from '../data-service';

@Component({
  selector: 'app-the-list',
  imports: [],
  templateUrl: './the-list.html',
  styleUrl: './the-list.css',
})
export class TheList {

  readonly dataService = inject(DataService)
  
  readonly todos:Todos = this.dataService.todos

  readonly values =  [...Array(10).keys()]

  constructor(){
    for(let i=0; i<10;i++){

    }
  }
}
