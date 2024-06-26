import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientsService} from "../../../patients/services/patients.service";
import {ContactType} from "../../../patients/models/ContactType";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";
import {Patient} from "../../../patients/models/Patient";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  patientForm!: FormGroup;
  isEditMode!: boolean;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private patientService: PatientsService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public patientData: Patient
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.loadPatientData(this.patientData);
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
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.editablePatient();
      } else {
      }
      if (!this.patientData) {
        const rawBornDate = this.patientForm.get('bornDate')?.value as string;
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
              contactValue: this.patientForm.get('email')?.value as string,
              contactType: ContactType.EMAIL
            },
            {
              contactValue: this.patientForm.get('telephone')?.value as string,
              contactType: ContactType.PHONE_NUMBER
            }
          ],
          address:{
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
      } else {
        this.editablePatient();
      }
    })
  };

  editablePatient() {
    this.isEditMode = true;
    const patient = {
      id: this.patientData.id,
      username: this.patientForm.get('username')?.value as string,
      name: this.patientForm.get('name')?.value as string,
      cpf: this.patientForm.get('cpf')?.value as string,
      bornDate: this.patientForm.get('bornDate')?.value as string,
      gender: this.patientForm.get('gender')?.value as string,
      password: this.patientForm.get('password')?.value as string,
      contact: [
        {
          contactValue: this.patientForm.get('email')?.value as string,
          contactType: ContactType.EMAIL
        },
        {
          contactValue: this.patientForm.get('telephone')?.value as string,
          contactType: ContactType.PHONE_NUMBER
        }
      ],
      address:{
        address: this.patientForm.get('address')?.value as string,
        houseNumber: this.patientForm.get('houseNumber')?.value as string,
        details: this.patientForm.get('details')?.value as string,
        city: this.patientForm.get('city')?.value as string,
        district: this.patientForm.get('district')?.value as string,
        zipCode: this.patientForm.get('zipCode')?.value as string
      }
    };
    this.patientService.updatePatient(patient.id, patient).subscribe(
      (response) => {
        console.log(response);
        this.onSuccess("Paciente atualizado com sucesso.");
      },
      (error) => {
        console.log(error);
        this.onErrror("Não foi possível atualizar pacicente, revise o cadastro!");
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

  convertToUppercase(event: any, controlName: string): void {
    const inputValue = event.target.value.toUpperCase();
    this.patientForm.get(controlName)?.setValue(inputValue);
  }

  private loadPatientData(patient: Patient) {
    this.patientForm.patchValue({
      id: patient.id,
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
