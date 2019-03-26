export class User{

    userId:string;
    firstName:string;
    lastName:string;
    employeeId:string;

    constructor(userId:string,
                firstName:string,
                lastName:string,
                employeeId:string){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeId = employeeId;
    }
}