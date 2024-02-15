import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ErrorDialogComponent,
    FormDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
