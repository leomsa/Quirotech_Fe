import {Component, OnInit} from '@angular/core';
import {Patient} from "../models/Patient";
import {PatientsService} from "../services/patients.service";
import {catchError, map, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../shared/components/error-dialog/error-dialog.component";
import {FormDialogComponent} from "../../shared/components/form-dialog/form-dialog.component";



@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients$: Observable<Patient[]>;
  displayedColumns = ['name', 'cpf', 'bornDate', 'gender', 'email', 'phone', 'address', 'houseNumber', 'details', 'city', 'district', 'zipCode'];
  searchCpf: string = '';

  constructor(
    private patientService: PatientsService,
    public dialog: MatDialog) {
    this.patients$ = this.patientService.listAllPatients()
      .pipe(
        map(patients => {
          if (patients.length === 0) {
            this.onError("Nenhum paciente encontrado.");
          }
          return patients;
        }),
        catchError(error => {
          this.onError("Não foi possível carregar a Lista de pacientes.");
          return of([]);
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

  getPhoneNumbers(contacts: any[]): string[] {
    const phoneContacts = contacts
      .filter((c: any) => c.contactType === 'PHONE_NUMBER')
      .map((c: any) => c.contactValue);

    return phoneContacts;
  }

  getEmails(contacts: any[]): string[] {
    const emailContacts = contacts
      .filter((c: any) => c.contactType === 'EMAIL')
      .map((c: any) => c.contactValue);
    return emailContacts;
  }

  searchByCpf() {
    if (this.searchCpf) {
      this.patientService.listPatientByCpf(this.searchCpf).subscribe(
        (patient) => {
          if (patient && Object.keys(patient).length !== 0) {
            this.patients$ = of([patient]);
          }
        },
        (error) => {
          this.onError("Nenhum paciente encontrado com o CPF fornecido.");
        }
      );
    } else {
      this.onError("Nenhum CPF fornecido para a pesquisa.");
    }
  }

  createPatient() {
    this.dialog.open(FormDialogComponent);
  }
}
