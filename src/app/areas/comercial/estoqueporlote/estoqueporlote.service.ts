
import { SpinnerVisibilityService } from "ng-http-loader";
import { Observable, forkJoin, of, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable, OnDestroy } from "@angular/core";
import 'rxjs/add/operator/switchMap';
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { AlertService } from "../../../shared/services/alert.service";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { MovEstoqueLote } from "../../../shared/models/MovEstoqueLote";
import { Empresa } from "../../../shared/models/Empresa";
import { Unidade } from "../../../shared/models/Unidade";
import { Select } from "../../../shared/models/Components";
import { Lote } from "../../../shared/models/Produto";
import { UserService } from "../../../shared/services/user.service";
import { RodarJson } from "../../../shared/models/RodarJson";
import { ProdutoService } from "../../../shared/services/produto/produto.service";

@Injectable()
export class EstoquePorLoteService implements OnDestroy{
    private _dbConsult: DbConsultModel;
    private _subscriptions : Array<Subscription> = [];
    constructor(private alertService: AlertService, private consult : ConsultAPIService, private spinner: SpinnerVisibilityService, private user : UserService, private produtoService: ProdutoService) {
        this._dbConsult = new DbConsultModel();
    }

    getProduto(r : RodarJson) { console.log(r);
        return this.produtoService.buscaProduto(r);
    }

    private getJsonLocal(sequnidade : number, nroempresa : number): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_buscalocal";
        this._dbConsult.model.package = "pkg_cm_movtocentral";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_sequnidade";
        parametro.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_nroempresa";
        parametro2.valor = nroempresa.toString();
        this._dbConsult.model.parameters.push(parametro2);

        return JSON.stringify(this._dbConsult);
    }

    private getJsonCGOMotivo(sequnidade : number, codgeraloper : string, tipobusca : string, tipouso: string, tipocgo : string): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_getCgo_c5";
        this._dbConsult.model.package = "pkg_cm_movtocentral";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_codgeraloper";
        parametro.valor = codgeraloper;
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_sequnidade";
        parametro2.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "pr_tipobusca";
        parametro3.valor = tipobusca.toString();
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "pr_tipuso";
        parametro4.valor = tipouso.toString();
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "pr_tipocgo";
        parametro5.valor = tipocgo.toString();
        this._dbConsult.model.parameters.push(parametro5);

        return JSON.stringify(this._dbConsult);
    }

    private getJsonSalvar(seqproduto : number, lote : number, nroempresa : number, dtamovto: string, tipolancto : string, local : number, cgo : number, qtdlancto : number, justificativa : string, qtdembalagem : number, motivo : number, seqgermov: string): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cmp_GerMovObaAuxEstoque";
        this._dbConsult.model.package = "pkg_cm_movtocentral";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "seqproduto";
        parametro.valor = seqproduto.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "prseqlote";
        parametro2.valor = lote.toString();
        this._dbConsult.model.parameters.push(parametro2);

        let parametro3   = new Parametro();
        parametro3.nome  = "prnroempresa";
        parametro3.valor = nroempresa.toString();
        this._dbConsult.model.parameters.push(parametro3);

        let parametro4   = new Parametro();
        parametro4.nome  = "prdtaMovto";
        parametro4.valor = dtamovto.toString();
        this._dbConsult.model.parameters.push(parametro4);

        let parametro5   = new Parametro();
        parametro5.nome  = "prTipLancto";
        parametro5.valor = tipolancto.toString();
        this._dbConsult.model.parameters.push(parametro5);

        let parametro6   = new Parametro();
        parametro6.nome  = "prLocal";
        parametro6.valor = local.toString();
        this._dbConsult.model.parameters.push(parametro6);

        let parametro7   = new Parametro();
        parametro7.nome  = "prCodgeraloper";
        parametro7.valor = cgo.toString();
        this._dbConsult.model.parameters.push(parametro7);

        let parametro8   = new Parametro();
        parametro8.nome  = "prqtdLancto";
        parametro8.valor = qtdlancto.toString().replace(".", ",");
        this._dbConsult.model.parameters.push(parametro8);

        let parametro9   = new Parametro();
        parametro9.nome  = "prJustificativa";
        parametro9.valor = justificativa.toString();
        this._dbConsult.model.parameters.push(parametro9);

        let parametro10   = new Parametro();
        parametro10.nome  = "prqtdEmb";
        parametro10.valor = qtdembalagem.toString().replace(".", ",");
        this._dbConsult.model.parameters.push(parametro10);

        let parametro11   = new Parametro();
        parametro11.nome  = "prmotivo";
        parametro11.valor = motivo.toString();
        this._dbConsult.model.parameters.push(parametro11);

        let parametro12   = new Parametro();
        parametro12.nome  = "prseqUsuario";
        parametro12.valor = this.user.getUserModels().chapa.toString();
        this._dbConsult.model.parameters.push(parametro12);


        let parametro13   = new Parametro();
        parametro13.nome  = "prMovimentac5";
        parametro13.valor = seqgermov;
        this._dbConsult.model.parameters.push(parametro13);

        return JSON.stringify(this._dbConsult);
    }

    private getJson(seqproduto : number, sequnidade : number, nroempresa : number, codgeraloper : string, tipobusca : string, tipocgo : string, tipouso: string, tipocampo : string) : string {
        let retorno : string;
        switch(tipocampo){
            case 'Motivo':
               retorno = this.getJsonCGOMotivo(sequnidade, codgeraloper, tipobusca, tipouso, tipocgo);
               break;
            case 'CGO':
               retorno = this.getJsonCGOMotivo(sequnidade, codgeraloper, tipobusca, tipouso, tipocgo);
               break;
            case 'Local':
               retorno = this.getJsonLocal(sequnidade, nroempresa);
               break;
            case 'LoteProd':
               retorno = this.getJsonLoteProd(seqproduto, sequnidade);
               break;
            default:
               retorno = null;
               break;
        }

        return retorno;
    }

    execJson(seqproduto : number, sequnidade : number, nroempresa : number, codgeraloper : string, tipobusca : string, tipocgo : string, tipouso: string, tipocampo : string): Observable<object> {

        this.spinner.show();
       //console.log(this.getJson(seqproduto,sequnidade, nroempresa, codgeraloper, tipobusca, tipocgo, tipouso, tipocampo));
        return this.consult.post(this.getJson(seqproduto, sequnidade, nroempresa, codgeraloper, tipobusca, tipocgo, tipouso, tipocampo),0).pipe(
            map((res: DbConsult) => {
                let resp : object = res.obj.json as object;

                this.spinner.hide();
                if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                }
                return resp;
            })
        );
    }

    salvar(movestoquelote : MovEstoqueLote[]) {

        this.spinner.show();

        let requests = [];

        movestoquelote.forEach(x =>{

          requests.push(this.consult.post(this.getJsonSalvar(x.seqs.seqproduto,
                                                    x.seqs.seqlote,
                                                    x.seqs.nroempresa,
                                                    new Date().toLocaleDateString(),
                                                    "S",
                                                    x.seqs.seqlocal,
                                                    x.seqs.seqcgo,
                                                    x.qtdemov,
                                                    x.justificativa,
                                                    x.seqs.seqembalagem,
                                                    x.seqs.seqmotivo,
                                                    x.seqs.seqgermov),0));


        });

        this._subscriptions.push(forkJoin(requests).subscribe(results => {
            let retorno = this.getRequest(results);
            if(retorno != null) {
                this.alertService.alertInfinit(retorno.toString());
            }
            this.spinner.hide();
        }));

       // sub.unsubscribe();
    }

    private getRequest(requests) : string {
        let retorno : string = null;

        for(let res of requests) {
            let r = res as DbConsult;
            let resp : object = r.obj.json as object;

            if(res.error.errorMasseger != null){
                this.alertService.alertInfinit('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                break;
            }else{
                retorno = resp.toString();
                continue;
            }
        }
        return retorno;
    }

    private getJsonLoteProd(seqproduto : number, sequnidade : number){

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "cmp_getLoteprod";
        this._dbConsult.model.package = "pkg_cm_movtocentral";
        this._dbConsult.model.tiporetorno = "121";
        this._dbConsult.model.retorno = "r_result";

        this._dbConsult.model.parameters = new Array<Parametro>();

        let parametro   = new Parametro();
        parametro.nome  = "pr_seqproduto";
        parametro.valor = seqproduto.toString();
        this._dbConsult.model.parameters.push(parametro);

        let parametro2   = new Parametro();
        parametro2.nome  = "pr_sequnidade";
        parametro2.valor = sequnidade.toString();
        this._dbConsult.model.parameters.push(parametro2);

        return JSON.stringify(this._dbConsult);
    }

    deleteRow(m : MovEstoqueLote[], id : string) : MovEstoqueLote[]{
          m.map(x => {
            if(x.id == id) {
              let index = m.indexOf(x);
              m.splice(index, 1);
            }
        });

        return m;
    }

    getTextSelected(obj : object, id : number, tipo : string){
        let text : string = null;
        switch(tipo){
            case 'Empresa':
                (obj as Empresa[]).filter(x => x.nroEmpresa == id).map(x => text = x.fantasia);
            break;
            case 'Unidade':
                (obj as Unidade[]).filter(x => x.SeqUnidade == id).map(x => text = x.Unidade);
            break;
            case 'Select':
                (obj as Select[]).filter(x => x.id == id).map(x => text = x.text);
            case 'Lote':
                (obj as Lote[]).filter(x => x.SEQLOTE == id).map(x => text = x.SEQLOTE + ' - ' + x.FANTASIA + ' - ' + x.DTAENTRADA);
            break;
            case 'Embalagem':
                (obj as Lote[]).filter(x => x.EMBALAGEM == id).map(x => text = x.EMBLOTE);
            break;
        }

        return text;
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
            this._subscriptions.forEach(x => {
            x.unsubscribe();
            });
        }
}
