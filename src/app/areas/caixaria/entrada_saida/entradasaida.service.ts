import { Injectable } from "@angular/core";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { AlertService } from "../../../shared/services/alert.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { Observable, forkJoin, of } from "rxjs";
import { map } from "rxjs/operators";
import { ControleDevCaixa, ControleDvCaixaTotais } from "../../../shared/models/ControleDevCaixa";
import { UserService } from "../../../shared/services/user.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EntradaSaidaCaixaService {
    private _dbConsult: DbConsultModel;

    constructor(private alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService, private user : UserService) {
        this._dbConsult = new DbConsultModel();
    }

    private getJsonBuscaCaixa(buscaCaixa : ControleDevCaixa): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cm_buscaCaixa";
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqcontrole";
        parametro.valor = buscaCaixa.nroControle.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "pr_tipo";
        parametro1.valor =  buscaCaixa.tipo;
        this._dbConsult.model.parameters.push(parametro1);

        return JSON.stringify(this._dbConsult);
    }

    private getJsonBuscaEntradaSaidas(buscaCaixa : ControleDevCaixa): string {

        this._dbConsult.model = new DbConsult();
        if(buscaCaixa.tipo == "E")
        {
           this._dbConsult.model.objeto = "cm_buscaEntradas";
        }else{
           this._dbConsult.model.objeto = "cm_buscaSaidas";
        }
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "p_seq_controle";
        parametro.valor = buscaCaixa.nroControle.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "p_seqfornecedor";
        parametro1.valor =  (buscaCaixa.fornec.codigo > 0) ? buscaCaixa.fornec.codigo.toString() : null;
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "p_dtSaida";
        parametro2.valor = buscaCaixa.dtaLancto;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "p_status";
        parametro3.valor = buscaCaixa.status;
        this._dbConsult.model.parameters.push(parametro3);

        return JSON.stringify(this._dbConsult);
    }

    private getJsonBuscaFornecedor(buscaCaixa : ControleDevCaixa): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cm_buscaFornecedor";
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqfornecedor";
        parametro.valor = buscaCaixa.fornec.codigo.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "pr_cnpj";
        parametro1.valor = buscaCaixa.fornec.cpfcnpj.toString()
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_desc";
        parametro2.valor = buscaCaixa.fornec.fornecedor;
        this._dbConsult.model.parameters.push(parametro2);

        //console.log(JSON.stringify(this._dbConsult));
        return JSON.stringify(this._dbConsult);
    }

    private getJsonBuscaControlePorFornec(buscaCaixa : ControleDevCaixa): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cm_pesqcontrole";
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_desc";
        parametro.valor = buscaCaixa.fornec.fornecedor;
        this._dbConsult.model.parameters.push(parametro);

        let parametro1  = new Parametro();
        parametro1.nome  = "pr_seqfornecedor";
        parametro1.valor = buscaCaixa.fornec.codigo.toString();
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_tipo";
        parametro2.valor = buscaCaixa.tipo;
        this._dbConsult.model.parameters.push(parametro2);
        return JSON.stringify(this._dbConsult);
    }

    private getJsonControleEntrada(buscaCaixa : ControleDevCaixa): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cm_controleentrada";
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "prseqcontroleRet";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "prseqcontrole";
        parametro.valor = buscaCaixa.nroControle.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "prseqfonecedor";
        parametro1.valor = buscaCaixa.fornec.codigo.toString();
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "prsequsuario";
        parametro2.valor = this.user.getUserModels().sequsuario.toString();
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "prsequsuarioalt";
        parametro3.valor = this.user.getUserModels().sequsuario.toString();
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "probservacao";
        parametro4.valor = buscaCaixa.observacao;
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pracao";
        parametro5.valor = buscaCaixa.acao.toString();
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6   = new Parametro();
        parametro6.nome  = "prControleEntrada";
        parametro6.valor = buscaCaixa.nroControle.toString();
        this._dbConsult.model.parameters.push(parametro6);

        return JSON.stringify(this._dbConsult);
    }

    private getJsonControleSaida(buscaCaixa : ControleDevCaixa): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cm_ControleSaida";
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqfornecedor";
        parametro.valor = (buscaCaixa.fornec.codigo > 0) ? buscaCaixa.fornec.codigo.toString() : null;
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "prsequsuario";
        parametro1.valor = this.user.getUserModels().sequsuario.toString();
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "pracao";
        parametro2.valor = buscaCaixa.acao;
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "probservacao";
        parametro3.valor = buscaCaixa.observacao;
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "prseqcontrole";
        parametro4.valor = buscaCaixa.nroControle.toString();
        this._dbConsult.model.parameters.push(parametro4);

        return JSON.stringify(this._dbConsult);
    }

    private getJsonInserirEntraSaida(controleDevCaixa : ControleDevCaixa, totais : ControleDvCaixaTotais): string {

        this._dbConsult.model = new DbConsult();
        if(controleDevCaixa.tipo == "S"){
          this._dbConsult.model.objeto = "cm_inserecaixasaida";
        }else{
          this._dbConsult.model.objeto = "cm_insereDevCaixas";
        }
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "prseqcontroleRet";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "prseqcadcaixa";
        parametro.valor = totais.codigo.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "prseqcontrole";
        parametro1.valor = controleDevCaixa.nroControle.toString();
        this._dbConsult.model.parameters.push(parametro1);

        let parametro2   = new Parametro();
        parametro2.nome  = "prquantidade";
        parametro2.valor = totais.quantidade.toString().replace(",","");
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "prvalor_un";
        parametro3.valor = totais.valor.toString().replace(".",",");
        this._dbConsult.model.parameters.push(parametro3);

        return JSON.stringify(this._dbConsult);
    }

    getJsonCheckSaidas(buscaCaixa : ControleDevCaixa) : string {
        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cm_checkSaidas";
        this._dbConsult.model.package = "pkg_api_controleCaixaria";
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "pr_qtdSaidas";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqfornecedor";
        parametro.valor = (buscaCaixa.fornec.codigo > 0) ? buscaCaixa.fornec.codigo.toString() : null;
        this._dbConsult.model.parameters.push(parametro);

        let parametro1   = new Parametro();
        parametro1.nome  = "pr_seqCadaCaixa";
        parametro1.valor = buscaCaixa.cadcaixa.toString();
        this._dbConsult.model.parameters.push(parametro1);

        return JSON.stringify(this._dbConsult);
    }

    getJsonAll(buscaCaixa : ControleDevCaixa)
    {
        let json : string = null;

       switch(buscaCaixa.obj){
          case "SALVAR":
             //json = this.getJsonCadastrar(buscaCaixa);
            break;
          case "CONTROLE":
              json = this.getJsonBuscaEntradaSaidas(buscaCaixa);
            break;
          case "FORNECEDOR":
              json = this.getJsonBuscaFornecedor(buscaCaixa);
            break;
          case "BUSCACAIXA":
              json = this.getJsonBuscaCaixa(buscaCaixa);
            break;
          case "CONTROLEENTRADA":
              json = this.getJsonControleEntrada(buscaCaixa);
            break;
          case "CONTROLESAIDA":
              json = this.getJsonControleSaida(buscaCaixa);
          break;
          case "CONTROLEPORFORNEC":
              json = this.getJsonBuscaControlePorFornec(buscaCaixa);
          break;
          case "CHECKSAIDAS":
              json = this.getJsonCheckSaidas(buscaCaixa);
          break;
       }

       return json;
    }

    execJson(buscaCaixa : ControleDevCaixa): Observable<object> {
       // this.spinner.show();
     // console.log(this.getJsonAll(buscaCaixa));
        return this.consult.post(this.getJsonAll(buscaCaixa),0).pipe(
            map((res: DbConsult) => {

                let resp : object = res.obj.json as object;

               // this.spinner.hide();
                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                }

                return resp;
            })
        );
    }

    get(url : string): void {

        //console.log(this.getJsonAll(buscaCaixa));
        window.open("/#/admin/" + url, '_blank','"left=0,top=0,toolbar=no,scrollbars=no,resizable=no,width='+screen.availWidth+',height='+screen.availHeight+'"');
    }

    salvarItens(controDevCaixa : ControleDevCaixa) : Observable<boolean> {

        this.spinner.show();

        let requests = [];

        controDevCaixa.totais.forEach(x =>{
          requests.push(this.consult.post(this.getJsonInserirEntraSaida(controDevCaixa, x),0));
        });

        forkJoin(requests).subscribe(results => {
            let e = this.getRequest(results);
            this.alertService.alertInfinit("Processo realizado. Código: " + e[0].resp);
        });

        this.spinner.hide();

        return of(false);
    }

    private getRequest(requests) : object {
        let e : object;
        for(let res of requests) {
            let r = res as DbConsult;
            let resp : object = r.obj.json as object;

            if(res.error.errorMasseger != null){
                this.alertService.alertInfinit('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                e = [{ error :true, resp : resp}];
                break;

            }else{
                e = [{ error :false, resp : resp}];
                continue;
            }
        }

        return e;
    }
}
