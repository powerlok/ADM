import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ControleDevCaixa, ControleDvCaixaTotais } from "../../../../shared/models/ControleDevCaixa";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { EntradaSaidaCaixaService } from "../entradasaida.service";
import { PDFService } from "../../../../shared/util/pdf-service";
import { CadCaixaViewModel, CadCaixa } from '../../../../shared/models/CadCaixa';
import { CadastroCaixariaService } from '../../cadastro/cadastro.service';
import { MatTableDataSource } from '@angular/material/table';
declare var $: any;

@Component({
    selector: 'app-registrodevolucao-pdf',
    templateUrl: './registrodevolucao-pdf.component.html',
    styleUrls: ['./registrodevolucao-pdf.component.scss'],
    //encapsulation: ViewEncapsulation.None
})
export class RegistroDevolucaoPDFComponent{

    cpfcnpjFornec    : string;
    nomeFornec       : string;
    endereco         : string;
    telefone         : string;
    controleDevCaixa : number;
    tipo             : string;
    codigoFornec     : number;
    data             : string;
    observacao       : string;
    ultimoMetodoExec : boolean = false;
    gridTotais       : ControleDvCaixaTotais[] = [];
    cadastro         : CadCaixaViewModel = new CadCaixaViewModel();
    tipoRelac        : string;

    displayedColumns = ['codigo', 'modelo', 'quantidade', 'valorUn', 'valorTotal'];
    dataSource = new MatTableDataSource<ControleDvCaixaTotais>(this.gridTotais);

    constructor(private activatedRoute: ActivatedRoute, private entradaSaidaCaixaService : EntradaSaidaCaixaService, private pdfService : PDFService, private cadCaixariaService : CadastroCaixariaService) {
        this.gridTotais  = new Array<ControleDvCaixaTotais>();

    }

    ngOnInit(){

        this.activatedRoute.params.subscribe((params: Params) => {
            this.controleDevCaixa = params['id'];
            this.tipo             = params['tipo'];
        });

        this.tipoRelac = (this.tipo == 'S') ? "SAÍDA" : "DEVOLUÇÃO";

        this.getModelo();
        this.getControle(this.controleDevCaixa, this.tipo);
    }

    gerarImpressao() {
        this.pdfService.criarImg($('#content').get(0));
            //this.pdfService.dowloadPDF(x, 'RegistroDeDevolucao.pdf');

    }

    ngDoCheck() {
       if(this.ultimoMetodoExec) {
            this.gerarImpressao();
            this.ultimoMetodoExec = false;
           setTimeout(function(){ window.close();}, 3000);
       }
    }

    getControle(controleDevCaixa : number, tipo : string){
        this.limpar();

         let f = new ControleDevCaixa();
             f.obj = "CONTROLE";
             f.tipo = tipo;
             f.nroControle   = controleDevCaixa;
             f.fornec.codigo = null;

             if(f.nroControle.toString() != "") {
                 this.entradaSaidaCaixaService.execJson(f).subscribe(x => {
                     if(x[0] != undefined) {
                        this.codigoFornec = x[0].SEQFORNECEDOR;
                        this.data         = x[0].DATA;
                        this.observacao   = x[0].OBSERVACAO;
                     }

                     this.getFornecedor(this.codigoFornec, f.nroControle, tipo);
                 });
             }
    }

    getFornecedor(codigo, nrocontrole, tipo){

        let f = new ControleDevCaixa();
            f.obj = "FORNECEDOR";
            f.fornec.codigo = Number(codigo);
            f.fornec.fornecedor  = null;
            f.fornec.cpfcnpj = 0;

           this.entradaSaidaCaixaService.execJson(f).subscribe(x => {
               if(x[0] != undefined) {
                   this.cpfcnpjFornec = x[0].CNPJ;
                   this.nomeFornec    = x[0].NOMERAZAO;
                   this.endereco      = x[0].ENDERECO;
                   this.telefone      = x[0].TELEFONE;

                   this.getItensCaixas(nrocontrole, tipo);
               }
           });


   }

   getModelo(){
    this.cadastro.obj = "GET";
    this.cadCaixariaService.execJson(this.cadastro)
                           .subscribe((data : object) => {
                               this.cadastro.cadastros = data as CadCaixa[];

                           });
   }


   getItensCaixas(nrocontrole : number, tipo: string){
        let f = new ControleDevCaixa();
        f.obj = "BUSCACAIXA";
        f.nroControle  = nrocontrole;
        f.tipo = tipo;

        this.entradaSaidaCaixaService.execJson(f).subscribe((data : any) => {

            data.map(x => {
                if(x != undefined) {
                    let es        = new ControleDvCaixaTotais();
                    es.codigo     = x.SEQ_CADCAIXA;
                    es.quantidade = x.QUANTIDADE;
                    es.valor      = x.VALOR_UN;
                    es.modelo     = x.DESCRICAO;
                    /*this.cadastro.cadastros.map(x => {
                        if(x.SEQ_CADCAIXA ==  es.codigo){
                           es.modelo = x.MODELO;
                        }
                    });*/

                    es.total  = es.valor * es.quantidade;

                    this.gridTotais.push(es);
                }
            });

            this.montaGridTotais();
        });
    }

    montaGridTotais(){
        this.dataSource = new MatTableDataSource<ControleDvCaixaTotais>(this.gridTotais);
        this.ultimoMetodoExec = true;
    }

    getTotalItens() {
        return this.gridTotais.map(t => t.total).reduce((acc, value) => acc + value, 0);
    }

   limpar(){

    this.cpfcnpjFornec    = null;
    this.nomeFornec       = null;
    this.endereco         = null;
    this.telefone         = null;
    this.codigoFornec     = 0;
    this.data             = null;
    this.observacao       = null;
   }
}
