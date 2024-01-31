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

  listAllPatients() {
    return this.httpClient.get<Patient[]>(this.API);
  }
  listPatientByCpf(cpf: string):Observable<Patient>{
    return this.httpClient.get<Patient>(`${this.API_CPF}/${cpf}`);
  }
}
