import { EscolatidadeType } from "./escolaridade-type";

export class User{
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: Date;
  idEscolaridade: EscolatidadeType;
}
