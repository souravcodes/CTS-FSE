import { Component, OnInit } from '@angular/core';
import { TaskDetails } from 'src/app/task-manager/task.model';
import { TaskService } from 'src/app/task-manager/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-manager-view',
  templateUrl: './task-manager-view.component.html',
  styleUrls: ['./task-manager-view.component.css']
})
export class TaskManagerViewComponent implements OnInit {

  show:boolean = false;
  isEditable:boolean=false;
  markedIndex:number = -1;

  tasks: TaskDetails[] = [];
  constructor(private taskService:TaskService, private router:Router) {
  }

  ngOnInit() {
    /*this.tasks = [
      new TaskDetails(1, 'task 1 ', '0', 5, '27-02-2018', null,),
      new TaskDetails(2, 'task 2', '1', 4, '27-02-2018', null,),
      new TaskDetails(3, 'task 3', '2', 3, '27-02-2018', null,),
      new TaskDetails(4, 'task 4', '3', 2, '27-02-2018', null,)
    ];*/
  }

  populateTasks(data){
    data.subscribe(e => {
      this.tasks = e;
      this.show = true;
      return;
    });
    this.tasks = [];
    this.show = false;
  }

  updateTask(editableTask:TaskDetails){
    // this.isEditable = !this.isEditable;
    // if(!this.isEditable){
    //   this.taskService.updateTask(editableTask)
    //   .subscribe(data => {
    //     console.log(data);
    //     if(data != null){
    //       alert("data updated successfully");
    //     }
    //   });
    // }
    this.taskService.storeUpdatableTask(editableTask);
    this.router.navigate(['/update']);
  }

  endTask(taskToEnd:TaskDetails){
    let proceed:boolean = confirm("Confirm deletion?");
    if(this.markedIndex != -1 && proceed){
      if(this.markedIndex == taskToEnd.taskId){
        this.markedIndex = -1;
        this.taskService.deleteTask(taskToEnd).subscribe(data=>{
          const index: number = this.tasks.indexOf(taskToEnd);
          if (index !== -1) {
              this.tasks.splice(index, 1);
          }
        });
      }
    }else {
      this.markedIndex = -1;
    }
  }

  markRow(index:number){
    if(this.markedIndex == -1)
      this.markedIndex = index;
    else
      this.markedIndex = -1;
  }
}
