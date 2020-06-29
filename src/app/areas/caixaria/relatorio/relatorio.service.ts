import { Injectable } from "@angular/core";
import { AlertService } from "../../../shared/services/alert.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { UserService } from "../../../shared/services/user.service";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class RelatorioCaixaService {
    private _dbConsult: DbConsultModel;
    
    constructor(private alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService, private user : UserService) {
        this._dbConsult = new DbConsultModel();
    }

   private getJsonBuscaCaixa(codfornec : number, datainicio : string, datafim : string, tipo : string): string {
        
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cm_relatorio";
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqfornecedor";
        parametro.valor = (codfornec.toString() != "") ? codfornec.toString() : null;
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "pr_datainicio";
        parametro1.valor =  datainicio;
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_dataFim";
        parametro2.valor =  datafim;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_tipo";
        parametro3.valor =  tipo;
        this._dbConsult.model.parameters.push(parametro3);

        return JSON.stringify(this._dbConsult);
    }

    execJson(codfornec : number, datainicio : string, datafim : string, tipo : string): Observable<object> {       
        this.spinner.show();
        //console.log(this.getJsonBuscaCaixa(codfornec, datainicio, datafim, tipo));
        return this.consult.post(this.getJsonBuscaCaixa(codfornec, datainicio, datafim, tipo),0).pipe(
            map((res: DbConsult) => {
                let resp : object = res.obj.json as object;
// console.log(resp);
                this.spinner.hide();
                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                }

                return resp;
            })
        );
    }
}