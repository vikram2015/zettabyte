import { Injectable } from '@angular/core';
import { FormsModule , FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import 'rxjs/add/operator/map';


const uri = "http://localhost:3200/image/saveNewImage";
@Injectable()
export class ImageService {

   uploader:FileUploader = new FileUploader({url:uri});

  fileDetails :File =null;

  yourHeadersConfig:any
  imageDetails  = {};

  constructor(private _http: HttpClient) { }


  getImage(){
    return this._http.get('/image/getTotalImage' ).map(function (data) {
      // var newData = data.json();
      // return newData;
    });
  }

  deleteImage(parameter){
    return this._http.post('/image/deleteImage',parameter ).map(function (data) {
      // var newData = data.json();
      // return newData;
    });
  }
  updateImage(parameter){
    console.log('parameter in image services')
    console.log(parameter)
    return this._http.post('/image/updateImage',parameter ).map(function (data) {
      // var newData = data.json();
      // return newData;
    });
  }
  attachmentList:any=[];

saveNewImage(file : File){

  console.log(file)
  let data = "this is demo"
  // console.log(file)
  // const endpoint = '/image/saveNewImage';
    let formData: FormData = new FormData();
    // formData.append('fileKey', file, file.name);
    formData.append('fileKey', file, file.name);
    console.log("formData")
    console.log(formData)
    console.log(file.name)
    return this._http.post('/image/saveNewImage', data)
      .map(function(data){

      })
      // .catch((e) => this.handleError(e));
  // this.uploader.onCompleteItem = (item:any, response:any, status:any, header:any)=>{
  //     this.attachmentList.push(JSON.parse(response));
  //   }
 
  // let headers = new Headers();
  //   let formData:FormData = new FormData();
  //   formData.append('files', file[0]);
  //   // For multiple files
  //   // for (let i = 0; i < files.length; i++) {
  //   //     formData.append(`files[]`, files[i], files[i].name);
  //   // }

  //   if(image !=="" && image !== undefined && image !==null){
  //     for (var property in image) {
  //         if (image.hasOwnProperty(property)) {
  //             formData.append(property, image[property]);
  //         }
  //     }
  //   }

// console.log('formData in service')
// console.log(formData)


  // console.log('file in service file')
  // console.log(file)
  // let parameter =  {
  //   imageDetails:image,
  //   File:file
  // }
  // this.fileDetails = <File>file;
  // console.log(parameter)
  // console.log(this.fileDetails)
  // const fd = new FormData();
  // fd.append('image', this.fileDetails, this.fileDetails.name);
  // let newFile = JSON.stringify(file);
  // console.log(newFile)
  //   return this._http.post('/image/saveNewImage',newFile ).map(function (data) {
  //     var newData = data.json();
  //     return newData;
  //   });
  }



  setImageDetails(image) {
    console.log('image in service')
    console.log(image)
    this.imageDetails = image;
  }

  getImageDetails() {
    console.log(this.imageDetails);
    return this.imageDetails;
  }





}


