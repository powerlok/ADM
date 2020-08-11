import {  OnInit, Injectable } from "@angular/core";
import { RodarJson } from "../../../shared/models/RodarJson";
import { ImportaDDAItauServiceJson } from "./importa-dda-itau.service.json.js";
import { Observable } from "rxjs";

@Injectable()
export class ImportaDDAItauService implements OnInit {

    constructor(private importaDDAItauServiceJson : ImportaDDAItauServiceJson) { }

    hideSpinner(){
        this.importaDDAItauServiceJson.hideSpinner();
    }
    
    
    execJson(r : RodarJson) : Observable<object> {
       return this.importaDDAItauServiceJson.gerarJson(r)
    }

    ngOnInit() {

    }

}