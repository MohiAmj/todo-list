import { Component, inject, OnInit, signal } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { TableModule } from 'primeng/table';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';


@Component({
  selector: 'app-todolist',
  standalone: true,
    imports: [CheckboxModule, TableModule, DragDropModule, CommonModule, MultiSelectModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})
export class TodolistComponent implements OnInit {
  count = signal<number>(0);
  taskArray: Task[] = [];
  cols = [
  { field: 'taskName', header: 'Task' },
  { field: 'assignedToName', header: 'Assigned To' } // 👈 New column
];
  private taskService = inject(TaskService);
  public auth = inject(AuthService);
  allUsers: User[] = [];
selectedUserId: number | null = null;

ngOnInit() {

if (!this.auth.isLoggedIn()) {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
  return;
}

const userId = this.auth.getUserId();

if (this.auth.isAdmin()) {
  this.auth.getAllUsers().subscribe(users => {
    this.allUsers = users;
  });
}
   this.taskService.getTasks().subscribe(res => {
    this.taskArray = res.data
      .filter((task: any) => this.auth.isAdmin() || task.assignedTo?.id === userId)
      .map((task: any) => ({
        id: task.id,
        documentId: task.documentId,
        taskName: task.taskName,
        isCompleted: task.isCompleted,
        isReadOnly: task.isReadOnly,
        assignedTo: task.assignedTo?.id ?? null,
        assignedToName: task.assignedTo?.username ?? 'Unassigned'
      }));

    this.updateCount();
  });

  //  Get all users (only if admin)
if (this.auth.isAdmin()) {
  this.auth.getAllUsers().subscribe(users => {
    this.allUsers = users.map((user: any) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }));
  });
}
}





handleRowReorder(event: any) {
  this.taskArray = [...event.value];
  console.log('New row order:', this.taskArray);
}




  updateCount() {
    this.count.set(this.taskArray.length);
  }

logout() {
  this.auth.logout();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

handleDelete(index: number) {
  const task = this.taskArray[index];
  if (task.documentId) {
    this.taskService.deleteTask(task.documentId).subscribe(() => {
      this.taskArray.splice(index, 1);
      this.updateCount();
    });
  } else {
    console.warn('Task has no documentId');
  }
}

  handleEdit(index: number) {
    this.taskArray[index].isReadOnly = false;
  }

  get completionPercent(): number {
  if (this.taskArray.length === 0) return 0;
  const completed = this.taskArray.filter(task => task.isCompleted).length;
  return Math.round((completed / this.taskArray.length) * 100);
}

isAdmin(): boolean {
  return this.auth.isAdmin();
}


handleSave(index: number) {
  const task = this.taskArray[index];
  task.isReadOnly = true; // switch back to read-only

 if (task.documentId) {
  this.taskService.updateTask(task.documentId, task).subscribe({
    next: () => {
      console.log('✅ Task updated:', task);
    },
    error: (err) => {
      console.error('Update failed:', err);
    }
  });
}
 else {
    console.warn('Task has no ID. Cannot update.');
  }
}

onSubmit(form: NgForm) {
  const newTask: Task = {
    taskName: form.controls['newTask'].value,
    isCompleted: false,
    isReadOnly: true,
    assignedTo: this.isAdmin() ? this.selectedUserId : this.auth.getUserId()
  };

  this.taskService.createTask(newTask).subscribe((res) => {
    this.taskArray.push({
      ...newTask,
      id: res.data.id,
      documentId: res.data.documentId
    });
    this.updateCount();
    form.resetForm();
  });
}



}
