import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TodolistComponent } from "./todolist/todolist.component";
@Component({
  selector: 'app-root',
  imports: [ButtonModule, TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-list';

}
