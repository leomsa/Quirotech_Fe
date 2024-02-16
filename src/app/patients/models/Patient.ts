import {Contact} from "./Contact";
import {Address} from "./Adrress";

export interface Patient {
  userName: string;
  name: string;
  cpf: string;
  bornDate: string;
  gender: string;
  contact: Contact[];
  address: Address;
}
