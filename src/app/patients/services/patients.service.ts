import {Injectable} from '@angular/core';
import {Patient} from "../models/Patient";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  constructor(private httpClient: HttpClient) {
  }

  private readonly API = 'http://localhost:8080/patient/allpatients';
  private readonly API_CPF = 'http://localhost:8080/patient/user';
  private readonly API_CREATE = 'http://localhost:8080/patient/create';
  private readonly API_DELETE = 'http://localhost:8080/patient/delete';
  private readonly API_UPDATE = 'http://localhost:8080/patient/update';

  listAllPatients() {
    return this.httpClient.get<Patient[]>(this.API);
  }
  listPatientByCpf(cpf: string):Observable<Patient>{
    const url = `${this.API_CPF}?cpf=${cpf}`;
    return this.httpClient.get<Patient>(url);
  }
createPatient(patient: Patient): Observable<Patient>{
    return this.httpClient.post<Patient>(this.API_CREATE, patient);
  }
  deletePatient(cpf: string): Observable<any>{
    const url = `${this.API_DELETE}?cpf=${cpf}`;
    return this.httpClient.delete(url);
  }

  updatePatient(id: string | undefined, patient: Patient): Observable<Patient>{
    const url = `${this.API_UPDATE}?id=${id}`;
    return this.httpClient.put<Patient>(url, patient);
  }
}
