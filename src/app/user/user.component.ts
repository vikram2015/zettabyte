import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userRecord = [];
  Doughnut: any;
  totalUser: Number;


  constructor(private _userService: UserService, private _router: Router) { }

  
  viewUser(user) {
    this._userService.setUserDetails(user);
    this._router.navigateByUrl('viewUser');
  }


  updateUser(user) {
    this._userService.setUserDetails(user);
    this._router.navigateByUrl('updateUser');
  };


  addNewUser() {
    this._router.navigateByUrl('createUser');
  };



  deleteUser(user, i) {
    let userId = {
      _id: user._id
    };
    this._userService.deleteUser(userId).subscribe((data) => {
      if (data.success) {
        this.userRecord.splice(i, 1);
      }
    });
  };


  ngOnInit() {
    this._userService.getUser().subscribe((data) => {
      if (data.success) {
        for (var i = 0; i < data.user.length; i++) {
          this.userRecord.push(data.user[i]);
        }
        this.totalUser = this.userRecord.length;
      }

      //Global Options
      Chart.defaults.global.defaultFontFamily = 'Lato'
      Chart.defaults.global.defaultFontSize = 18
      Chart.defaults.global.defaultFontColor = '#777'

      //doughnut chart
      this.Doughnut = new Chart('doughnut', {
        type: 'doughnut', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
          labels: [
            'Total User',
            // 'Total Forms',
          ],
          datasets: [{
            data: [
              this.totalUser
            ],
            // backgroundColor:'green'
            backgroundColor: [
              'rgb(255, 99, 132, 0.6)',
              // 'rgb(189, 158, 212, 0.6)',
              // 'rgb(102, 162, 235, 0.6)',
              // 'rgb(255, 206, 86, 0.6)',
              // 'rgb(75, 192, 192, 0.6)'
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Total User Found',
            fontSize: 25,
            // position:'centre'
          },
          legend: {
            // display:false,
            display: true,
            position: 'left',
            lebels: {
              fontColor: '#000'
            }
          },
          layout: {
            padding: {
              left: 650,
              right: 0,
              bottom: 0,
              top: 0
            }
          },
          tooltips: {
            // enabled:false
            enabled: true,
            backgroundColor: 'red',
            fontSize: 18,
            text: 'Abcd'

          },
          responsive: true
        }
      });

    });
  }

}
