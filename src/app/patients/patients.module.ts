import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientsRoutingModule} from './patients-routing.module';
import {PatientsComponent} from './patients/patients.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    PatientsComponent
  ],
    imports: [
        CommonModule,
        PatientsRoutingModule,
        MatTableModule,
        MatCardModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatIconModule,
      MatButtonModule

    ]
})
export class PatientsModule { }
