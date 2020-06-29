import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { Injectable, Inject } from "@angular/core";
import { JsonBuilder } from "../../../shared/util/jsonBuilder";
import { Observable } from "rxjs";
import { RodarJson } from "../../../shared/models/RodarJson";
import { UserService } from "../../../shared/services/user.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { AlertService } from "../../../shared/services/alert.service";

@Injectable()
export class ListaCheckinFrotaServiceJson  extends JsonBuilder {
    private _dbConsult: DbConsultModel;
    
    constructor(private user : UserService, 
                @Inject(ConsultAPIService) consult : ConsultAPIService, 
                @Inject(SpinnerVisibilityService) spinner: SpinnerVisibilityService, 
                @Inject(AlertService) alertService: AlertService) {
                    
        super(consult, spinner, alertService);
        this._dbConsult = new DbConsultModel();
    }
    
    gerarJson(r: RodarJson): Observable<object>
    {
       r.json = null;
       switch(r.tipo){
          case "CADITEMCHECKIN":
              r.json = this.getJsonCadItemCheckin(r.obj);
            break;
          case "BUSCACHECKINS":
              r.json = this.getJsonBuscaItemCheckin(r.obj);
          break;
       }
       return this.execJson(r);
    }

    getJsonCadItemCheckin(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_caditenschek";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "pr_seqitemresult";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = obj[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "pr_seqitem";
        parametro1.valor = obj[0].seqitem;
        this._dbConsult.model.parameters.push(parametro1);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_descricao";
        parametro3.valor = obj[0].descricao;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_status";
        parametro4.valor = obj[0].status;
        this._dbConsult.model.parameters.push(parametro4);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonBuscaItemCheckin(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscaitenschek";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = obj[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "pr_descricao";
        parametro1.valor = obj[0].descricao;
        this._dbConsult.model.parameters.push(parametro1);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_seqitem";
        parametro3.valor = obj[0].seqitem;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_status";
        parametro4.valor = obj[0].status;
        this._dbConsult.model.parameters.push(parametro4);

        return JSON.stringify(this._dbConsult); 
    }
}