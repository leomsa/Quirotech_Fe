import {Contact} from "./Contact";
import {Address} from "./Adrress";

export interface Patient {
  _id: string;
  userName: string;
  name: string;
  cpf: string;
  bornDate: string;
  gender: string;
  contact: Contact[];
  address: Address;
}
