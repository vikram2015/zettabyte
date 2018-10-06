import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-img',
  templateUrl: './add-img.component.html',
  styleUrls: ['./add-img.component.css']
})
export class AddImgComponent implements OnInit {
  
  form: FormGroup;
  formData = {};
fileData :any
  constructor() { }

  upload(event){
    console.log("fileData")
    console.log(event)
    console.log(this.fileData)
  }



  ngOnInit() {
  }

}
