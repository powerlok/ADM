import { Injectable } from "@angular/core";
import {  DbConsult } from "../../../shared/models/Service";
import { Observable } from "rxjs";
import { AlertService } from "../../../shared/services/alert.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { map } from "rxjs/operators";
import { CadastroFrotaServiceJson } from "./cadastro.service.json";
import { Select } from "../../../shared/models/Components";
import { OrdenaArray } from "../../../shared/util/ordena-array";
import { RodarJson } from "../../../shared/models/RodarJson";

@Injectable()
export class CadastroFrotaService {
    
    constructor(private json : CadastroFrotaServiceJson, private ordenaArray : OrdenaArray) {
    }

    getExec(r : RodarJson) : Observable<object> {
        return this.json.gerarJson(r);
    }
    
    gerStatus() : Array<Select> {
        let status = new Array<Select>();
        let s = new Select(); s.text = "Disponível"; s.id   = "D";
            status.push(s);
            s = new Select(); s.text = "Indisponível"; s.id = "I";
            status.push(s);
            s = new Select(); s.text = " -- "; s.id = "";
            status.push(s);

        return status.sort((n1, n2) => {
            return this.ordenaArray.naturalCompare(n1.id, n2.id)
          })        
    }

    
}