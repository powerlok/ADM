import { Injectable, Inject } from "@angular/core";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { UserService } from "../../../shared/services/user.service";
import { Observable } from "rxjs";
import { SpinnerVisibilityService } from "ng-http-loader";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { AlertService } from "../../../shared/services/alert.service";
import { RodarJson } from "../../../shared/models/RodarJson";
import { JsonBuilder } from "../../../shared/util/jsonBuilder";

@Injectable()
export class CadastroFrotaServiceJson extends JsonBuilder {
    private _dbConsult: DbConsultModel;
    
    constructor(private user : UserService, 
                @Inject(ConsultAPIService) consult : ConsultAPIService, 
                @Inject(SpinnerVisibilityService) spinner: SpinnerVisibilityService, 
                @Inject(AlertService) alertService: AlertService) {
                    
        super(consult, spinner, alertService);
        this._dbConsult = new DbConsultModel();
    }
    
    gerarJson(r: RodarJson): Observable<object>
    {
       r.json = null;
       switch(r.tipo){
          case "EMPRESA":
              r.json = this.getJsonEmpresa(r.obj);
            break;
          case "CADASTROS":
              r.json = this.getJsonCadastros(r.obj);
          break;
          case "RODIZIO":
              r.json = this.getJsonRodizio(r.obj);
          break;
          case "CADRODIZIO":
              r.json = this.getJsonCadastraRodizio(r.obj);
          break;
          case "CADFROTA":
              r.json = this.getJsonCadastraFrota(r.obj);
          break;
          case "DIASEMANA":
              r.json = this.getJsonDiaSemana(r.obj);
          break;
       }

       return this.execJson(r);
    }
  
    getJsonEmpresa(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getGerEmpresa";
        this._dbConsult.model.package = "pkg_Api_Empresa";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = (obj as Number).toString();
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonCadastros(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscafrota";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "prreturn";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = obj[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_placa";
        parametro2.valor = obj[0].placa;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_seqveiculo";
        parametro3.valor = obj[0].seqveiculo;
        this._dbConsult.model.parameters.push(parametro3);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonRodizio(obj : object) {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscarodizio";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqveiculo";
        parametro.valor = obj[0].seqveiculo;
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_data";
        parametro2.valor = obj[0].data;
        this._dbConsult.model.parameters.push(parametro2);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonCadastraRodizio(obj : object) {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_cadrodiziofrota";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqveiculo";
        parametro.valor = obj[0].seqveiculo;
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_uf";
        parametro2.valor = obj[0].uf;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_cidade";
        parametro3.valor = obj[0].cidade;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_status";
        parametro4.valor = obj[0].status;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_dia";
        parametro5.valor = obj[0].dia;
        this._dbConsult.model.parameters.push(parametro5);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonCadastraFrota(obj : object) {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_cadastrofrota";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "pr_seqveiculoout";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_placa";
        parametro.valor = obj[0].placa;
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_modelo";
        parametro2.valor = obj[0].modelo;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_sequnidade";
        parametro3.valor = obj[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_ano";
        parametro4.valor = obj[0].ano;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_empalocacao";
        parametro5.valor = obj[0].empresa;
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6   = new Parametro();
        parametro6.nome  = "pr_status";
        parametro6.valor = obj[0].status;
        this._dbConsult.model.parameters.push(parametro6);

        let parametro7   = new Parametro();
        parametro7.nome  = "pr_sequsucadastro";
        parametro7.valor = this.user.getUserModels().sequsuario.toString();
        this._dbConsult.model.parameters.push(parametro7);

        let parametro8   = new Parametro();
        parametro8.nome  = "pr_seqveiculo";
        parametro8.valor = obj[0].seqveiculo;
        this._dbConsult.model.parameters.push(parametro8);

        let parametro9   = new Parametro();
        parametro9.nome  = "pr_tipoHabilitacao";
        parametro9.valor = obj[0].tipohabilitacao;
        this._dbConsult.model.parameters.push(parametro9);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonDiaSemana(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_diasDaSemana";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "prreturn";

        this._dbConsult.model.parameters = new Array<Parametro>();
       
        let parametro   = new Parametro();
        parametro.nome  = "pr_null";
        parametro.valor = obj[0].null;
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult); 
    }
}