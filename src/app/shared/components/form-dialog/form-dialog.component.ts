import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientsService} from "../../../patients/services/patients.service";
import {ContactType} from "../../../patients/models/ContactType";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";
import {Patient} from "../../../patients/models/Patient";

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
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public patientData: Patient
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.updatedPatientForm(this.patientData);
  }

  initForm(): void {
    this.patientForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: [''],
      cpf: [''],
      bornDate: [''],
      gender: [''],
      password: [''],
      telephone: [''],
      email: [''],
      address: [''],
      houseNumber: [''],
      details: [''],
      city: [''],
      district: [''],
      zipCode: ['']
    });
  }

  savePatient() {
    const patientForm = this.patientForm;

    const rawBornDate  = this.patientForm.get('bornDate')?.value as string;
    const day = parseInt(rawBornDate.substr(0, 2), 10);
    const month = parseInt(rawBornDate.substr(2, 2), 10) - 1;
    const year = parseInt(rawBornDate.substr(4, 4), 10);
    const formattedBornDate = `${day}-${('0' + (month + 1)).slice(-2)}-${year}`;

    const patient = {
      username: this.patientForm.get('username')?.value as string,
      name: this.patientForm.get('name')?.value as string,
      cpf: this.patientForm.get('cpf')?.value as string,
      bornDate: formattedBornDate,
      gender: this.patientForm.get('gender')?.value as string,
      password: this.patientForm.get('password')?.value as string,
      contact: [
        {
          contactValue: patientForm.get('Email')?.value as string,
          contactType: ContactType.EMAIL
        },
        {
          contactValue: this.patientForm.get('telephone')?.value as string,
          contactType: ContactType.PHONE_NUMBER
        }
      ],
      address: {
        address: this.patientForm.get('address')?.value as string,
        houseNumber: this.patientForm.get('houseNumber')?.value as string,
        details: this.patientForm.get('details')?.value as string,
        city: this.patientForm.get('city')?.value as string,
        district: this.patientForm.get('district')?.value as string,
        zipCode: this.patientForm.get('zipCode')?.value as string
      }
    };
    this.patientService.createPatient(patient).subscribe(
      (response) => {
        console.log(response);
        this.onSuccess("Paciente cadastrado com sucesso.");
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

  convertToUppercase(event: any): void {
    event.target.value = event.target.value.toUpperCase();
  }

  private updatedPatientForm(patient: Patient) {
    if (this.patientData) {
      this.patientForm.patchValue({
        username: patient.username,
        name: patient.name,
        cpf: patient.cpf,
        bornDate: patient.bornDate,
        gender: patient.gender,
        password: patient.password,
        email: patient.contact[0].contactValue,
        phone: patient.contact[1].contactValue,
        address: patient.address.address,
        houseNumber: patient.address.houseNumber,
        details: patient.address.details,
        city: patient.address.city,
        district: patient.address.district,
        zipCode: patient.address.zipCode
      });
    }
  }
}
