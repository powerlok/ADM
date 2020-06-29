import { Injectable } from "@angular/core";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { Observable } from "rxjs";
import { Log, CbPeriodo, ComparaConvCompra } from "../../../shared/models/ConvenioFunc";
import { AlertService } from "../../../shared/services/alert.service";
import { Http } from "@angular/http";
//import { NgProgress } from "@ngx-progressbar/core";
import { SpinnerVisibilityService } from "ng-http-loader";
import { AuthenticationService } from "../../../shared/services/authentication.service";
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class ConvenioFuncService {
    private _dbConsult: DbConsultModel;
    private _consult: ConsultAPIService;

    constructor(private alertService: AlertService/*, progress: NgProgress*/, private consult: ConsultAPIService, private spinner: SpinnerVisibilityService, private auth : AuthenticationService) {
        this._dbConsult = new DbConsultModel();
        this._consult = consult;
    }

    private getJsonConvenioFunc(sequnidade: number, ano: string, mes: string, coligada : string, seqconvenioperiod : string, gerlog : string) {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "executar";
        this._dbConsult.model.package = "pkg_api_integracaoconvfunc";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();
        let parametro1   = new Parametro();
        parametro1.nome  = "pr_sequnidade";
        parametro1.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro1);             

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqconvenioperiod";
        parametro2.valor = seqconvenioperiod;
        this._dbConsult.model.parameters.push(parametro2);
        
        let parametro3   = new Parametro();
        parametro3.nome  = "pr_anocomp";
        parametro3.valor = ano;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_mescomp";
        parametro4.valor = mes;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_codcoligada";
        parametro5.valor = coligada;
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6   = new Parametro();
        parametro6.nome  = "pr_gerlog";
        parametro6.valor = gerlog;
        this._dbConsult.model.parameters.push(parametro6);      
        
        return JSON.stringify(this._dbConsult);
    }

    integrar(sequnidade: number, ano: string, mes: string, coligada : string, seqconvenioperiod : string, gerlog: string): Observable<Log[]> {
        this.spinner.show();
        let json = this.getJsonConvenioFunc(sequnidade, ano, mes, coligada, seqconvenioperiod, gerlog);
    // console.log(json);
        return this._consult.post(json, 0).pipe(
                map((res: DbConsult) => {  
                    if(res.error.errorMasseger != null){
                        this.alertService.alertInfinit(res.error.errorMasseger);
                    }else{
                        if(gerlog == 'N'){
                            this.alertService.alertInfinit('Integração realizada com sucesso.');
                        }else{
                            this.alertService.alertInfinit('Log processado.');
                        }
                    }                
                
                    this.spinner.hide();
                    return res.obj.json as Log[];
                })
            )

    }

    private getJsonPeriodo(sequnidade : number) {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "getPeriodo";
        this._dbConsult.model.package = "pkg_api_integracaoconvfunc";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();
        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro);


        return JSON.stringify(this._dbConsult);
    }

    getPeriodo(sequnidade : number): Observable<CbPeriodo[]> {
       
        this.spinner.show();
        let json = this.getJsonPeriodo(sequnidade);
        
        return this._consult.post(json, 0).pipe(
            map((res: DbConsult) => {
        
                if(res.error.errorMasseger != null){
                    this.alertService.alert(res.error.errorMasseger);
                }
            
                this.spinner.hide();
                return res.obj.json as CbPeriodo[];
            })
        );
    }

    private getComparaConvCompra(sequnidade: number, ano: string, mes: string, coligada : string, seqconvenioperiod : string) : string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "getComparaConvCompra";
        this._dbConsult.model.package = "pkg_api_integracaoconvfunc";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();
        let parametro1   = new Parametro();
        parametro1.nome  = "pr_sequnidade";
        parametro1.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro1);             

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqconvenioperiod";
        parametro2.valor = seqconvenioperiod;
        this._dbConsult.model.parameters.push(parametro2);
        
        let parametro3   = new Parametro();
        parametro3.nome  = "pr_anocomp";
        parametro3.valor = ano;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_mescomp";
        parametro4.valor = mes;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_codcoligada";
        parametro5.valor = coligada;
        this._dbConsult.model.parameters.push(parametro5);
  
        
        return JSON.stringify(this._dbConsult);
    }
    
    getCompConvCompra(sequnidade: number, ano: string, mes: string, coligada : string, seqconvenioperiod : string){
        this.spinner.show();
        let json = this.getComparaConvCompra(sequnidade, ano, mes, coligada, seqconvenioperiod);
        
        return this._consult.post(json, 0).pipe(
            map((res: DbConsult) => {
        
                if(res.error.errorMasseger != null){
                    this.alertService.alert(res.error.errorMasseger);
                }
            
                this.spinner.hide();
                return res.obj.json as ComparaConvCompra[];
            })
        );

    }
}