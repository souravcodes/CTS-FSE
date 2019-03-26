import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/add-user/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  @Input() users:User[] = [];
  searchKey:string = "Search...";
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(data => {
      this.users = data;
      this.userService.setLocalUserList(this.users);
    });
  }

  sortList(criteria:string){
    if(criteria == 'FN'){
      
    }

  }
clearField1(){
    if(this.searchKey == "Search..."){
      this.searchKey = "";
      return;
    }
    
  }
  clearField2(){
    if(this.searchKey == ""){
      this.searchKey = "Search...";
      return;
    }
  }
}
