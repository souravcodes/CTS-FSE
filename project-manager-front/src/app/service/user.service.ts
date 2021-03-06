import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/add-user/user.model';

const userApiUrl = "http://localhost:8585/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private users:User[] = [];

    constructor(private httpService:HttpClient){}

    getLocalUserList():User[]{
        return this.users;
    }
    setLocalUserList(users:User[]){
        this.users = users;
    }

    addUser(user:User):Observable<any>{
        return this.httpService.post(userApiUrl + "/add", user);
    }

    getAllUser():Observable<any>{
        return this.httpService.get(userApiUrl + "/");
    }

    getUserById(id:string):Observable<any>{
        return this.httpService.get(userApiUrl + "/" + id);
    }

    updateUser(user:User):Observable<any>{
        return this.httpService.put(userApiUrl + "/update", user);
    }

    deleteUserById(id:string):Observable<any>{
        return this.httpService.get(userApiUrl + "/delete/" + id);
    }

}