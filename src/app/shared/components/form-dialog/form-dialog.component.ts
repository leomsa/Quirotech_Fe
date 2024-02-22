import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientsService} from "../../../patients/services/patients.service";
import {ContactType} from "../../../patients/models/ContactType";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";
import {PatientsComponent} from "../../../patients/patients/patients.component";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  patientForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private patientService: PatientsService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.patientForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      bornDate: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      houseNumber: ['', Validators.required],
      details: [''],
      city: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  savePatient() {
    const form = document.getElementById('patientForm') as HTMLFormElement;
    const formData = new FormData(form);
    const patient = {
      username: formData.get('username') as string,
      name: formData.get('name') as string,
      cpf: formData.get('cpf') as string,
      bornDate: formData.get('date') as string,
      gender: formData.get('gender') as string,
      password: formData.get('password') as string,
      contact: [
        {
          contactValue: formData.get('email') as string,
          contactType: ContactType.EMAIL
        },
        {
          contactValue: formData.get('phone') as string,
          contactType: ContactType.PHONE_NUMBER
        }
      ],
      address: {
        address: formData.get('address') as string,
        houseNumber: formData.get('houseNumber') as string,
        details: formData.get('details') as string,
        city: formData.get('city') as string,
        district: formData.get('district') as string,
        zipCode: formData.get('zipCode') as string
      }
    };
    this.patientService.createPatient(patient).subscribe(
      (response) => {
        console.log(response);
        this.onSuccess("Paciente cadastrado com sucesso.");
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.onErrror("Não foi possível cadastrar pacicente, revise o cadastro!");
      }
    );
  }

  onSuccess(errorMsg: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: errorMsg
    });
  }
  onErrror(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
