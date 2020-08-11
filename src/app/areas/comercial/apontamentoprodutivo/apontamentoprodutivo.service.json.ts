import {
  DbConsult,
  Parametro,
  DbConsultModel,
} from "../../../shared/models/Service";
import {
  AppontamentoProdutivo,
  Separador,
  AppontamentoProdutivoForm,
} from "./models/ApontamentoProdutivoList.models";
import { Injectable } from "@angular/core";
import { FormArray } from "@angular/forms";
import { UserService } from "app/shared/services/user.service";
import { format } from 'date-fns'

@Injectable({
  providedIn: 'root',
 })
export class ApontamentoProdutivoServiceJson {
  private _dbConsult: DbConsultModel;

  constructor(private user: UserService) {
    this._dbConsult = new DbConsultModel();
  }

  getSeparadorCampo(produtivos: FormArray[]) {
    let separadores = [];

    produtivos.map((campo: any) => {
    //  console.log(campo);
      let separador = campo.separador as Separador;

      separadores.push(separador.SEQSEPARADOR);
    });

    return separadores;
  }

  setJsonCadastro(tel: AppontamentoProdutivoForm): string {
    tel.SEPARADORES = this.getSeparadorCampo(tel.PRODUTIVOS);

    this._dbConsult.model = new DbConsult();
    this._dbConsult.model.objeto = "p_salvar_apontamentoprodutivo";
    this._dbConsult.model.package = "pkg_api_apontamentoprodutivo";
    this._dbConsult.model.tiporetorno = "121";
    this._dbConsult.model.retorno = "r_result";

    this._dbConsult.model.parameters = new Array<Parametro>();

    let parametro = new Parametro();
    parametro.nome = "pr_nroempresa";
    parametro.valor = tel.NROEMPRESA != null ? tel.NROEMPRESA.toString() : null;
    this._dbConsult.model.parameters.push(parametro);

    /*let parametro2 = new Parametro();
    parametro2.nome = "pr_nrocarga";
    parametro2.valor = tel.NROCARGA != null ? tel.NROCARGA.toString() : null;
    this._dbConsult.model.parameters.push(parametro2);*/

    let parametro3 = new Parametro();
    parametro3.nome = "pr_seqapontamento";
    parametro3.valor = tel.SEQAPONTAMENTO != null ? tel.SEQAPONTAMENTO.toString() : "0";
    this._dbConsult.model.parameters.push(parametro3);

    let parametro4 = new Parametro();
    parametro4.nome = "pr_seqseparadores";
    parametro4.valor = tel.SEPARADORES != null ? tel.SEPARADORES.join(",") : null;
    this._dbConsult.model.parameters.push(parametro4);

    let parametro5 = new Parametro();
    parametro5.nome = "pr_seqcd";
    parametro5.valor = tel.NROCD != null ? tel.NROCD.toString() : null;
    this._dbConsult.model.parameters.push(parametro5);

    let parametro6 = new Parametro();
    parametro6.nome = "pr_sequsuario";
    parametro6.valor =
      this.user.getUserModels().sequsuario != null
        ? this.user.getUserModels().sequsuario.toString()
        : null;
    this._dbConsult.model.parameters.push(parametro6);

    return JSON.stringify(this._dbConsult);
  }

  setJsonDeletar(id: string): string {
    this._dbConsult.model = new DbConsult();
    this._dbConsult.model.objeto = "p_delete_apontamentoprodutivo";
    this._dbConsult.model.package = "pkg_api_apontamentoprodutivo";
    this._dbConsult.model.tiporetorno = "121";
    this._dbConsult.model.retorno = "r_result";

    this._dbConsult.model.parameters = new Array<Parametro>();

    let parametro = new Parametro();
    parametro.nome = "pr_seqapontamento";
    parametro.valor = id;
    this._dbConsult.model.parameters.push(parametro);

    return JSON.stringify(this._dbConsult);
  }

  setJsonApontamentoProdutivo(
    nrocd: number,
  //  nroempresa: number,
    data: string
  ): string {
    this._dbConsult.model = new DbConsult();
    this._dbConsult.model.objeto = "p_buscarapontamentoprodgeral";
    this._dbConsult.model.package = "pkg_api_apontamentoprodutivo";
    this._dbConsult.model.tiporetorno = "121";
    this._dbConsult.model.retorno = "r_result";

    this._dbConsult.model.parameters = new Array<Parametro>();

    let parametro = new Parametro();
    parametro.nome = "pr_nrocd";
    parametro.valor = nrocd;
    this._dbConsult.model.parameters.push(parametro);

    /*let parametro2 = new Parametro();
    parametro2.nome = "pr_nroempresa";
    parametro2.valor = nroempresa;
    this._dbConsult.model.parameters.push(parametro2);*/

    let parametro3 = new Parametro();
    parametro3.nome = "pr_data";
    parametro3.valor = format(new Date(data), 'dd/MM/yyyy');
    this._dbConsult.model.parameters.push(parametro3);

    return JSON.stringify(this._dbConsult);
  }

  setJsonApontamentoProdutivoId(
    seqapontamento: number
  ): string {
    this._dbConsult.model = new DbConsult();
    this._dbConsult.model.objeto = "p_buscarapontamentoprodid";
    this._dbConsult.model.package = "pkg_api_apontamentoprodutivo";
    this._dbConsult.model.tiporetorno = "121";
    this._dbConsult.model.retorno = "r_result";

    this._dbConsult.model.parameters = new Array<Parametro>();

    let parametro = new Parametro();
    parametro.nome = "pr_seqapontamento";
    parametro.valor = seqapontamento;
    this._dbConsult.model.parameters.push(parametro);

    return JSON.stringify(this._dbConsult);
  }

  setJsonApontamentoProdutivoSepId(
    seqapontamento: number
  ): string {
    this._dbConsult.model = new DbConsult();
    this._dbConsult.model.objeto = "p_buscarapontamentoprodsepid";
    this._dbConsult.model.package = "pkg_api_apontamentoprodutivo";
    this._dbConsult.model.tiporetorno = "121";
    this._dbConsult.model.retorno = "r_result";

    this._dbConsult.model.parameters = new Array<Parametro>();

    let parametro = new Parametro();
    parametro.nome = "pr_seqapontamento";
    parametro.valor = seqapontamento;
    this._dbConsult.model.parameters.push(parametro);

    return JSON.stringify(this._dbConsult);
  }

  setJsonBuscaSeparador(cd: number): string {
    this._dbConsult.model = new DbConsult();
    this._dbConsult.model.objeto = "p_buscaseparador";
    this._dbConsult.model.package = "pkg_api_apontamentoprodutivo";
    this._dbConsult.model.tiporetorno = "121";
    this._dbConsult.model.retorno = "r_result";

    this._dbConsult.model.parameters = new Array<Parametro>();
    let parametro = new Parametro();
    parametro.nome = "pr_nrocd";
    parametro.valor = cd;
    this._dbConsult.model.parameters.push(parametro);

    return JSON.stringify(this._dbConsult);
  }
}
