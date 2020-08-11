import { Injectable } from "@angular/core";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";

@Injectable()
export class AssocGerenteServiceJson {
    private _dbConsult: DbConsultModel;
    
    constructor() {
        this._dbConsult = new DbConsultModel();

    }

    getJsonEmpresaInformacoes(nroempresa : number){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getcadastroempresadw";
        this._dbConsult.model.package = "PKG_API_DWCADASTRO";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_retorno";
        parametro.valor = nroempresa.toString();
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult); 
    }
}