import { SpinnerVisibilityService } from "ng-http-loader";
import { Observable, pipe, of, Subscriber, forkJoin } from "rxjs";
import { Injectable } from "@angular/core";
import {catchError, map, tap} from 'rxjs/operators';
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { AlertService } from "../../../shared/services/alert.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { ProdMonitorado, Embalagem, Custo, Motivo } from "../../../shared/models/Produto";
import { ProdutoService } from "../../../shared/services/produto/produto.service";
import { RodarJson } from "../../../shared/models/RodarJson";
import { CadastroEmpresaDw } from "../../../../app/shared/models/CadastroEmpresaDw";
import { CurrencyFormat } from '../../../../app/shared/util/moeda';

@Injectable()
export class AlteraPrecoService
{
    private _dbConsult: DbConsultModel;

    constructor(private moedaFormat : CurrencyFormat, private alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService, private produtoService: ProdutoService) {
        this._dbConsult = new DbConsultModel();
    }

    getProduto(r : RodarJson) {
        return this.produtoService.buscaProduto(r);
    }

    //monta o json do monitoramento
    private getJsonProdMonitorado(codigo : string, sequnidade : number): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getProdMonitorado";
        this._dbConsult.model.package = "pkg_api_alterapreco";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_codigo";
        parametro.valor = codigo;
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_sequnidade";
        parametro2.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro2);

        return JSON.stringify(this._dbConsult);
    }

     //busca as informações do produto no monitoramento
     getProdutoMonitorado(codigo : string, sequnidade : number): Observable<ProdMonitorado[]> {

        this.spinner.show();
       //console.log(this.getJsonExec(nroempresa, dtaini, dtafim, validacao, tipo, sequnidade));
        return this.consult.post(this.getJsonProdMonitorado(codigo, sequnidade),0).pipe(
            map((res: DbConsult) => {
                let resp : ProdMonitorado[] = res.obj.json as ProdMonitorado[];
                this.spinner.hide();

                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit(res.error.errorMasseger);
                }
                return resp;
            })
        );
    }

    private getJsonGetCidadesPorUnidade(sequnidade : number): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getcidade_unid";
        this._dbConsult.model.package = "pkg_api_alterapreco";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_sequnidade";
        parametro2.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro2);

        return JSON.stringify(this._dbConsult);
    }

     //busca cidades por empresa
     getCidadesPorUnidade(sequnidade : number): Observable<CadastroEmpresaDw[]> {

        this.spinner.show();
       //console.log(this.getJsonExec(nroempresa, dtaini, dtafim, validacao, tipo, sequnidade));
        return this.consult.post(this.getJsonGetCidadesPorUnidade(sequnidade),0).pipe(
            map((res: DbConsult) => {
                let resp : CadastroEmpresaDw[] = res.obj.json as CadastroEmpresaDw[];
                this.spinner.hide();

                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit(res.error.errorMasseger);
                }
                return resp;
            })
        );
    }


    //monta o json da embalagem
    private getJsonEmbalagem(sequnidade : number, seqproduto : number): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "getEmbalagem";
        this._dbConsult.model.package = "pkg_api_alterapreco";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqproduto";
        parametro2.valor = seqproduto.toString();
        this._dbConsult.model.parameters.push(parametro2);


        return JSON.stringify(this._dbConsult);
    }

    //busca as informações da embalagem
    getEmbalagem(sequnidade : number, seqproduto : number): Observable<Embalagem[]> {

        this.spinner.show();
       //console.log(this.getJsonExec(nroempresa, dtaini, dtafim, validacao, tipo, sequnidade));
        return this.consult.post(this.getJsonEmbalagem(sequnidade, seqproduto),0).pipe(
            map((res: DbConsult) => {
                let resp : Embalagem[] = res.obj.json as Embalagem[];
                this.spinner.hide();
                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit('Erro ao carregar a embalagem. Motivo: ' + res.error.errorMasseger);
                }
                return resp;
            })
        );
    }

    //monta o json da custo
    private getJsonCusto(sequnidade : number, seqproduto : number, embalagem : number/*, nroempresa: number*/): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "getCusto";
        this._dbConsult.model.package = "pkg_api_alterapreco";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

      /*  let parametro   = new Parametro();
        parametro.nome  = "pr_nroempresa";
        parametro.valor = nroempresa.toString();
        this._dbConsult.model.parameters.push(parametro);*/

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqproduto";
        parametro2.valor = seqproduto.toString();
        this._dbConsult.model.parameters.push(parametro2);


        let parametro3   = new Parametro();
        parametro3.nome  = "pr_padraoembvenda";
        parametro3.valor = embalagem.toString();
        this._dbConsult.model.parameters.push(parametro3);


        let parametro4   = new Parametro();
        parametro4.nome  = "pr_sequnidade";
        parametro4.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro4);


        return JSON.stringify(this._dbConsult);
    }

    //busca as informações da custo
    getCusto(sequnidade : number, seqproduto : number, embalagem : number/*, nroempresa: number*/): Observable<Custo[]> {
        this.spinner.show();
        return this.consult.post(this.getJsonCusto(sequnidade, seqproduto, embalagem/*, nroempresa*/),0).pipe(
            map((res: DbConsult) => {

            let resp : Custo[] = res.obj.json as Custo[];

             this.spinner.hide();
            if(res.error.errorMasseger != null){
                this.alertService.alertInfinit('Erro ao carregar a custo. Motivo: ' + res.error.errorMasseger);
            }
            return resp;
        }));
    }

        //monta o json com os parametros do produto
        private getJsonFamilia(sequnidade : number, seqfamilia : number,  desc : string): string {

            this._dbConsult.model = new DbConsult();
            this._dbConsult.model.objeto = "p_consultafamilia";
            this._dbConsult.model.package = "pkg_api_produto";
            this._dbConsult.model.tiporetorno = "121";
            this._dbConsult.model.retorno = "r_result";

            this._dbConsult.model.parameters = new Array<Parametro>();

            let parametro   = new Parametro();
            parametro.nome  = "pr_sequnidade";
            parametro.valor = sequnidade.toString();
            this._dbConsult.model.parameters.push(parametro);

            let parametro2   = new Parametro();
            parametro2.nome  = "pr_seqfamilia";
            parametro2.valor = seqfamilia.toString();
            this._dbConsult.model.parameters.push(parametro2);

            let parametro3   = new Parametro();
            parametro3.nome  = "pr_codbusca";
            parametro3.valor = desc;
            this._dbConsult.model.parameters.push(parametro3);

            return JSON.stringify(this._dbConsult);
        }

        //busca as informações referente ao produto
        getFamilia(sequnidade : number, seqfamilia : number,  desc : string): Observable<ProdMonitorado[]> {

            this.spinner.show();

            return this.consult.post(this.getJsonFamilia(sequnidade, seqfamilia, desc),0).pipe(
                map((res: DbConsult) => {
                    let resp : ProdMonitorado[] = res.obj.json as ProdMonitorado[];
                    this.spinner.hide();
                    if(res.error.errorMasseger != null){
                        this.alertService.alertInfinit('Erro ao carregar a familia. Motivo: ' + res.error.errorMasseger);
                    }
                    return resp;
                })
            );
        }

        //monta o json com os parametros do produto
        private getJsonMonitoramento(sequnidade : number): string {

            this._dbConsult.model = new DbConsult();
            this._dbConsult.model.objeto = "p_getMonitorado";
            this._dbConsult.model.package = "pkg_api_alterapreco";
            this._dbConsult.model.tiporetorno = "121";
            this._dbConsult.model.retorno = "r_result";

            this._dbConsult.model.parameters = new Array<Parametro>();

            let parametro   = new Parametro();
            parametro.nome  = "pr_null";
            parametro.valor = '0';
            this._dbConsult.model.parameters.push(parametro);

            let parametro2   = new Parametro();
            parametro2.nome  = "pr_sequnidade";
            parametro2.valor = sequnidade.toString();
            this._dbConsult.model.parameters.push(parametro2);

            return JSON.stringify(this._dbConsult);
        }

        //busca as informações referente aos produtos inseridos no monitoramento
        getMonitoramento(sequnidade : number): Observable<ProdMonitorado[]> {

            this.spinner.show();

            return this.consult.post(this.getJsonMonitoramento(sequnidade),0).pipe(
                map((res: DbConsult) => {
                    let resp : ProdMonitorado[] = res.obj.json as ProdMonitorado[];
                    this.spinner.hide();
                    if(res.error.errorMasseger != null){
                        this.alertService.alertInfinit('Erro ao carregar o grid Monitoramento. Motivo: ' + res.error.errorMasseger);
                    }
                    return resp;
                })
            )
        }


         //monta o json da embalagem
    private getJsonMotivo(sequnidade : number): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "getMotivo";
        this._dbConsult.model.package = "pkg_api_alterapreco";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro);

        return JSON.stringify(this._dbConsult);
    }

    //busca as informações da embalagem
    getMotivo(sequnidade : number): Observable<Motivo[]> {

        this.spinner.show();
       //console.log(this.getJsonExec(nroempresa, dtaini, dtafim, validacao, tipo, sequnidade));
        return this.consult.post(this.getJsonMotivo(sequnidade),0).pipe(
            map((res: DbConsult) => {
                let resp : Motivo[] = res.obj.json as Motivo[];
                this.spinner.hide();
                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit('Erro ao carregar o motivo. Motivo: ' + res.error.errorMasseger);
                }
                return resp;
            })
        );
    }

    //monta o json para salvar as informações
    private getJsonSalvar(seqproduto : number, embalagem : number, preconovo : number, dataagend : string, sequsuario : number, nroempresa : number[], sequnidade : number, familiaprod : number[], motivo : number): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "salvar";
        this._dbConsult.model.package = "pkg_api_alterapreco";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqproduto";
        parametro.valor = seqproduto.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_embalagem";
        parametro2.valor = embalagem.toString();
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_preconovo";
        parametro3.valor = preconovo.toString().replace(".", ",");
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_agendado";
        parametro4.valor = dataagend.toString();
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_sequsuario";
        parametro5.valor = sequsuario.toString();
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6   = new Parametro();
        parametro6.nome  = "pr_nroempresa";
        parametro6.valor = nroempresa.toString();
        this._dbConsult.model.parameters.push(parametro6);

        let parametro7   = new Parametro();
        parametro7.nome  = "pr_sequnidade";
        parametro7.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro7);

        let parametro8   = new Parametro();
        parametro8.nome  = "pr_seqfamiliaprod";
        parametro8.valor = familiaprod.toString();
        this._dbConsult.model.parameters.push(parametro8);

        let parametro9   = new Parametro();
        parametro9.nome  = "pr_motivo";
        parametro9.valor = motivo.toString();
        this._dbConsult.model.parameters.push(parametro9);

        return JSON.stringify(this._dbConsult);
    }

    //salvar as informações
    salvar(seqproduto : number, embalagem : number, preconovo : number, dataagend : string, sequsuario : number, nroempresa : number[], sequnidade : number, familiaprod : number[], motivo : number) : Observable<string> {

        this.spinner.show();
      console.log(this.getJsonSalvar(seqproduto, embalagem, preconovo, dataagend, sequsuario, nroempresa, sequnidade, familiaprod, motivo));
        return this.consult.post(this.getJsonSalvar(seqproduto, embalagem, preconovo, dataagend, sequsuario, nroempresa, sequnidade, familiaprod, motivo),0).pipe(
            map((res: DbConsult) => {

                this.spinner.hide();

                let resp = res.obj.json;
                let ret = '';
                if (resp != null) {
                    let _data = resp.toString().split('|');

                    this.alertService.alert(_data[0]);

                    ret = _data[1];

                }

                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit('Erro ao tentar salvar. Motivo: ' + res.error.errorMasseger);
                }

                return ret;
            })
        );
    }

    salvarVarios(seqproduto : number, embalagem : number, preconovo : number, dataagend : string, sequsuario : number, nroempresa : number[], sequnidade : number, familiaprod : number[], motivo : number) : Observable<any> {
       //console.log(this.getJsonSalvar(seqproduto, embalagem, preconovo, dataagend, sequsuario, nroempresa, sequnidade, familiaprod, motivo));
       return this.consult.post(this.getJsonSalvar(seqproduto, embalagem, preconovo, dataagend, sequsuario, nroempresa, sequnidade, familiaprod, motivo),0);
    }


    public getRequest(requests) {
        for(let res of requests) {
            let r = res as DbConsult;

            let resp : object = r.obj.json as object;

            if(res.error.errorMasseger != null){
                this.alertService.alertInfinit('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                break;

            }else{

                continue;
            }
        }
    }


    private getJsonDeletar(sequnidade : number, seqalteracao : number, seqproduto : number): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "deletar";
        this._dbConsult.model.package = "pkg_api_alterapreco";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "pr_retorno";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqproduto";
        parametro.valor = seqproduto.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_seqalteracao";
        parametro2.valor = seqalteracao.toString();
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_sequnidade";
        parametro3.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro3);

        return JSON.stringify(this._dbConsult);
    }

    //deletar as informações
    deletar(sequnidade : number, seqalteracao : number, seqproduto : number) : Observable<string>
    {
        this.spinner.show();
       //console.log(this.getJsonExec(nroempresa, dtaini, dtafim, validacao, tipo, sequnidade));
        return this.consult.post(this.getJsonDeletar(sequnidade, seqalteracao, seqproduto),0).pipe(
            map((res: DbConsult) => {
                this.spinner.hide();

                let resp = res.obj.json;
                let ret = '';
                if (resp != null) {
                    let _data = resp.toString().split('|');

                    this.alertService.alert(_data[0]);

                    ret = _data[1];

                }

                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit('Erro ao tentar apagar o registro. Motivo: ' +res.error.errorMasseger);
                }

                return ret;
           })
        );
    }
}
