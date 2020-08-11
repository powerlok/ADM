import { Injectable, ErrorHandler } from "@angular/core";
import { AlertService } from "../../../shared/services/alert.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { Observable, of, throwError } from "rxjs";
import { Concorrente } from "../../../shared/models/Concorrente";
import { map, catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class PesqConcorrenteService
{
  private _dbConsult: DbConsultModel;

    constructor(private alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService) {
        this._dbConsult = new DbConsultModel();
    }

    private getJsonExec(nroempresa : number, sequnidade: number, seqcontacorrente: number, action: string): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_concorempresa";
        this._dbConsult.model.package = "pkg_api_produto";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqconcorrente";
        parametro2.valor = seqcontacorrente.toString();
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_nroempresa";
        parametro3.valor = nroempresa.toString();
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_action";
        parametro4.valor = action;
        this._dbConsult.model.parameters.push(parametro4);

        return JSON.stringify(this._dbConsult);
    }

    executar(nroempresa : number, sequnidade: number, seqcontacorrente: number, action: string): Observable<Concorrente[]> {

        this.spinner.show();

        return this.consult.post(this.getJsonExec(nroempresa, sequnidade, seqcontacorrente, action),0)
                   .pipe(map((res: DbConsult) => {
                        let resp : Concorrente[] = res.obj.json as Concorrente[];
                        this.spinner.hide();
                        
                        if(res.error.errorMasseger != null){
                            this.alertService.alertInfinit(res.error.errorMasseger);
                        }

                        return resp;
                    }), 
                    catchError((error: HttpErrorResponse) => {
                        return throwError(error);
                    }));
    }
    
    carregaFornecedores(sequnidade : number) : Observable<object>{
        return this.executar(0, sequnidade, 0, "F")
                   .pipe(map((data :  object) =>  {
                       return data;
                    }));
    }

    carregaConconrrentes(sequnidade : number) : Observable<Concorrente[]>{
        return this.executar(0, sequnidade, 0, "C")
                   .pipe(map((data :  Concorrente[]) =>  {
                       return data;
                    }));
    }

    deletar(seqcontacorrente : number, sequnidade : number, nroempresa : number) : Observable<Concorrente[]>{
        return this.executar(nroempresa, sequnidade, seqcontacorrente, "D");
    }

    salvar(nroempresa : number, sequnidade: number, seqcontacorrente: number) : Observable<Concorrente[]>{
        return  this.executar(nroempresa, sequnidade, seqcontacorrente, "I");       
    }
}