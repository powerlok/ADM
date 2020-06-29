import { Injectable } from "@angular/core";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { AlertService } from "../../../shared/services/alert.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CadCaixaViewModel } from "../../../shared/models/CadCaixa";

@Injectable()
export class CadastroCaixariaService {
    private _dbConsult: DbConsultModel;

    constructor(private alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService) {
        this._dbConsult = new DbConsultModel();
    }

    private getJsonCadastrar(cadCaixaModel : CadCaixaViewModel): string {
        
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cm_cadastrarCaixa";
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "pr_seqCadCaixaRet";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqCadCaixa";
        parametro.valor = cadCaixaModel.codigo.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_descricao";
        parametro2.valor = cadCaixaModel.descricao.toString();
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_modelo";
        parametro3.valor = cadCaixaModel.modelo.toString();
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_valor";
        parametro4.valor = (Number(cadCaixaModel.valor)) ? cadCaixaModel.valor.toString().replace(".", ",") : "0";
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_acao";
        parametro5.valor = cadCaixaModel.acao.toString();
        this._dbConsult.model.parameters.push(parametro5);

        return JSON.stringify(this._dbConsult);
    }

    private getJsonTodosCadastrar(cadCaixaModel : CadCaixaViewModel): string {
        
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cm_buscaCadCaixas";
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = "0";
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult);
    }

    getJsonAll(cadCaixaModel : CadCaixaViewModel)
    {
        let json : string = null;

       switch(cadCaixaModel.obj){
          case "POST":
             json = this.getJsonCadastrar(cadCaixaModel);
            break;
          case "GET":
             json = this.getJsonTodosCadastrar(cadCaixaModel);
            break;
          case "DELETE":
            // json = this.getJsonTodosCadastrar(cadCaixaModel);
            break;
          case "PUT":
            // json = this.getJsonTodosCadastrar(cadCaixaModel);
            break;       
       }

       return json;
    }

    execJson(cadCaixaModel : CadCaixaViewModel): Observable<object> {
       
        this.spinner.show();
       //console.log(this.getJson(seqproduto,sequnidade, nroempresa, codgeraloper, tipobusca, tipocgo, tipouso, tipocampo));
        return this.consult.post(this.getJsonAll(cadCaixaModel),0).pipe(
            map((res: DbConsult) => {
                let resp : object = res.obj.json as object;
 
                this.spinner.hide();
                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                }

                return resp;
            })
        );
    }

}