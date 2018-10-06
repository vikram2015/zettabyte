import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testing-form',
  templateUrl: './testing-form.component.html',
  styleUrls: ['./testing-form.component.css']
})
export class TestingFormComponent implements OnInit {
firstName
formData={};
  constructor() { }

  log(){console.log(this.firstName)}


  clickAct(){
    console.log(this.firstName)
    console.log(this.formData)
  }

  ngOnInit() {
  }

}
