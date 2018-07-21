import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {


  formData: {};

  userCreateForm: FormGroup;


  constructor(private _userService: UserService, private _router: Router) { }

  errorMessage = "";
  erro = [];
  saveUserDetails() {
    this._userService.saveNewUser(this.formData).subscribe((data) => {
      this.erro = [];
      this.erro = data.MSG;
      if (data.success) {
        this._router.navigateByUrl('user');
      } else {
        for (var i = 0; i < this.erro.length; i++) {
          this.errorMessage = this.errorMessage +  data.MSG[i]+' , ' ;
        }
        alert(this.errorMessage)
      }
    });
  };


  goBack() {
    this._router.navigateByUrl('user');
  }



  ngOnInit() {

    // this.userCreateForm = new FormGroup({
    //   userName:new FormControl(),
    //   // email:new FormControl('', [
    //   //   Validators.required,
    //   //   // Validators.minLength(8),
    //   //   // Validators.maxLength(20)
    //   // ]),
    // //   answer:new FormControl(),
    // //   adress:new FormGroup({
    // //     line1:new FormControl('marathahalli'),
    // //   city:new FormControl(),
    // //   state:new FormControl(),
    // //   }),
    // // hobbies:new FormArray([])
    //  });

    this.formData = {
      userName: '',
      email: '',
      userAdress: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
      }
    };
  }

}
