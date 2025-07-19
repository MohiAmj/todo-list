import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:1337/api/tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  //  Create a new task (admin only)
  createTask(task: Task): Observable<any> {
    return this.http.post(API_URL, { data: task }, this.getHeaders());
  }

  //  Update a task by documentId (admin only)
updateTask(documentId: string, task: Task): Observable<any> {
  return this.http.put(`${API_URL}/${documentId}`, {
    data: {
      taskName: task.taskName,
      isCompleted: task.isCompleted,
      isReadOnly: task.isReadOnly,
      assignedTo: task.assignedTo ? {
        connect: [{ id: task.assignedTo }]
      } : null
    }
  }, this.getHeaders());
}


  //  Delete a task by documentId (admin only)
  deleteTask(documentId: string): Observable<any> {
    return this.http.delete(`${API_URL}/${documentId}`, this.getHeaders());
  }

  //  Get all tasks, including who they are assigned to
  getTasks(): Observable<any> {
    return this.http.get(`${API_URL}?populate=assignedTo`, this.getHeaders());
  }

  //  Attach token from AuthService to every request
  getHeaders() {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }
}
