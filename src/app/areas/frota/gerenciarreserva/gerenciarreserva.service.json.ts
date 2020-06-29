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
export class GerenciarReservaFrotaServiceJson  extends JsonBuilder implements OnDestroy {
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
          
          case "BUSCACHECKINCHECKOUT":
            r.json = this.getJsonCheckinCheckout(r.obj);
            break;
          case "EDITARCHECKINCHECKOUT":
            r.json = this.setJsonAlterarCheckinCheckout(r.obj);
            break;
          case "BUSCAITENSCHECKED":
            r.json = this.getJsonBuscaItensChecked(r.obj);
            break;
          case "BUSCAITENSCHECKIN":
            r.json = this.getJsonBuscaItensCheckin(r.obj);
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
                case "SALVARITENSCHECKIN":               
                x.json = this.setJsonItensCheckinCheckout(x.obj);
                break;
            }

            requests.push(this.execJsonPost(x));
        });
  
        return forkJoin(requests)
    }
    
    getJsonCheckinCheckout(obj : object){
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscaCheckinCheckout";
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

    setJsonAlterarCheckinCheckout(obj : object){
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_alteraChekinChekout";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "126";
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

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_tipo";
        parametro4.valor = obj[0].tipo;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_kminicial";
        parametro5.valor = obj[0].kminicial;
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6   = new Parametro();
        parametro6.nome  = "pr_kmfinal";
        parametro6.valor = obj[0].kmfinal;
        this._dbConsult.model.parameters.push(parametro6);

        let parametro7   = new Parametro();
        parametro7.nome  = "pr_estacionamento";
        parametro7.valor = obj[0].estacionamento;
        this._dbConsult.model.parameters.push(parametro7);

        let parametro8   = new Parametro();
        parametro8.nome  = "pr_observacao";
        parametro8.valor = obj[0].observacao;
        this._dbConsult.model.parameters.push(parametro8);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonBuscaItensCheckin(obj : object){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscaItensChekin";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = obj[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult); 
    }

    getJsonBuscaItensChecked(obj : object){
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscaitenschek";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro1   = new Parametro();
        parametro1.nome  = "pr_sequnidade";
        parametro1.valor = obj[0].sequnidade;
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_descricao";
        parametro2.valor = obj[0].descricao;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_seqitem";
        parametro4.valor = obj[0].seqitem;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_status";
        parametro5.valor = obj[0].status;
        this._dbConsult.model.parameters.push(parametro5);

        return JSON.stringify(this._dbConsult); 
    }

    //gravar itens checkin/checkout
    setJsonItensCheckinCheckout(obj : object){
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_itensChekinChekout";
        this._dbConsult.model.package = "pkg_api_transporte";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();
        
        let parametro1   = new Parametro();
        parametro1.nome  = "pr_seqchekinchekout";
        parametro1.valor = obj[0].seqcheckincheckout;
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqitem";
        parametro2.valor = obj[0].seqitem;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_itemok";
        parametro4.valor = obj[0].itemok;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_observacao";
        parametro5.valor = obj[0].observacao;
        this._dbConsult.model.parameters.push(parametro5);

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