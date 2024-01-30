import {Injectable} from '@angular/core';
import {Patient} from "../models/Patient";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  constructor(private httpClient: HttpClient) {
  }

  private readonly API = 'http://localhost:8080/patient/allpatients';

  listAllPatients() {
    return this.httpClient.get<Patient[]>(this.API);
  }
}
