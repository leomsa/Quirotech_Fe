import {Contact} from "./Contact";
import {Address} from "./Adrress";

export interface Patient {
  username: string;
  name: string;
  cpf: string;
  bornDate: string;
  gender: string;
  contact: Contact[];
  address: Address;
}
