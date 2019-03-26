import { ParentTask } from "src/app/task-manager/parent-task.model";

export class TaskDetails {
    taskId:number;
    task:string;
    parent:ParentTask;
    priority:number;
    startDate:string;
    endDate:string;

    constructor(taskId:number,
                task:string,
                parent:ParentTask,
                priority:number,
                startDate:string,
                endDate:string){
        this.taskId = taskId;
        this.task = task;
        this.parent = parent;
        this.priority = priority;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}