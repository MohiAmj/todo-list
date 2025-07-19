import { Routes } from '@angular/router';
import { LoginComponent } from './log-in/log-in.component';
import { TodolistComponent } from './todolist/todolist.component';

export const routes: Routes = [

  { path: '', component: TodolistComponent },       // Home
  { path: 'login', component: LoginComponent },     // Login
  { path: '**', redirectTo: '' }                    // Fallback to home

];
