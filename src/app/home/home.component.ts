import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  languages:string[] = ["English","Hindi","Others"];
  model = new Employee("","Prakash",true,"w2")
  constructor() { }

  ngOnInit() {
  }

}
