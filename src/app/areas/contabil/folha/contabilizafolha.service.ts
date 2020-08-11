import { Injectable } from "@angular/core";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { Observable } from "rxjs";
import { Log } from "../../../shared/models/ContabilizacaoFolha";
import { AlertService } from "../../../shared/services/alert.service";
import {catchError, map, tap} from 'rxjs/operators';
import { NgProgress } from "ngx-progressbar";
import { SpinnerVisibilityService } from "ng-http-loader";

@Injectable()
export class ContabilizacaoService {
    private _dbConsult: DbConsultModel;

    constructor(private alertService: AlertService, private consult: ConsultAPIService, private spinner: SpinnerVisibilityService) {
        this._dbConsult = new DbConsultModel();
    }

    private getJsonContabilizacaoFolha(sequnidade: number, ano: number, mes: number, recontabiliza: string, matriz: number, coligada : number, log : string) {


        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_Contabilza";
        this._dbConsult.model.package = "pkg_api_contabilizafolha";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();
        let parametro = new Parametro();
        parametro.nome = "pr_ano";
        parametro.valor = ano.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2 = new Parametro();
        parametro2.nome = "pr_mes";
        parametro2.valor = mes.toString();
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3 = new Parametro();
        parametro3.nome = "pr_recontabiliza";
        parametro3.valor = recontabiliza.toString();
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4 = new Parametro();
        parametro4.nome = "pr_sequnidade";
        parametro4.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5 = new Parametro();
        parametro5.nome = "pr_matriz";
        parametro5.valor = matriz.toString();
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6 = new Parametro();
        parametro6.nome = "pr_codcoligada";
        parametro6.valor = coligada.toString();
        this._dbConsult.model.parameters.push(parametro6);

        let parametro7 = new Parametro();
        parametro7.nome = "pr_log";
        parametro7.valor = log;
        this._dbConsult.model.parameters.push(parametro7);


        return JSON.stringify(this._dbConsult);
    }

    contabilizarFolha(sequnidade: number, ano: number, mes: number, recontabiliza: string, matriz: number, coligada : number, log : string): Observable<object> {
        this.spinner.show();
        let json = this.getJsonContabilizacaoFolha(sequnidade, ano, mes, recontabiliza, matriz, coligada, log);
//console.log(json);
       return this.consult.post(json, 0).pipe(
            map((res: DbConsult) => {                
                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit(res.error.errorMasseger);
                }else{
                    if(log == 'N'){
                        this.alertService.alertInfinit('Contabilização realizada com sucesso.');
                    }else{
                        this.alertService.alert('Log processado.');
                    }
                    
                }
            
            
                this.spinner.hide();
                return res.obj.json;
           })
        );

    }
}