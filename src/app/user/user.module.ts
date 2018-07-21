import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserComponent, ViewUserComponent, UpdateUserComponent]
})
export class UserModule { }
