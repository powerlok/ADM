import { RodarJson } from "../../../shared/models/RodarJson";
import { Observable, Subscription } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { AlertService } from "../../../shared/services/alert.service";
import { DbConsultModel } from "../../../shared/models/Service";
import { JsonBuilder } from "../../../shared/util/jsonBuilder";
import { UserService } from "../../../shared/services/user.service";
import { DbConsultOldModel } from "../../../shared/models/Service.Old";

@Injectable()
export class ImportaNFseServiceJson  extends JsonBuilder  {
     _dbConsult: DbConsultModel;
    _subscriptions : Array<Subscription> = [];

    constructor(private user : UserService,
                @Inject( ConsultAPIService) consult : ConsultAPIService,
                @Inject(SpinnerVisibilityService) spinner: SpinnerVisibilityService,
                @Inject(AlertService) alertService: AlertService) {

        super(consult, spinner, alertService);
        this._dbConsult = new DbConsultModel();
    }

    hideSpinner(){
        this.spinner.hide();
    }

    gerarJson(r: RodarJson): Observable<object>
    {
       r.json = null;
       switch(r.tipo){
          case "EXECJSON":
              r.json = this.setJsoXMLNfe(r.obj);

            break;

       }

       return this.execJsonPost(r);
    }


    setJsoXMLNfe(obj : object){
        let db = new DbConsultOldModel();
        db.identificador = "ObaApi.Service.Fiscal.Fisc_nfse_Service";
        db.auxService = {
               "codGeralOper": obj[0].cgo,
               "sequnidade"  : obj[0].sequnidade,
               "nroempresa"  : obj[0].nroempresa,
               "codproduto"  : obj[0].seqproduto,
               "usuario"     : this.user.getUserModels().chapa,
               "arquivo"     : "C:/Arquivos_api/" + obj[0].file
        };

         return JSON.stringify(db);
    }

}
