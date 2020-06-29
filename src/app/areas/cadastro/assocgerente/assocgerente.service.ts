import { Injectable } from "@angular/core";
import {  DbConsult } from "../../../shared/models/Service";
import { AssocGerenteServiceJson } from "./assocgerente.service.json";
import { Observable } from "rxjs";
import { AlertService } from "../../../shared/services/alert.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { map } from "rxjs/operators";

@Injectable()
export class AssocGerenteService {
    
    constructor(private json : AssocGerenteServiceJson, private alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService) {
    }

    execJson(nromepresa : number): Observable<object> {
       
        this.spinner.show();
       //console.log(this.getJson(seqproduto,sequnidade, nroempresa, codgeraloper, tipobusca, tipocgo, tipouso, tipocampo));
        return this.consult.post(this.json.getJsonEmpresaInformacoes(nromepresa),0).pipe(
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