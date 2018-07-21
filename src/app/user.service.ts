import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {


  userDetails = {};

  constructor(private _http: Http) { }



  getUser() {
    return this._http.get('/user/getAllUsers' ).map(function (data) {
      var newData = data.json();
      return newData;
    });
  };

  saveNewUser(parameter) {
    return this._http.post('/user/signUp', parameter).map(function (data) {
      var newData = data.json();
      return newData;
    });
  }

  updateUser(parameter) {
    return this._http.post('/user/updateUsers', parameter).map(function (data) {
      var newData = data.json();
      return newData;
    });
  }


  deleteUser(parameter) {
    return this._http.post('/user/deleteUser', parameter).map(function (data) {
      var newData = data.json();
      return newData;
    });
  }

  setUserDetails(user) {
    this.userDetails = user;
  }

  getUserDetails() {
    return this.userDetails;
  }

}
