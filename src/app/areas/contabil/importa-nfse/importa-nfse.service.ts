import {  OnInit, Injectable } from "@angular/core";
import { RodarJson } from "../../../shared/models/RodarJson";
import { ProdutoService } from "../../../shared/services/produto/produto.service";
import { ImportaNFseServiceJson } from "./importa-nfse.service.json";
import { Observable } from "rxjs";

@Injectable()
export class ImportaNfseService implements OnInit {

    constructor(private produtoService : ProdutoService, private importaNFseServiceJson : ImportaNFseServiceJson) { }

    hideSpinner(){
        this.importaNFseServiceJson.hideSpinner();
    }
    
    getProduto(r : RodarJson) {
        return this.produtoService.buscaProduto(r);
    }

    execJson(r : RodarJson) : Observable<object> {
       return this.importaNFseServiceJson.gerarJson(r)
    }

    ngOnInit() {

    }

}