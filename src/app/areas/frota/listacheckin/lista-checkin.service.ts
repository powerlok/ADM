import { Injectable } from "@angular/core";
import { OrdenaArray } from "../../../shared/util/ordena-array";
import { Observable } from "rxjs";
import { RodarJson } from "../../../shared/models/RodarJson";
import { ListaCheckinFrotaServiceJson } from "./lista-checkin.service.json";
import { Select } from "../../../shared/models/Components";

@Injectable()
export class ListaCheckinFrotaService {
    
    constructor(private json : ListaCheckinFrotaServiceJson, private ordenaArray : OrdenaArray) {
    }

    getExec(r : RodarJson) : Observable<object> {
        return this.json.gerarJson(r);
    }

    
}