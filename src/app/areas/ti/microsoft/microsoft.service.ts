
import {map, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Parametro, DbConsultModel, DbConsult } from "../../../shared/models/Service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { Microsoft } from "../../../shared/models/Microsoft";
import { AlertService } from "../../../shared/services/alert.service";
import { Observable, throwError } from "rxjs";
import { SpinnerVisibilityService } from "ng-http-loader";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MicrosoftService {
    private _dbConsult: DbConsultModel;
    private _alertService: AlertService;
    private _tel: Microsoft[];

    constructor(alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService) {
        this._dbConsult = new DbConsultModel();
        this._alertService = alertService;
        this._tel = new Array<Microsoft>();
    }

    //Cria json para enviar informações
    private getJsonCadastro(tel: Microsoft): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_salvarmicrosoft";
        this._dbConsult.model.package = "pkg_api_microsoft";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "prreturn";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro = new Parametro();
        parametro.nome = "pr_seqmicrosoft";
        parametro.valor = (tel.SEQMICROSOFT != null ) ? tel.SEQMICROSOFT.toString() : null; 
        this._dbConsult.model.parameters.push(parametro);

        let parametro2 = new Parametro();
        parametro2.nome = "pr_chapa";
        parametro2.valor = tel.CHAPA;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3 = new Parametro();
        parametro3.nome = "pr_powerbifree";
        parametro3.valor = tel.POWERBIFREE;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4 = new Parametro();
        parametro4.nome = "pr_checkin_pwbf";
        parametro4.valor = (tel.CHECKIN_PWBF != null ) ? tel.CHECKIN_PWBF.toString() : null; 
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5 = new Parametro();
        parametro5.nome = "pr_dtaliberacao_pwbf";
        parametro5.valor = tel.DTALIBERACAO_PWBF;
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6 = new Parametro();
        parametro6.nome = "pr_powerbipro";
        parametro6.valor = tel.POWERBIPRO;
        this._dbConsult.model.parameters.push(parametro6);

        let parametro7 = new Parametro();
        parametro7.nome = "pr_checkin_pwbp";
        parametro7.valor = (tel.CHECKIN_PWBP != null ) ? tel.CHECKIN_PWBP.toString() : null;
        this._dbConsult.model.parameters.push(parametro7);

        let parametro9 = new Parametro();
        parametro9.nome = "pr_dtaliberacao_pwbp";
        parametro9.valor = tel.DTALIBERACAO_PWBP;
        this._dbConsult.model.parameters.push(parametro9);

        let parametro10 = new Parametro();
        parametro10.nome = "pr_exchangekiosk";
        parametro10.valor = tel.EXCHANGEKIOSK;
        this._dbConsult.model.parameters.push(parametro10);

        let parametro11 = new Parametro();
        parametro11.nome = "pr_checkin_ek";
        parametro11.valor = (tel.CHECKIN_EK != null ) ? tel.CHECKIN_EK.toString() : null; 
        this._dbConsult.model.parameters.push(parametro11);

        let parametro12 = new Parametro();
        parametro12.nome = "pr_dtaliberacao_ek";
        parametro12.valor = tel.DTALIBERACAO_EK;
        this._dbConsult.model.parameters.push(parametro12);

        let parametro14 = new Parametro();
        parametro14.nome = "pr_exchengeplano1";
        parametro14.valor = tel.EXCHENGEPLANO1;
        this._dbConsult.model.parameters.push(parametro14);

        let parametro15 = new Parametro();
        parametro15.nome = "pr_checkin_ep1";
        parametro15.valor = (tel.CHECKIN_EP1 != null ) ? tel.CHECKIN_EP1.toString() : null;
        this._dbConsult.model.parameters.push(parametro15);

        let parametro16 = new Parametro();
        parametro16.nome = "pr_dtaliberacao_ep1";
        parametro16.valor = tel.DTALIBERACAO_EP1;
        this._dbConsult.model.parameters.push(parametro16);

        let parametro17 = new Parametro();
        parametro17.nome = "pr_exchengeplano2";
        parametro17.valor = tel.EXCHENGEPLANO2;
        this._dbConsult.model.parameters.push(parametro17);

        let parametro18 = new Parametro();
        parametro18.nome = "pr_checkin_ep2";
        parametro18.valor =  (tel.CHECKIN_EP2 != null ) ? tel.CHECKIN_EP2.toString() : null;  
        this._dbConsult.model.parameters.push(parametro18);

        let parametro19 = new Parametro();
        parametro19.nome = "pr_dtaliberacao_ep2";
        parametro19.valor = tel.DTALIBERACAO_EP2;
        this._dbConsult.model.parameters.push(parametro19);

        let parametro20 = new Parametro();
        parametro20.nome = "pr_sharepointplano2";
        parametro20.valor = tel.SHAREPOINTPLANO2;
        this._dbConsult.model.parameters.push(parametro20);

        let parametro21 = new Parametro();
        parametro21.nome = "pr_checkin_spp2";
        parametro21.valor = (tel.CHECKIN_SPP2 != null ) ? tel.CHECKIN_SPP2.toString() : null;  
        this._dbConsult.model.parameters.push(parametro21);

        let parametro22 = new Parametro();
        parametro22.nome = "pr_dtaliberacao_spp2";
        parametro22.valor = tel.DTALIBERACAO_SPP2;
        this._dbConsult.model.parameters.push(parametro22);

        let parametro23 = new Parametro();
        parametro23.nome = "pr_office365business";
        parametro23.valor = tel.OFFICE365BUSINESS;
        this._dbConsult.model.parameters.push(parametro23);

        let parametro24 = new Parametro();
        parametro24.nome = "pr_checkin_ofb";
        parametro24.valor = (tel.CHECKIN_OFB != null ) ? tel.CHECKIN_OFB.toString() : null;   
        this._dbConsult.model.parameters.push(parametro24);

        let parametro25 = new Parametro();
        parametro25.nome = "pr_dtaliberacao_ofb";
        parametro25.valor = tel.DTALIBERACAO_OFB;
        this._dbConsult.model.parameters.push(parametro25);

        let parametro26 = new Parametro();
        parametro26.nome = "pr_microsoftflowfree";
        parametro26.valor = tel.MICROSOFTFLOWFREE;
        this._dbConsult.model.parameters.push(parametro26);

        let parametro27 = new Parametro();
        parametro27.nome = "pr_checkin_mff";
        parametro27.valor =  (tel.CHECKIN_MFF != null ) ? tel.CHECKIN_MFF.toString() : null;  
        this._dbConsult.model.parameters.push(parametro27);

        let parametro28 = new Parametro();
        parametro28.nome = "pr_dtaliberacao_mff";
        parametro28.valor = tel.DTALIBERACAO_MFF;
        this._dbConsult.model.parameters.push(parametro28);

        let parametro29 = new Parametro();
        parametro29.nome = "pr_microsoftpowerappsp2t";
        parametro29.valor = tel.MICROSOFTPOWERAPPSPLAN2TRIAL;
        this._dbConsult.model.parameters.push(parametro29);

        let parametro30 = new Parametro();
        parametro30.nome = "pr_checkin_mpp2t";
        parametro30.valor = (tel.CHECKIN_MPP2T != null ) ? tel.CHECKIN_MPP2T.toString() : null; 
        this._dbConsult.model.parameters.push(parametro30);

        let parametro31 = new Parametro();
        parametro31.nome = "pr_dtaliberacao_mpp2t";
        parametro31.valor = tel.DTALIBERACAO_MPP2T;
        this._dbConsult.model.parameters.push(parametro31);

        let parametro32 = new Parametro();
        parametro32.nome = "pr_office365extrafilastorafe";
        parametro32.valor = tel.OFFICE365EXTRAFILASTORAFE;
        this._dbConsult.model.parameters.push(parametro32);

        let parametro33 = new Parametro();
        parametro33.nome = "pr_checkin_ofefs";
        parametro33.valor = (tel.CHECKIN_OFEFS != null ) ? tel.CHECKIN_OFEFS.toString() : null;  
        this._dbConsult.model.parameters.push(parametro33);

        let parametro34 = new Parametro();
        parametro34.nome = "pr_dtaliberacao_ofefs";
        parametro34.valor = tel.DTALIBERACAO_OFEFS;
        this._dbConsult.model.parameters.push(parametro34);

        let parametro35 = new Parametro();
        parametro35.nome = "pr_visioonline";
        parametro35.valor = tel.VISIOONLINE;
        this._dbConsult.model.parameters.push(parametro35);

        let parametro36 = new Parametro();
        parametro36.nome = "pr_checkin_vo";
        parametro36.valor = (tel.CHECKIN_VO != null ) ? tel.CHECKIN_VO.toString() : null;  
        this._dbConsult.model.parameters.push(parametro36);

        let parametro37 = new Parametro();
        parametro37.nome = "pr_dtaliberacao_vo";
        parametro37.valor = tel.DTALIBERACAO_VO;
        this._dbConsult.model.parameters.push(parametro37);

        let parametro38 = new Parametro();
        parametro38.nome = "pr_visioonlineplan2";
        parametro38.valor = tel.VISIOONLINEPLAN2;
        this._dbConsult.model.parameters.push(parametro38);

        let parametro39 = new Parametro();
        parametro39.nome = "pr_checkin_vop2";
        parametro39.valor = (tel.CHECKIN_VOP2 != null ) ? tel.CHECKIN_VOP2.toString() : null; 
        this._dbConsult.model.parameters.push(parametro39);

        let parametro40 = new Parametro();
        parametro40.nome = "pr_dtaliberacao_vop2";
        parametro40.valor = tel.DTALIBERACAO_VOP2;
        this._dbConsult.model.parameters.push(parametro40);

        let parametro41 = new Parametro();
        parametro41.nome = "pr_projectonlineprofissional";
        parametro41.valor = tel.PROJECTONLINEPROFISSIONAL;
        this._dbConsult.model.parameters.push(parametro41);

        let parametro42 = new Parametro();
        parametro42.nome = "pr_checkin_pop";
        parametro42.valor = (tel.CHECKIN_POP != null ) ? tel.CHECKIN_POP.toString() : null;
        this._dbConsult.model.parameters.push(parametro42);

        let parametro43 = new Parametro();
        parametro43.nome = "pr_dtaliberacao_pop";
        parametro43.valor = tel.DTALIBERACAO_POP;
        this._dbConsult.model.parameters.push(parametro43);
        
        let parametro44 = new Parametro();
        parametro44.nome = "pr_microsoft365e3";
        parametro44.valor = tel.MICROSOFT365E3;
        this._dbConsult.model.parameters.push(parametro44);

        let parametro45 = new Parametro();
        parametro45.nome = "pr_checkin_m365e3";
        parametro45.valor = (tel.CHECKIN_M365E3 != null ) ? tel.CHECKIN_M365E3.toString() : null;
        this._dbConsult.model.parameters.push(parametro45);

        let parametro46 = new Parametro();
        parametro46.nome = "pr_dtaliberacao_m365e3";
        parametro46.valor = tel.DTALIBERACAO_M365E3;
        this._dbConsult.model.parameters.push(parametro46);

        let parametro47 = new Parametro();
        parametro47.nome = "pr_sequnidade";
        parametro47.valor = (tel.SEQUNIDADE != null ) ? tel.SEQUNIDADE.toString() : null;
        this._dbConsult.model.parameters.push(parametro47);

        return JSON.stringify(this._dbConsult);
    }

    //Salva / Edita
    salvar(tel: Microsoft): Observable<string> { 
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

    getJsonMicrosoft(id: string, chapa: string, sequnidade : number): string {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getMicrosoft";
        this._dbConsult.model.package = "pkg_api_microsoft";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro = new Parametro();
        parametro.nome = "pr_seqmicrosoft";
        parametro.valor = id;
        this._dbConsult.model.parameters.push(parametro);

        let parametro2 = new Parametro();
        parametro2.nome = "pr_chapa";
        parametro2.valor = chapa;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3 = new Parametro();
        parametro3.nome = "pr_sequnidade";
        parametro3.valor =  (sequnidade != null ) ? sequnidade.toString() : '0';
        this._dbConsult.model.parameters.push(parametro3);

        return JSON.stringify(this._dbConsult);
    }

    getJsonValidaChapaVinculadoAMicrosoft(chapa: string, sequnidade : number, codigo : number): string {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_validaChapaExistente";
        this._dbConsult.model.package = "pkg_api_microsoft";
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro2 = new Parametro();
        parametro2.nome = "pr_chapa";
        parametro2.valor = chapa;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3 = new Parametro();
        parametro3.nome = "pr_sequnidade";
        parametro3.valor = (sequnidade != null ) ? sequnidade.toString() : '0';
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4 = new Parametro();
        parametro4.nome = "pr_seqmicrosoft";
        parametro4.valor = codigo.toString();
        this._dbConsult.model.parameters.push(parametro4);

        return JSON.stringify(this._dbConsult);
    }

    validaChapaVinculadoAMicrosoft(chapa: string, sequnidade : number, codigo : number): Observable<any> {

        return this.consult.post(this.getJsonValidaChapaVinculadoAMicrosoft(chapa, sequnidade, codigo), 0).pipe(map((res: DbConsult) => {           
            let numero = res.obj.json;

            if(res.error.errorMasseger != null){
                this._alertService.alertInfinit(res.error.errorMasseger);
            }

            return numero;
        }));

    }

    //Get por Id
    getMicrosoft(id: string, chapa: string, sequnidade : number): Observable<Microsoft[]> {

        return this.consult.post(this.getJsonMicrosoft(id, chapa, sequnidade), 0).pipe(map((res: DbConsult) => {           
            this._tel = res.obj.json as Microsoft[];

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
        this._dbConsult.model.objeto = "p_deleteMicrosoft";
        this._dbConsult.model.package = "pkg_api_microsoft";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro = new Parametro();
        parametro.nome = "pr_seqmicrosoft";
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

    
    private getJsonAuditar(tel: Microsoft): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_auditamicrosoft";
        this._dbConsult.model.package = "pkg_api_microsoft";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "prreturn";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro = new Parametro();
        parametro.nome = "pr_seqmicrosoft";
        parametro.valor = tel.SEQMICROSOFT.toString();
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult);
    }

    setAuditoria(tel: Microsoft): Observable<string> { 
        this.spinner.show();
        
        return this.consult.post(this.getJsonAuditar(tel), 0).pipe(map((res: DbConsult) => {
            let resp = res.obj.json;
            let ret = '';
            
            if (resp != null) {
                let _data = resp.toString().split('|');

                //this._alertService.alert(_data[0]);

                ret = _data[1];
               
            }
            this.spinner.hide();
            return ret;
        }));
    }
}