import { Injectable, Inject } from "@angular/core";
import { DbConsultModel, DbConsult, Parametro } from "../../models/Service";
import { ConsultAPIService } from "../consultapi.service";
import { JsonBuilder } from "../../util/jsonBuilder";
import { RodarJson } from "../../models/RodarJson";
import { Observable } from "rxjs";
import { SpinnerVisibilityService } from "ng-http-loader";
import { AlertService } from "../alert.service";
import { UserService } from "../user.service";

@Injectable()
export class ProdutoJson extends JsonBuilder {
    
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
          case "BUSCAPRODUTO":
            r.json = this.getJsonProdCod(r.obj);
            break;
       }
       return this.execJson(r);
    }

    private getJsonProdCod(r: object): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscaproduto";
        this._dbConsult.model.package = "pkg_api_produto";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = r[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_descricao";
        parametro2.valor = r[0].desc;
        this._dbConsult.model.parameters.push(parametro2);
        
        let parametro3   = new Parametro();
        parametro3.nome  = "pr_seqproduto";
        parametro3.valor = r[0].seqproduto;
        this._dbConsult.model.parameters.push(parametro3);

        return JSON.stringify(this._dbConsult);
    }

}
