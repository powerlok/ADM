
import {map} from 'rxjs/operators';
import { DbConsult, Parametro, DbConsultModel } from "../../../shared/models/Service";
import { FuncGrid, Funcionario } from "../../../shared/models/Funcionario";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlertService } from "../../../shared/services/alert.service";

@Injectable()
export class PesquisaService {
    public _funGrid : FuncGrid[];
    private _dbConsult: DbConsultModel;


    constructor(private consult : ConsultAPIService, private alertService: AlertService) {
        this._dbConsult = new DbConsultModel();   
    }

    getFornecItens(chapa) : Observable<Array<FuncGrid>> {        
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getfuncdw";
        this._dbConsult.model.package = "pkg_api_usuario";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        let parametro = new Parametro();
        parametro.nome = "pr_chapa";
        parametro.valor = chapa.toUpperCase();

        this._dbConsult.model.parameters = new Array<Parametro>();
        this._dbConsult.model.parameters.push(parametro);
        return this.consult.post(JSON.stringify(this._dbConsult), 0).pipe(map((res: DbConsult) => {
            let data = res.obj.json as Funcionario[];
        
            if(res.error.errorMasseger != null){
                this.alertService.alertInfinit(res.error.errorMasseger);
            }else{

                this._funGrid = new Array<FuncGrid>();
                 data.map(func => {
                    let funcGrid = new FuncGrid();
                        funcGrid.unidade = func.UNIDADE,
                        funcGrid.nome    = func.NOME;
                        funcGrid.empresa = func.FILIAL,
                        funcGrid.chapa   = func.CHAPA,
                        funcGrid.cargo   = func.FUNCAO,
                        funcGrid.depto   = func.SESSAO,
                        funcGrid.usercomp = '';
                        funcGrid.situacao = func.SITUACAO;   
                        
                        this._funGrid.push(funcGrid);                      
                });     
            }   
            return this._funGrid;
        }));  
    }
}
