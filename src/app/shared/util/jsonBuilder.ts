import { ConsultAPIService } from "../services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { DbConsult } from "../models/Service";
import { AlertService } from "../services/alert.service";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { RodarJson } from "../models/RodarJson";
import { HttpRequest } from "@angular/common/http";

export abstract class JsonBuilder {

    constructor(protected consult : ConsultAPIService, 
                protected spinner: SpinnerVisibilityService, 
                protected alertService: AlertService) {
      
    }

    abstract gerarJson(r : RodarJson, tipo : string) : Observable<object>;
       
    protected execJson(r : RodarJson): Observable<object> {
        this.spinner.show(); 

        return this.consult.post(r.json,0).pipe(
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

    protected execJsonUpload(files : Set<File>, caminho : string): { [key: string]: Observable<number> } {
        return this.consult.upload(files, caminho);
    }

    protected execJsonPost(r : RodarJson) : Observable<object> {
        return this.consult.post(r.json, 0);   
    }    
}