import { Component, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { ReorderableColumnDirective } from 'primeng/table';
// import { RowReorderModule } from 'primeng/rowreorder'; //
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  imports: [CheckboxModule, TableModule, DragDropModule, CommonModule, MultiSelectModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})
export class TodolistComponent {

  count = signal<number>(3);

  cols = [{ field: 'taskName', header: 'Task' }];



  taskArray = [
    { taskName: 'Brushing teeth', isCompleted: false, isReadOnly: true },
    { taskName: 'English Class', isCompleted: false, isReadOnly: true },
    { taskName: 'Tennis', isCompleted: false, isReadOnly: true },
  ]

  handleRowReorder(event: any) {
    this.taskArray = [...event.value];
    console.log('New row order:', this.taskArray);
  }

  onSubmit(form: NgForm) {
    console.log(form)

    this.taskArray.push({
      taskName: form.controls['newTask'].value,
      isCompleted: false,
      isReadOnly: true
    })

    this.updateCount();

    form.reset();
  }

  updateCount() {
    let taskLength = this.taskArray.length;
    this.count.update(value => value = taskLength);
  }

  handleDelete(row: number) {
    // this.taskArray = this.taskArray.filter(item => item !== row);
    this.taskArray.splice(row, 1)
    this.updateCount();
  }

  handleEdit(index: number) {
    this.taskArray[index].isReadOnly = false;
  }

  handleSave(index: number) {
    this.taskArray[index].taskName = this.taskArray[index].taskName;
    this.taskArray[index].isReadOnly = true;
    console.log(this.taskArray);
  }

}
