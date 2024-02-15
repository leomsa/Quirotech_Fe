import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientsService } from "../../../patients/services/patients.service";

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
    private formBuilder: FormBuilder
  ) {}

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
      contact: this.formBuilder.array([
        this.formBuilder.group({
          contactValue: ['', [Validators.required, Validators.email]],
          contactType: ['EMAIL ']
        }),
        this.formBuilder.group({
          contactValue: ['', Validators.required],
          contactType: ['PHONE_NUMBER']
        })
      ]),
      address: this.formBuilder.group({
        address: ['', Validators.required],
        houseNumber: ['', Validators.required],
        details: [''],
        city: ['', Validators.required],
        district: ['', Validators.required],
        zipCode: ['', Validators.required]
      })
    });
  }

  submitForm(): void {
    if (this.patientForm.valid) {
      const formData = this.patientForm.value;
      this.patientService.createPatient(formData).subscribe(
        (response) => {
          console.log('Paciente criado com sucesso:', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Erro ao criar paciente:', error);
        }
      );
    }
  }
}
