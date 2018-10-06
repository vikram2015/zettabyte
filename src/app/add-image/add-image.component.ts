import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';


const uri = "http://localhost:3200/image/saveNewImage";
@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  uploader:FileUploader = new FileUploader({url:uri});

  attachmentList:any=[];

  constructor() {

    console.log(this.uploader)

    this.uploader.onCompleteItem = (item:any, response:any, status:any, header:any)=>{
      this.attachmentList.push(JSON.parse(response));
    }

   }


   download(index){
     
   }

  ngOnInit() {
  }

}
