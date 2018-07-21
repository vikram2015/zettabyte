import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  formData: any;
  constructor(private _userService: UserService, private _router: Router) { }


  viewUserDetails() {
    this.formData = this._userService.getUserDetails()
  }

  goBack(){
    this._router.navigateByUrl('user');
  }

  
  ngOnInit() {
    this.viewUserDetails()
  }

}
