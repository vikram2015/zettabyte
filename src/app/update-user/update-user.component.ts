import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  formData: any;

  constructor(private _userService: UserService, private _router: Router) { }



  getUserDetailsFromService() {
    this.formData = this._userService.getUserDetails()
  }

  updateUserDetails() {
    this._userService.updateUser(this.formData).subscribe((data) => {
      if (data.success) {
        this._router.navigateByUrl('user');
      }
    })
  }

  goBack(){
    this._router.navigateByUrl('user');
  }

  ngOnInit() {
    this.getUserDetailsFromService()
  }

}
