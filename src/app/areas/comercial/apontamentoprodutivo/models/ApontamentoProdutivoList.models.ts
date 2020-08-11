import { FormArray } from '@angular/forms';

export class AppontamentoProdutivo {
  SEQAPONTAMENTO: number;
  NROEMPRESA: number;
  //NROCARGA: number;
  DTACADASTRO: string;
  DTAALTERACAO: string;
  SEQUSUARIOALTERACAO: number;
  SEPARADORES: Separador[];
  NROCD: number;
  STATUS: string;
  QTD: number;
}

export class AppontamentoProdutivoForm extends AppontamentoProdutivo {
  SEQAPONTAMENTO: number;
  NROEMPRESA: number;
  //NROCARGA: number;
  DTACADASTRO: string;
  DTAALTERACAO: string;
  SEQUSUARIOALTERACAO: number;
  SEPARADORES: Separador[];
  NROCD: number;
  PRODUTIVOS: FormArray[];
}

export class Separador {
  SEQSEPARADOR: number;
  SEPARADOR: string;
}

