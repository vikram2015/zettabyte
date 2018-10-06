import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  imageRecord = [];

  constructor(private _imageService: ImageService, private _router: Router) { }


  updateImage(image){
    console.log(image);
    if(image){
      this._imageService.setImageDetails(image);
    this._router.navigateByUrl('updateimage');
    }
  }

  addNewImage(){
    this._router.navigateByUrl('createimage');
  }

deleteImage(image, i) {
    let imageId = {
      _id: image._id
    };
    this._imageService.deleteImage(imageId)
    // .subscribe((data) => {
    //   console.log(data)
    //   if (data.success) {
    //     this.imageRecord.splice(i, 1);
    //   }
    // });
  };



  ngOnInit() {
    this._imageService.getImage()
    // .subscribe((data) => {
    //   if (data.success) {
    //     for (var i = 0; i < data.Image.length; i++) {
    //       this.imageRecord.push(data.Image[i]);
    //     }
    //   }
    // })
  }

}
