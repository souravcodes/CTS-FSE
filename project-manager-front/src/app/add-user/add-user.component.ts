import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUsers:User[] = [];
  firstName:string;
  lastName:string;
  employeeId:string;

  error:String = "All fields are mandatory.";

  constructor(private userService:UserService) { }

  ngOnInit() {

  }
  
 addUser(){
  let user:User = new User("", this.firstName, this.lastName, this.employeeId);
  this.userService.addUser(user).subscribe(data => {
    if(this.userService.getLocalUserList() === undefined){
      this.userService.setLocalUserList([data]);
    }else{
      this.userService.getLocalUserList().push(data);
    }
    alert("User added successfully.");
    this.newUsers = this.userService.getLocalUserList();
  });
 }
 reset(){
    this.firstName = "";
    this.lastName = "";
    this.employeeId = "";
 }

}
