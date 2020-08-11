import { Injectable } from "@angular/core";
import { ConsultAPIService } from "../consultapi.service";
import { ProdutoJson } from "./produto.json";
import { Observable } from "rxjs";
import { RodarJson } from "../../models/RodarJson";

@Injectable()
export class ProdutoService {

    constructor(private produtoJson : ProdutoJson) {

    }

    buscaProduto(r : RodarJson) : Observable<object> {
        return this.produtoJson.gerarJson(r);
    }


}
