import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ControleDevCaixa, ControleDvCaixaTotais } from "../../../../shared/models/ControleDevCaixa";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { EntradaSaidaCaixaService } from "../entradasaida.service";
import { PDFService } from "../../../../shared/util/pdf-service";
<<<<<<< HEAD
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CadCaixaViewModel, CadCaixa } from '../../../../shared/models/CadCaixa';
import { CadastroCaixariaService } from '../../cadastro/cadastro.service';
=======
import { CadCaixaViewModel, CadCaixa } from '../../../../shared/models/CadCaixa';
import { CadastroCaixariaService } from '../../cadastro/cadastro.service';
import { MatTableDataSource } from '@angular/material/table';
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
declare var $: any;

@Component({
    selector: 'app-registrodevolucao-pdf',
    templateUrl: './registrodevolucao-pdf.component.html',
    styleUrls: ['./registrodevolucao-pdf.component.scss'],
    //encapsulation: ViewEncapsulation.None
})
export class RegistroDevolucaoPDFComponent{
<<<<<<< HEAD
    
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    cpfcnpjFornec    : string;
    nomeFornec       : string;
    endereco         : string;
    telefone         : string;
    controleDevCaixa : number;
    tipo             : string;
<<<<<<< HEAD
    codigoFornec     : number; 
=======
    codigoFornec     : number;
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    data             : string;
    observacao       : string;
    ultimoMetodoExec : boolean = false;
    gridTotais       : ControleDvCaixaTotais[] = [];
    cadastro         : CadCaixaViewModel = new CadCaixaViewModel();
    tipoRelac        : string;
<<<<<<< HEAD
    
    displayedColumns = ['codigo', 'modelo', 'quantidade', 'valorUn', 'valorTotal'];    
    dataSource = new MatTableDataSource<ControleDvCaixaTotais>(this.gridTotais);
    
=======

    displayedColumns = ['codigo', 'modelo', 'quantidade', 'valorUn', 'valorTotal'];
    dataSource = new MatTableDataSource<ControleDvCaixaTotais>(this.gridTotais);

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    constructor(private activatedRoute: ActivatedRoute, private entradaSaidaCaixaService : EntradaSaidaCaixaService, private pdfService : PDFService, private cadCaixariaService : CadastroCaixariaService) {
        this.gridTotais  = new Array<ControleDvCaixaTotais>();

    }

    ngOnInit(){

        this.activatedRoute.params.subscribe((params: Params) => {
            this.controleDevCaixa = params['id'];
            this.tipo             = params['tipo'];
<<<<<<< HEAD
        });       
        
=======
        });

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        this.tipoRelac = (this.tipo == 'S') ? "SAÍDA" : "DEVOLUÇÃO";

        this.getModelo();
        this.getControle(this.controleDevCaixa, this.tipo);
    }
<<<<<<< HEAD
    
    gerarImpressao() { 
        this.pdfService.criarImg($('#content').get(0));
            //this.pdfService.dowloadPDF(x, 'RegistroDeDevolucao.pdf');
        
=======

    gerarImpressao() {
        this.pdfService.criarImg($('#content').get(0));
            //this.pdfService.dowloadPDF(x, 'RegistroDeDevolucao.pdf');

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    }

    ngDoCheck() {
       if(this.ultimoMetodoExec) {
            this.gerarImpressao();
            this.ultimoMetodoExec = false;
<<<<<<< HEAD
           setTimeout(function(){ window.close();}, 3000); 
=======
           setTimeout(function(){ window.close();}, 3000);
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
       }
    }

    getControle(controleDevCaixa : number, tipo : string){
        this.limpar();

         let f = new ControleDevCaixa();
             f.obj = "CONTROLE";
             f.tipo = tipo;
             f.nroControle   = controleDevCaixa;
             f.fornec.codigo = null;
<<<<<<< HEAD
 
             if(f.nroControle.toString() != "") { 
                 this.entradaSaidaCaixaService.execJson(f).subscribe(x => { 
=======

             if(f.nroControle.toString() != "") {
                 this.entradaSaidaCaixaService.execJson(f).subscribe(x => {
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
                     if(x[0] != undefined) {
                        this.codigoFornec = x[0].SEQFORNECEDOR;
                        this.data         = x[0].DATA;
                        this.observacao   = x[0].OBSERVACAO;
                     }
<<<<<<< HEAD
 
                     this.getFornecedor(this.codigoFornec, f.nroControle, tipo);
                 });    
             }
    } 
   
=======

                     this.getFornecedor(this.codigoFornec, f.nroControle, tipo);
                 });
             }
    }

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    getFornecedor(codigo, nrocontrole, tipo){

        let f = new ControleDevCaixa();
            f.obj = "FORNECEDOR";
<<<<<<< HEAD
            f.fornec.codigo = Number(codigo); 
            f.fornec.fornecedor  = null;      
            f.fornec.cpfcnpj = 0; 
      
           this.entradaSaidaCaixaService.execJson(f).subscribe(x => { 
=======
            f.fornec.codigo = Number(codigo);
            f.fornec.fornecedor  = null;
            f.fornec.cpfcnpj = 0;

           this.entradaSaidaCaixaService.execJson(f).subscribe(x => {
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
               if(x[0] != undefined) {
                   this.cpfcnpjFornec = x[0].CNPJ;
                   this.nomeFornec    = x[0].NOMERAZAO;
                   this.endereco      = x[0].ENDERECO;
<<<<<<< HEAD
                   this.telefone      = x[0].TELEFONE;                   

                   this.getItensCaixas(nrocontrole, tipo);
               }                   
           });    
           
           
   }

   getModelo(){
    this.cadastro.obj = "GET";     
=======
                   this.telefone      = x[0].TELEFONE;

                   this.getItensCaixas(nrocontrole, tipo);
               }
           });


   }

   getModelo(){
    this.cadastro.obj = "GET";
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    this.cadCaixariaService.execJson(this.cadastro)
                           .subscribe((data : object) => {
                               this.cadastro.cadastros = data as CadCaixa[];

                           });
   }
<<<<<<< HEAD
  
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

   getItensCaixas(nrocontrole : number, tipo: string){
        let f = new ControleDevCaixa();
        f.obj = "BUSCACAIXA";
        f.nroControle  = nrocontrole;
        f.tipo = tipo;

<<<<<<< HEAD
        this.entradaSaidaCaixaService.execJson(f).subscribe((data : any) => { 
         
=======
        this.entradaSaidaCaixaService.execJson(f).subscribe((data : any) => {

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
            data.map(x => {
                if(x != undefined) {
                    let es        = new ControleDvCaixaTotais();
                    es.codigo     = x.SEQ_CADCAIXA;
                    es.quantidade = x.QUANTIDADE;
                    es.valor      = x.VALOR_UN;
                    es.modelo     = x.DESCRICAO;
                    /*this.cadastro.cadastros.map(x => {
                        if(x.SEQ_CADCAIXA ==  es.codigo){
<<<<<<< HEAD
                           es.modelo = x.MODELO;                       
                        }
                    });*/ 

                    es.total  = es.valor * es.quantidade;  
            
                    this.gridTotais.push(es);
                }
            });      
=======
                           es.modelo = x.MODELO;
                        }
                    });*/

                    es.total  = es.valor * es.quantidade;

                    this.gridTotais.push(es);
                }
            });
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

            this.montaGridTotais();
        });
    }

<<<<<<< HEAD
    montaGridTotais(){        
        this.dataSource = new MatTableDataSource<ControleDvCaixaTotais>(this.gridTotais);        
=======
    montaGridTotais(){
        this.dataSource = new MatTableDataSource<ControleDvCaixaTotais>(this.gridTotais);
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        this.ultimoMetodoExec = true;
    }

    getTotalItens() {
        return this.gridTotais.map(t => t.total).reduce((acc, value) => acc + value, 0);
    }

   limpar(){
<<<<<<< HEAD
       
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    this.cpfcnpjFornec    = null;
    this.nomeFornec       = null;
    this.endereco         = null;
    this.telefone         = null;
    this.codigoFornec     = 0;
    this.data             = null;
    this.observacao       = null;
   }
}
