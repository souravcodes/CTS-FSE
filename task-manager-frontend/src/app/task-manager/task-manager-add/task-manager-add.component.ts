import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task-manager/task.service';
import { TaskDetails } from 'src/app/task-manager/task.model';
import { ParentTask } from 'src/app/task-manager/parent-task.model';

@Component({
  selector: 'app-task-manager-add',
  templateUrl: './task-manager-add.component.html',
  styleUrls: ['./task-manager-add.component.css']
})
export class TaskManagerAddComponent implements OnInit {
  sliderPointerVal:number = 1;
  taskId:number;
  taskName:string;
  parentId:string;
  startDate:string;
  endDate:string;

  parent:ParentTask;
  
  constructor(private taskService:TaskService) { }

  ngOnInit() {
  }

  sliderPointerChange(pointerValue){
    this.sliderPointerVal = pointerValue;
  }

  addTask(){
    let parentTask = new ParentTask("", this.parentId);
    let taskDetails = new TaskDetails(this.taskId,this.taskName, parentTask,
                        this.sliderPointerVal, this.startDate, this.endDate );
    
    this.taskService.addTask(taskDetails)
        .subscribe((data:TaskDetails) => {
          console.log("data.taskId: " + data.taskId);
          taskDetails = data;
          alert("data saved");
          this.resetPage();
        });
  }

  resetPage(){
    this.sliderPointerVal = 1;
    this.taskName = "";
    this.parentId = "";
    this.startDate = "";
    this.endDate = "";
  }
}
