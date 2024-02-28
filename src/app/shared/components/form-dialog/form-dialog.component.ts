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
    this.updatedPatientForm();
  }

  initForm(): void {
    this.patientForm = this.formBuilder.group({
      username: [''],
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
    // const form = document.getElementById('patientForm') as HTMLFormElement;
    // const formData = new FormData(form);
    const patientForm = this.patientForm;
    const patient = {
      username: this.patientForm.get('username')?.value as string,
      name: this.patientForm.get('name')?.value as string,
      cpf: this.patientForm.get('cpf')?.value as string,
      bornDate: this.patientForm.get('date')?.value as string,
      gender: this.patientForm.get('gender')?.value as string,
      password: this.patientForm.get('password')?.value as string,
      contact: [
        {
          contactValue: patientForm.get('email')?.value as string,
          contactType: ContactType.EMAIL
        },
        {
          contactValue: this.patientForm.get('phone')?.value as string,
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

  private updatedPatientForm() {
    this.dialogRef.afterOpened().subscribe(() => {
      if (this.patientData) {
        this.patientForm.patchValue({
          username: this.patientData.username || '',
          name: this.patientData.name || '',
          cpf: this.patientData.cpf || '',
          bornDate: this.patientData.bornDate || '',
          gender: this.patientData.gender || '',
          password: this.patientData.password || '',
          telephone: this.patientData.contact[1]?.contactValue || '',
          email: this.patientData.contact[0]?.contactValue || '',
          address: this.patientData.address?.address || '',
          houseNumber: this.patientData.address?.houseNumber || '',
          details: this.patientData.address?.details || '',
          city: this.patientData.address?.city || '',
          district: this.patientData.address?.district || '',
          zipCode: this.patientData.address?.zipCode || ''
        });
        console.table(this.patientForm.value);
      }
    });
  }
}
