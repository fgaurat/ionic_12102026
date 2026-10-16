import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hello',
  imports: [FormsModule],
  templateUrl: './hello.html',
  styleUrl: './hello.css',
})
export class Hello {

  name:string="Fred"

  setName(event:KeyboardEvent){
    const e =event.target as HTMLInputElement
    const newName = e.value
    this.name =newName 
  }
}
