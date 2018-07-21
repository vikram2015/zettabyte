import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-add-new-image',
  templateUrl: './add-new-image.component.html',
  styleUrls: ['./add-new-image.component.css']
})
export class AddNewImageComponent implements OnInit {

  form: FormGroup;
  formData = {};
  myFile = {};

  constructor(private _imageService: ImageService, private _router: Router) { }


  fileUploadFun(event) {
    console.log('event in component')
    console.log(event)
    this.myFile = event.target.files[0];
    
  }

  //  fileUploadFun(event) {
  //   let reader = new FileReader();
  //   // if(event.target.files && event.target.files.length > 0) {
  //   //   let file = event.target.files[0];
  //   //   reader.readAsDataURL(file);
  //   //   reader.onload = () => {
  //   //     this.myFile={
  //   //       filename: file.name,
  //   //       filetype: file.type,
  //   //       value: reader.result.split(',')[1]
  //   //     }
  //   //   };
  //   // }
  //   console.log(this.myFile)
  // }

  addImageDetails() {
    console.log("this.formData")
    console.log(this.formData)
    console.log("this.myFile")
    console.log(this.myFile)
    this._imageService.saveNewImage(this.formData,this.myFile).subscribe((data) => {
      if (data.success) {
        this._router.navigateByUrl('image');
      } else {
        alert(data.MSG)
      }
    });
  }



  ngOnInit() {
  }

}
