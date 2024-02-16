import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from 'ngx-mask';
import { MatToolbarModule } from "@angular/material/toolbar";
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    FormDialogComponent,
    SuccessDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    NgxMaskModule.forRoot(), // Adicione NgxMaskModule.forRoot() aqui
  ],
  exports: [
    ErrorDialogComponent,
    FormDialogComponent,
  ]
})
export class SharedModule { }
