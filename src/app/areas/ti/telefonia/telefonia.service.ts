
import {map, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Parametro, DbConsultModel, DbConsult } from "../../../shared/models/Service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { Telefonia } from "../../../shared/models/Telefonia";
import { AlertService } from "../../../shared/services/alert.service";
import { Observable, throwError } from "rxjs";
import { SpinnerVisibilityService } from "ng-http-loader";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TelefoniaService {
    private _dbConsult: DbConsultModel;
    private _alertService: AlertService;
    private _tel: Telefonia[];

    constructor(alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService) {
        this._dbConsult = new DbConsultModel();
        this._alertService = alertService;
        this._tel = new Array<Telefonia>();
    }

    //Cria json para enviar informações
    private getJsonCadastro(tel: Telefonia): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_salvartelefonia";
        this._dbConsult.model.package = "pkg_api_telefonia";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "prreturn";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro = new Parametro();
        parametro.nome = "pr_seqtelefonia";
        parametro.valor = tel.SEQTELEFONIA.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2 = new Parametro();
        parametro2.nome = "pr_nrolinha";
        parametro2.valor = tel.NROLINHA;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3 = new Parametro();
        parametro3.nome = "pr_aparelho";
        parametro3.valor = tel.APARELHO;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4 = new Parametro();
        parametro4.nome = "pr_imeiaparelho";
        parametro4.valor = tel.IMEIAPARELHO;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5 = new Parametro();
        parametro5.nome = "pr_imeisimcard";
        parametro5.valor = tel.IMEISIMCARD;
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6 = new Parametro();
        parametro6.nome = "pr_planovoz";
        parametro6.valor = tel.PLANOVOZ;
        this._dbConsult.model.parameters.push(parametro6);

        let parametro7 = new Parametro();
        parametro7.nome = "pr_planodados";
        parametro7.valor = tel.PLANODADOS;
        this._dbConsult.model.parameters.push(parametro7);

        let parametro8 = new Parametro();
        parametro8.nome = "pr_chapa";
        parametro8.valor = tel.CHAPA;
        this._dbConsult.model.parameters.push(parametro8);

        let parametro9 = new Parametro();
        parametro9.nome = "pr_sequnidade";
        parametro9.valor = tel.SEQUNIDADE.toString();
        this._dbConsult.model.parameters.push(parametro9);

        let parametro10 = new Parametro();
        parametro10.nome = "pr_dtadevolucao";
        parametro10.valor = tel.DTADEVOLUCAO;
        this._dbConsult.model.parameters.push(parametro10);

        let parametro11 = new Parametro();
        parametro11.nome = "pr_dtaentrega";
        parametro11.valor = tel.DTAENTREGA;
        this._dbConsult.model.parameters.push(parametro11);

        let parametro12 = new Parametro();
        parametro12.nome = "pr_checkin";
        parametro12.valor = (tel.CHECKIN == null) ? '' : tel.CHECKIN.toString();
        this._dbConsult.model.parameters.push(parametro12);

        let parametro13 = new Parametro();
        parametro13.nome = "pr_arquivo";
        parametro13.dbType = 110;
        parametro13.valor = tel.ARQUIVO;
        this._dbConsult.model.parameters.push(parametro13);

        return JSON.stringify(this._dbConsult);
    }

    //Salva / Edita
    salvar(tel: Telefonia): Observable<string> { 
        this.spinner.show();
        return this.consult.post(this.getJsonCadastro(tel), 0).pipe(map((res: DbConsult) => {
            let resp = res.obj.json;
            let ret = '';
            
            if (resp != null) {
                let _data = resp.toString().split('|');

                this._alertService.alert(_data[0]);

                ret = _data[1];
               
            }
            this.spinner.hide();
            return ret;
        }));
    }

    getJsonTelefonia(id: string, chapa: string, sequnidade : number): string {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getTelefonia";
        this._dbConsult.model.package = "pkg_api_telefonia";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro = new Parametro();
        parametro.nome = "pr_seqtelefonia";
        parametro.valor = id;
        this._dbConsult.model.parameters.push(parametro);

        let parametro2 = new Parametro();
        parametro2.nome = "pr_chapa";
        parametro2.valor = chapa;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3 = new Parametro();
        parametro3.nome = "pr_sequnidade";
        parametro3.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro3);

        return JSON.stringify(this._dbConsult);
    }

    getJsonValidaChapaVinculadoATelefonia(chapa: string, sequnidade : number, codigo : number): string {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_validaChapaExistente";
        this._dbConsult.model.package = "pkg_api_telefonia";
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro2 = new Parametro();
        parametro2.nome = "pr_chapa";
        parametro2.valor = chapa;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3 = new Parametro();
        parametro3.nome = "pr_sequnidade";
        parametro3.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4 = new Parametro();
        parametro4.nome = "pr_seqtelefonia";
        parametro4.valor = codigo.toString();
        this._dbConsult.model.parameters.push(parametro4);

        return JSON.stringify(this._dbConsult);
    }

    validaChapaVinculadoATelefonia(chapa: string, sequnidade : number, codigo : number): Observable<any> {

        return this.consult.post(this.getJsonValidaChapaVinculadoATelefonia(chapa, sequnidade, codigo), 0).pipe(map((res: DbConsult) => {           
            let numero = res.obj.json;

            if(res.error.errorMasseger != null){
                this._alertService.alertInfinit(res.error.errorMasseger);
            }

            return numero;
        }));

    }

    //Get por Id
    getTelefonia(id: string, chapa: string, sequnidade : number): Observable<Telefonia[]> {

        return this.consult.post(this.getJsonTelefonia(id, chapa, sequnidade), 0).pipe(map((res: DbConsult) => {           
            this._tel = res.obj.json as Telefonia[];

            if(res.error.errorMasseger != null){
                this._alertService.alertInfinit(res.error.errorMasseger);
            }

            return this._tel;
        }),
        catchError((error: HttpErrorResponse) => {
            return throwError(error);
        }));

    }

    getJsonDeletar(id: string): string {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_deleteTelefonia";
        this._dbConsult.model.package = "pkg_api_telefonia";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro = new Parametro();
        parametro.nome = "pr_seqtelefonia";
        parametro.valor = id;
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult);
    }

    deletar(id): any {
        this.spinner.show();
        return this.consult.post(this.getJsonDeletar(id), 0).pipe(map((res: DbConsult) => {
            let ret = '';
 
            if(res.error.errorMasseger != null){
                this._alertService.alert(res.error.errorMasseger);
            }else{               
                    if (res.obj.json.toString() != '') {
                        let _data = res.obj.json.toString().split('|');
                        
                        this._alertService.alert(_data[0]);

                        ret = _data[1];
                    }
            }
            this.spinner.hide();
            
            return ret;
        }));
    }

    
    private getJsonAuditar(tel: Telefonia): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_auditatelefonia";
        this._dbConsult.model.package = "pkg_api_telefonia";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "prreturn";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro = new Parametro();
        parametro.nome = "pr_seqtelefonia";
        parametro.valor = tel.SEQTELEFONIA.toString();
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult);
    }

    setAuditoria(tel: Telefonia): Observable<string> { 
        this.spinner.show();
        return this.consult.post(this.getJsonAuditar(tel), 0).pipe(map((res: DbConsult) => {
            let resp = res.obj.json;
            let ret = '';
            
            if (resp != null) {
                let _data = resp.toString().split('|');
               
                if(_data[0] != 'ok') this._alertService.alert(_data[0]);

                ret = _data[1];
               
            }
            this.spinner.hide();
            return ret;
        }));
    }
}