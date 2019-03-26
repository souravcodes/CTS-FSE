import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskDetails } from 'src/app/task-manager/task.model';
import { SearchCriteria } from 'src/app/task-manager/search.model';
import { TaskService } from 'src/app/task-manager/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-manager-search',
  templateUrl: './task-manager-search.component.html',
  styleUrls: ['./task-manager-search.component.css']
})
export class TaskManagerSearchComponent implements OnInit {

  @Output("taskDetailsEmitter")
  taskEventEmitter: EventEmitter<Observable<any>> = new EventEmitter<Observable<any>>();

  lastInputTime:number = 0;

  variable:TaskDetails[];
  taskName:string;
  parentId:string;
  priorityFrom:number;
  priorityTo:number;
  startDate:string;
  endDate:string;
  error:boolean = false;
  proceed:boolean = false;
  
  
  constructor(private taskService:TaskService) {
  }

  ngOnInit() {
    this.taskName = "";
    this.parentId = "";
    this.priorityFrom = 0;
    this.priorityTo = 0;
    this.startDate = "";
    this.endDate = "";
    // this.taskName = sessionStorage.getItem("task-name");
    // this.parentId = sessionStorage.getItem("parent-id");
    // this.priorityFrom = sessionStorage.getItem("priority-from");
    // this.priorityTo = sessionStorage.getItem("priority-to");
    // this.startDate = sessionStorage.getItem("start-date");
    // this.endDate = sessionStorage.getItem("end-date");
  }

  public getTask(){
   this.validate();
    if(!this.error && this.proceed){
      // this.storeSearchData();
      let searchCriteria = new SearchCriteria(this.taskName,
                                              this.parentId,
                                              this.priorityFrom,
                                              this.priorityTo,
                                              this.startDate,
                                              this.endDate);
      this.taskEventEmitter.emit(this.taskService.fetchTask(searchCriteria));
    } else {
      this.taskEventEmitter.emit(new Observable());
    }
  }

  private validate(){
      this.error = (this.priorityFrom > this.priorityTo) 
                   || (this.startDate == "" && this.endDate != "")
                   || (this.startDate != "" && this.endDate == "")
                   || (this.startDate > this.endDate);
      
      this.proceed = (this.taskName != "")
                     || (this.parentId != "" && this.parentId != "0")
                     || (this.priorityTo != 0)
                     || (this.startDate != "")
                     || (this.endDate != "");
  }

  // private storeSearchData(){
  //   sessionStorage.setItem("task-name", this.taskName);
  //   sessionStorage.setItem("parent-id", this.parentId);
  //   // sessionStorage.setItem("priority-from", this.priorityFrom);
  //   // sessionStorage.setItem("priority-to", this.priorityTo);
  //   sessionStorage.setItem("start-date", this.startDate);
  //   sessionStorage.setItem("end-date", this.endDate);
  // }
}
