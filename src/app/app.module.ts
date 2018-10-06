import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModel } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule }  from './app-routing.module';
import { UserComponent } from './user/user.component';
import { FileUploadModule } from 'ng2-file-upload';

//Service import
import { UserService } from './user.service';
import { ImageService } from './image.service';
import { ViewUserComponent } from './view-user/view-user.component';

//Module import
import { AppComponent } from './app.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { ImageComponent } from './image/image.component';
import { AddNewImageComponent } from './add-new-image/add-new-image.component';
import { UpdateImageComponent } from './update-image/update-image.component';
import { AddImageComponent } from './add-image/add-image.component';
import { AddImgComponent } from './add-img/add-img.component';
import { TestingFormComponent } from './testing-form/testing-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ViewUserComponent,
    UpdateUserComponent,
    AddNewUserComponent,
    ImageComponent,
    AddNewImageComponent,
    UpdateImageComponent,
    AddImageComponent,
    AddImgComponent,
    TestingFormComponent,
    ReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [UserService,ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
