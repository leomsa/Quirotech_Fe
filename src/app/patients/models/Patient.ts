import {Contact} from "./Contact";
import {Address} from "./Adrress";

export interface Patient {
  id?: string;
  username: string;
  name: string;
  cpf: string;
  bornDate: string;
  gender: string;
  password: string;
  contact: Contact[];
  address: Address;
}
