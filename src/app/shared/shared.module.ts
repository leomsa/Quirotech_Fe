import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    FormDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class SharedModule { }
