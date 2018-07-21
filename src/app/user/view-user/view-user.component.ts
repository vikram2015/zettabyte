import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router, private _userComponent: UserComponent) { }

  demo(){
  // this._userComponent.viewContact()
  this._userService.getUser().subscribe((data) => {
    console.log('data///////')
    console.log(data)
  })
  }
  ngOnInit() {
    this.demo();
  }

}
