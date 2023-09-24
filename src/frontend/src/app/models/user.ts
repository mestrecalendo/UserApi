import { EscolatidadeType } from "./escolaridade-type";

export class User{
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: Date;
  idEscolaridade: EscolatidadeType;
}
