import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  formData = {}

  constructor(private _imageService: ImageService, private _router: Router) { }



  getImage() {
    this.formData = this._imageService.getImageDetails();
  }


  updateUserDetails(){
    this._imageService.updateImage(this.formData)
    // .subscribe((data) => {
    //   if (data.success) {
    //     this._router.navigateByUrl('image');
    //   }
    // })
  }

  goBack(){
    this._router.navigateByUrl('image');
  }

  
  ngOnInit() {
    console.log('image update component')
     this.getImage();
  }

}
