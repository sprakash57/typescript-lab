import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public topics=["Angular","MongoDB","Express","Vue"]; 
  userModel = new User("Sunny","sunnypr12@outlook.com",7044080165,"default","morning",false);
  hasError = false;

  validate(value){
    if(value === "default"){
      this.hasError = true
    }else{
      this.hasError = false
    }
  }
  constructor(private enrollService:EnrollmentService){}
  onSubmit(){
    this.enrollService.enroll(this.userModel)
                      .subscribe(data => console.log("Success!!",data),
                                 error => console.log("Error!",error))
  }
}
