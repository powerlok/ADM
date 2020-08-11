import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { Injectable, Inject, OnDestroy } from "@angular/core";
import { JsonBuilder } from "../../../shared/util/jsonBuilder";
import { Observable, forkJoin, Subscription, of } from "rxjs";
import { RodarJson } from "../../../shared/models/RodarJson";
import { UserService } from "../../../shared/services/user.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { AlertService } from "../../../shared/services/alert.service";

@Injectable()
export class ReservaFrotaServiceJson  extends JsonBuilder implements OnDestroy {
    private _dbConsult: DbConsultModel;
    _subscriptions : Array<Subscription> = [];

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
          case "BUSCARESERVAS":
              r.json = this.getJsonBuscaReservas(r.obj);
            break;
          case "BUSCAFROTADISP": 
              r.json = this.getJsonBuscaFrotaDisp(r.obj);
            break;
          case "RESERVAFROTA": 
              r.json = this.setJsonReservaFrota(r.obj);
            break;  
          case "BUSCAUSUARIO":
              r.json = this.getJsonBuscaUsuario(r.obj);
            break;
          case "BUSCADESTINORESERVAS": 
              r.json = this.getJsonBuscaDestinoReservas(r.obj);
            break;
          case "DELETELOCALGRID":
              r.json = this.setJsonReservDestino(r.obj);
            break;
       }
       return this.execJson(r);
    }

    gerarJsonMult(r: RodarJson[]): Observable<object>
    {
        let requests = [];

        r.forEach(x => {
        x.json = null;
            switch(x.tipo){
                case "RESERVADESITINO":               
                x.json = this.setJsonReservDestino(x.obj);
                break;
            }

            requests.push(this.execJsonPost(x));
        });
  
        return forkJoin(requests)
    }
    
    setJsonReservaFrota(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_reservafrota";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqreserva";
        parametro.valor = obj[0].seqreserva;
        this._dbConsult.model.parameters.push(parametro);
        
        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqveiculo";
        parametro2.valor = obj[0].seqveiculo;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_sequsuario";
        parametro3.valor = (obj[0].tipo == 'T') ? obj[0].sequsuario : this.user.getUserModels().sequsuario.toString();
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4  = new Parametro();
        parametro4.nome  = "pr_chapacondutor";
        parametro4.valor = (obj[0].tipo == 'T') ? obj[0].chapa : this.user.getUserModels().chapa;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_origem";
        parametro5.valor = obj[0].origem;
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6   = new Parametro();
        parametro6.nome  = "pr_datareserva";
        parametro6.valor = obj[0].datareserv;
        this._dbConsult.model.parameters.push(parametro6);

        let parametro7   = new Parametro();
        parametro7.nome  = "pr_horainicio";
        parametro7.valor = obj[0].horainicial;
        this._dbConsult.model.parameters.push(parametro7);

        let parametro8   = new Parametro();
        parametro8.nome  = "pr_horafim";
        parametro8.valor = obj[0].horafim;
        this._dbConsult.model.parameters.push(parametro8);

        let parametro9   = new Parametro();
        parametro9.nome  = "pr_observacao";
        parametro9.valor = obj[0].observacao;
        this._dbConsult.model.parameters.push(parametro9);

        let parametro10   = new Parametro();
        parametro10.nome  = "pr_sequnidade";
        parametro10.valor = obj[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro10);

        let parametro11   = new Parametro();
        parametro11.nome  = "pr_status";
        parametro11.valor = obj[0].status;
        this._dbConsult.model.parameters.push(parametro11);

        let parametro12   = new Parametro();
        parametro12.nome  = "pr_sequsuAlteracao";
        parametro12.valor = this.user.getUserModels().sequsuario.toString();
        this._dbConsult.model.parameters.push(parametro12);

        return JSON.stringify(this._dbConsult); 
    }

    setJsonReservDestino(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_ReservaDestino";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_acao";
        parametro.valor = obj[0].acao;
        this._dbConsult.model.parameters.push(parametro);
        
        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqreserva";
        parametro2.valor = obj[0].seqreserva;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_nroempresa";
        parametro3.valor = obj[0].nroempresa;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4  = new Parametro();
        parametro4.nome  = "pr_nomereduzido";
        parametro4.valor = obj[0].nomereduzido;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_sequnidade";
        parametro5.valor = obj[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro5);
     
        return JSON.stringify(this._dbConsult); 
    }

    getJsonBuscaReservas(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscaReservas";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequsuario";
        parametro.valor = (obj[0].tipo == 'T') ? null : this.user.getUserModels().sequsuario.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "pr_status";
        parametro1.valor = obj[0].status;
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqreserva";
        parametro2.valor = obj[0].seqreserva;
        this._dbConsult.model.parameters.push(parametro2);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonBuscaDestinoReservas(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscaDestinoReserva";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqReserva";
        parametro.valor = obj[0].seqreserva;
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonBuscaFrotaDisp(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscafrotaDisponivel";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = obj[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro);
        
        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqreserva";
        parametro2.valor = obj[0].seqreserva;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_placa";
        parametro3.valor = obj[0].placa;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4  = new Parametro();
        parametro4.nome  = "pr_seqveiculo";
        parametro4.valor = obj[0].seqveiculo;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_horainicio";
        parametro5.valor = obj[0].data + ' ' + obj[0].horainicio;
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6   = new Parametro();
        parametro6.nome  = "pr_horafim";
        parametro6.valor = obj[0].data + ' ' + obj[0].horafim;
        this._dbConsult.model.parameters.push(parametro6);

        return JSON.stringify(this._dbConsult); 
    } 
    
    getJsonBuscaUsuario(obj : object){
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getuserall";
        this._dbConsult.model.package = "pkg_api_usuario";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_param";
        parametro.valor = obj[0].param;
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult); 
    }

    ngOnDestroy(){
        this._subscriptions.forEach(x => {
          if(x){
            x.unsubscribe();
          }
        });
    }

}