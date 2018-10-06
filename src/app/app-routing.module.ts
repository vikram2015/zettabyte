import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { ImageComponent } from './image/image.component';
import { AddNewImageComponent } from './add-new-image/add-new-image.component';
import { UpdateImageComponent } from './update-image/update-image.component';
import { AddImageComponent } from './add-image/add-image.component';
import { AddImgComponent } from './add-img/add-img.component';
import { TestingFormComponent } from './testing-form/testing-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';




const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'user', component: UserComponent },
  { path: 'createUser', component: AddNewUserComponent },
  { path: 'viewUser', component: ViewUserComponent },
  { path: 'updateUser', component: UpdateUserComponent },
  { path: 'image', component: ImageComponent },
  { path: 'createimage', component: AddNewImageComponent },
  { path: 'updateimage', component: UpdateImageComponent },
  { path: 'addImg', component: AddImageComponent },
  { path: 'addImag', component: AddImgComponent },
  { path: 'formTest', component: TestingFormComponent },
  { path: 'reactiveForm', component: ReactiveFormComponent },
  
//   { path: 'contacts/add', component: addContactsComponent },
  
//   {
//      path: 'payment',
//       component: PaymentComponent,
//       children:[
//         {
//         path:'success',
//         component:PaymentComponent
//         }
//       ]
    
//     },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],  
  declarations: []
})



export class AppRoutingModule { }
