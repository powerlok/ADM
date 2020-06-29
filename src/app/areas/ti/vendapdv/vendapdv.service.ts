import { Injectable } from "@angular/core";
import { Parametro, DbConsultModel, DbConsult } from "../../../shared/models/Service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { AlertService } from "../../../shared/services/alert.service";
import { Observable, of } from "rxjs";
import { SpinnerVisibilityService } from "ng-http-loader";
import { ValidVendPdv, Validacao } from "../../../shared/models/ValidacaoVendaPdv";
import { map, take } from 'rxjs/operators';

@Injectable()
export class VendaPdvService {
    private _dbConsult: DbConsultModel;
    
    constructor(private alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService) {
        this._dbConsult = new DbConsultModel();
    }

    private getJsonExec(nroempresa : number[], dtaini: string, dtafim: string, validacao: string, tipo: string, sequnidade : string, coluna: string, diferenca : number): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_atualizar";
        this._dbConsult.model.package = "pkg_api_validacaovendapdv";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_nroempresa";
        parametro.valor = nroempresa.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_dataini";
        parametro2.valor = dtaini;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_datafim";
        parametro3.valor = dtafim;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_validacao";
        parametro4.valor = validacao;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_tipo";
        parametro5.valor = tipo;
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6   = new Parametro();
        parametro6.nome  = "pr_sequnidade";
        parametro6.valor = sequnidade;
        this._dbConsult.model.parameters.push(parametro6);

        let parametro7   = new Parametro();
        parametro7.nome  = "pr_colunas";
        parametro7.valor = coluna;
        this._dbConsult.model.parameters.push(parametro7);

        let parametro8   = new Parametro();
        parametro8.nome  = "pr_diferenca";
        parametro8.valor = (diferenca > 0) ? diferenca.toString().replace(".","").replace(",",".") : "0";
        this._dbConsult.model.parameters.push(parametro8);

        return JSON.stringify(this._dbConsult);
    }

    executar(nroempresa : number[], dtaini: string, dtafim: string, validacao: string, tipo: string, sequnidade : string, coluna: string, diferenca : number): Observable<ValidVendPdv[]> {

        this.spinner.show();
         //console.log(this.getJsonExec(nroempresa, dtaini, dtafim, validacao, tipo, sequnidade, coluna, diferenca));
        return this.consult.post(this.getJsonExec(nroempresa, dtaini, dtafim, validacao, tipo, sequnidade, coluna, diferenca),0).pipe(map((res: DbConsult) => {
            let resp : ValidVendPdv[] = res.obj.json as ValidVendPdv[];
             this.spinner.hide();
            
            if(res.error.errorMasseger != null){
                this.alertService.alertInfinit(res.error.errorMasseger);
            }else{   
                if(tipo != 'P'){
                    if(resp.length > 0){            
                        this.alertService.alertInfinit('Operação realizada com sucesso.');
                    }else{
                        this.alertService.alertInfinit('Operação foi realizada, mas não retornou nenhuma inconsistência.');
                    }      
                }                        
            }

            return resp;
        }));
    }

    private getJsonValidacao(): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getValidacao";
        this._dbConsult.model.package = "pkg_api_validacaovendapdv";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "pr_ret";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_null";
        parametro.valor = '';
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult);
    }

    p_getValidacao(){
        this.spinner.show();
       
        return this.consult.post(this.getJsonValidacao(),0).pipe(map((res: DbConsult) => {
            let resp : Validacao[] = res.obj.json as Validacao[];
             this.spinner.hide();
            
            if(res.error.errorMasseger != null){
                this.alertService.alertInfinit(res.error.errorMasseger);
            }

            return resp;
        }));
    }

}