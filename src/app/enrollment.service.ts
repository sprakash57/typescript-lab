import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  url = "http://localhost:3000/enroll"
  constructor(private _http:HttpClient) { }

  enroll(user:User){
    return this._http.post<any>(this.url,user);
  }
}
