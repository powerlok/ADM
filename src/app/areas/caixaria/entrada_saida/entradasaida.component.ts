import { Component, ViewChild, QueryList, ViewChildren, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../../shared/services/user.service";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ControleDevCaixa, ControleDvCaixaTotais, ControlePorFornec, ControleDevCaixaFornec } from "../../../shared/models/ControleDevCaixa";
import { EntradaSaidaCaixaService } from "./entradasaida.service";
import { Unidade } from "../../../shared/models/Unidade";
import { CadastroCaixariaService } from "../cadastro/cadastro.service";
import { CadCaixa, CadCaixaViewModel } from "../../../shared/models/CadCaixa";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription, of } from "rxjs";
import { Params } from "@angular/router";
import { isArray } from "util";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
    selector: 'app-caixaria-entradasaida',
    templateUrl: './entradasaida.component.html',
    styleUrls: ['./entradasaida.component.scss'],
})
export class EntradaSaidaCaixaComponent implements OnInit, OnDestroy {
    controleDevCaixa     : ControleDevCaixa;
    gridTotais           : ControleDvCaixaTotais[];
    form                 : FormGroup;
    unidades             : Array<Unidade> = [];
    tipos                : Array<Object> = [];
    cadastros            : CadCaixa[] = [];
    cadastro             : CadCaixaViewModel = new CadCaixaViewModel();
    hideCampos           : boolean = true;
    hideCancel           : boolean = false;
    hideSave             : boolean = false;
    hidePDF              : boolean = true;
    hideDeletar          : boolean = false;
    hideAdd              : boolean = false;
    tipo                 : string;
    nroControle          : number;
    filteredOptions      : ControlePorFornec[];
    filteredOptionsFornec      : ControlePorFornec[];

    displayedColumns = ['codigo', 'modelo', 'quantidade', 'valorUn', 'valorTotal', 'delete'];
    dataSource = new MatTableDataSource<ControleDvCaixaTotais>(this.gridTotais);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    private _subscriptions: Array<Subscription> = [];

    constructor(private fb: FormBuilder, private user: UserService, private error: ValidationErrorService, private entradaSaidaServ: EntradaSaidaCaixaService, private cadCaixariaService : CadastroCaixariaService, private alertService: AlertService) {
        this.tipos = [{ id : 'E', text : 'Entrada' }, { id : 'S', text : 'Saída'}];
        this.unidades = this.user.getUnidadePerm();

        this.gridTotais            = new Array<ControleDvCaixaTotais>();


        this.form = this.fb.group({
              observacao        : new FormControl('', [Validators.nullValidator]),
            //#region  Fornecedor
              valorUnitario     : new FormControl('', [Validators.nullValidator]),
              valorTotal        : new FormControl('', [Validators.nullValidator]),
              quatidade         : new FormControl('', [Validators.nullValidator]),
              modelo            : new FormControl('', [Validators.nullValidator]),
              codigo            : new FormControl('', [Validators.nullValidator]),
            //#endregion

            //#region  Produto
              quantidadeProd    : new FormControl('', [Validators.nullValidator, CustomValidators.validaNumberPoint]),
              modeloProd        : new FormControl('', [Validators.nullValidator]),
              codigoProd        : new FormControl({disabled: true, value: ''}, [Validators.nullValidator]),
            //#endregion

            //#region  Fornecedor
              telefone          : new FormControl({disabled: true, value: ''}, [Validators.nullValidator]),
              endereco          : new FormControl({disabled: true, value: ''}, [Validators.nullValidator]),
              cpfcnpjFornec     : new FormControl('', [Validators.nullValidator]),
              codigoFornec      : new FormControl('', [Validators.nullValidator]),
              nomeFornec        : new FormControl({disabled: true, value: ''}, [Validators.nullValidator]),
            //#endregion

              nroControle       : new FormControl('', [Validators.nullValidator]),
              dtaLancto         : new FormControl({disabled: true, value: ''}, [Validators.nullValidator]),
              tipo              : new FormControl('', [Validators.nullValidator]),
              status            : new FormControl('', [Validators.nullValidator]),
              //statusCampo       : new FormControl({disabled: true, value: ''}, [Validators.nullValidator])
        });


    }

    ngOnInit() {

        this._subscriptions.push(this.form.get("nroControle").valueChanges
                    .switchMap((params : Params) =>  this.filterGroup(params))
                    .subscribe((val : any) => {
                            this.filteredOptions = new Array<ControlePorFornec>();
                            if(isArray(val)) {
                                if(val.length > 0) {
                                    val.map(m => {
                                        let c               = new  ControlePorFornec();
                                            c.seqcontrole   = m.SEQ_CONTROLE;
                                            c.seqfornecedor = m.SEQFORNECEDOR;
                                            c.data          = m.DATA;
                                            c.nome          = m.NOMERAZAO;

                                            this.filteredOptions.push(c);
                                    });
                                }
                            }
                        }
                    ));

        this._subscriptions.push(this.form.get("codigoFornec").valueChanges
                .switchMap((params : Params) =>  this.filterGroupFornec(params))
                .subscribe(
                        (val : any) => {

                            this.filteredOptionsFornec = new Array<ControlePorFornec>();

                            if(isArray(val)) {
                                if(val.length > 0) {
                                    val.map(m => {
                                        let  c               = new  ControlePorFornec();
                                             c.seqfornecedor = m.SEQFORNECEDOR;
                                             c.nome          = m.NOMERAZAO;

                                            this.filteredOptionsFornec.push(c);
                                    });
                                }
                            }

                        }
                    ));
    }

    filterGroupFornec(desc: Params): Observable<ControlePorFornec[]> {
        let obs = new Observable<any>();

        if(desc != null && ((Number(desc) && Number(desc) >= 1 || (!Number(desc) && desc.toString().length > 4)))) {
            let f = new ControleDevCaixa();
            f.obj = "FORNECEDOR";
            f.fornec.fornecedor  = (!Number(desc)) ? desc.toString() : null;
            f.fornec.cpfcnpj = 0;
            f.fornec.codigo = (Number(desc)) ? Number(desc) : 0;

            obs = this.entradaSaidaServ.execJson(f);
        }

        return obs;
    }

    filterGroup(desc: Params): Observable<ControlePorFornec[]> {
        let obs = new Observable<any>();
        if(desc != null && ((Number(desc) && Number(desc) >= 1 || (!Number(desc) && desc.toString().length > 4)))) {
            let f = new ControleDevCaixa();
            f.obj = "CONTROLEPORFORNEC";
            f.tipo = this.form.get("tipo").value;
            f.fornec.codigo  = (Number(desc)) ? Number(desc) : 0;
            f.fornec.fornecedor = (!Number(desc)) ? desc.toString() : null;

            obs = this.entradaSaidaServ.execJson(f);
        }

        return obs;
    }

    onSelectChange(event){
        this.form.get("nroControle").setValue(event.source.value);
        this.getControle();
    }

    onSelectChangeFornec(event){
        this.limpaMenosFornec();
          let f = new ControleDevCaixa();
             f.obj = "FORNECEDOR";
             f.fornec.codigo  = (Number(event.source.value)) ? event.source.value : 0;
             f.fornec.cpfcnpj = 0;
             f.fornec.fornecedor = (!Number(event.source.value)) ? event.souce.value : null;

             this._subscriptions.push( this.entradaSaidaServ.execJson(f).subscribe((x : any) => {
                if(isArray(x)) {
                    x.map(m => {
                        this.form.get("cpfcnpjFornec").setValue(m.CNPJ);
                        this.form.get("nomeFornec").setValue(m.NOMERAZAO);
                        this.form.get("endereco").setValue(m.ENDERECO);
                        this.form.get("telefone").setValue(m.TELEFONE);
                    });
                }
            }));
    }

    onChange(){
       this.hideCampos = false;

       this.form.controls["nroControle"].setValue(null);
       this.limparCampos();
    }

    ngAfterViewInit() {

        this.getModelo();
        this.form.get("status").statusChanges.subscribe(x => {// console.log(this.form.get("status").value);
            if(this.form.get("status").value == 'C') {
                this.hideSave    = true;
                this.hideCancel  = true;
                this.hideDeletar = true;
                this.hideAdd     = true;
            }else if(this.form.get("status").value == 'V') {
                this.hideSave    = true;
                this.hideDeletar = true;
                this.hideAdd     = true;
            }else{
                this.hideSave    = false;
                this.hideCancel  = false;
                this.hideDeletar = false;
                this.hideAdd     = false;
            }
        });


    }

    getModelo(){
        this.cadastro.obj = "GET";
        this._subscriptions.push(this.cadCaixariaService.execJson(this.cadastro)
                               .subscribe((data : object) => {
                                   this.cadastro.cadastros = data as CadCaixa[];

                                   let cadCaixa = new CadCaixa();
                                   cadCaixa.SEQ_CADCAIXA = 0;
                                   cadCaixa.MODELO = " -- ";
                                   this.cadastro.cadastros.push(cadCaixa);

                               }));
    }

    checkSaidas(cadCaixa : number) : Observable<object>{
        let qtdSaida = new Observable<any>();

        if(this.form.get("tipo").value == "E") {
            let f = new ControleDevCaixa();
            f.obj = "CHECKSAIDAS";
            f.fornec.codigo = this.form.get("codigoFornec").value;
            f.cadcaixa = cadCaixa;

            qtdSaida = this.entradaSaidaServ.execJson(f);
        }else{
            qtdSaida = of("1");
        }

        return qtdSaida;
    }

    addRowGrid(){

        let es        = new ControleDvCaixaTotais();
        es.codigo     = this.form.get("codigoProd").value;
        es.quantidade = this.form.get("quantidadeProd").value;

        if(es.codigo > 0 && es.quantidade > 0) {

            this._subscriptions.push(this.checkSaidas(es.codigo).subscribe(x => {

                    if(parseInt(x.toString()) > 0){

                            this.cadastro.cadastros.map(x => {
                                if(x.SEQ_CADCAIXA == es.codigo){
                                   es.modelo = x.MODELO;
                                   es.valor  = x.VALOR;
                                }
                            });

                            let index = 0;
                            this.gridTotais.map(x => {
                                if(es.codigo == x.codigo){
                                    index = this.gridTotais.indexOf(x);
                                    this.gridTotais.splice(index, 1);
                                }
                            });

                            es.total  = es.valor * es.quantidade;

                            this.gridTotais.push(es);

                            this.montaGridTotais();

                    }else{
                        this.alertService.alert("Não houve saída para este modelo.");
                    }
            }));
        }


        this.form.controls['codigoProd'].setValue(null);
        this.form.controls['modeloProd'].setValue(0);
        this.form.controls['quantidadeProd'].setValue(null);

    }

    removeRowGrid(id){
        this.gridTotais.map(x => {
            if(x.codigo == id){
               let index = this.gridTotais.indexOf(x);
               this.gridTotais.splice(index,1);
            }
        });


        this.montaGridTotais();
    }

    getControle(){
       this.limparCampos();

        let f = new ControleDevCaixa();
            f.obj = "CONTROLE";
            f.tipo = this.form.get("tipo").value;
            f.nroControle   = this.form.get("nroControle").value;
            f.fornec.codigo = this.form.get("codigoFornec").value;


            if(f.nroControle.toString() != "") {

                this._subscriptions.push(this.entradaSaidaServ.execJson(f).subscribe(x => {
                    if(isArray(x)) {
                        if(x.length > 0) {
                            this.form.get("dtaLancto").setValue(x[0].DATA);
                            this.form.get("status").setValue(x[0].STATUS);
                            this.form.get("codigoFornec").setValue(x[0].SEQFORNECEDOR);
                            this.form.get("observacao").setValue(x[0].OBSERVACAO);

                            this.getFornecedor();
                            this.getItensCaixas();

                            this.nroControle =  this.form.get("nroControle").value;
                            this.tipo = this.form.get("tipo").value;
                            //this.form.get("situacaoCampo").setValue((this.form.get("status").value =)
                            this.hidePDF = false;
                        }
                    }
                }));
            }
    }

    gerPDf(){
        this.entradaSaidaServ.get("caixaria/registrodevolucaopdf/"+this.form.get("nroControle").value+"/" + this.form.get("tipo").value);
    }

    getFornecedorPorCnpj(){
        this.limpaMenosFornec();
        this.getFornecedor();
    }

    getFornecedor(){
         let f = new ControleDevCaixa();
             f.obj = "FORNECEDOR";
             f.fornec.codigo = Number(this.form.get("codigoFornec").value);
             f.fornec.fornecedor  = null;
             f.fornec.cpfcnpj = (Number(this.form.get("cpfcnpjFornec").value) > 0) ? Number(this.form.get("cpfcnpjFornec").value) : 0;

            if(f.fornec.codigo > 0 || f.fornec.cpfcnpj > 0) {
                this._subscriptions.push(this.entradaSaidaServ.execJson(f).subscribe(x => {
                    if(isArray(x)) {
                       if(x.length > 0) {
                        this.form.get("cpfcnpjFornec").setValue(x[0].CNPJ);
                        this.form.get("nomeFornec").setValue(x[0].NOMERAZAO);
                        this.form.get("endereco").setValue(x[0].ENDERECO);
                        this.form.get("telefone").setValue(x[0].TELEFONE);
                       }
                    }
                }));
            }
    }

    getCaixa(id){

        this.cadastro.cadastros.map(x => {
           if(x.SEQ_CADCAIXA == id){
               this.form.get("codigoProd").setValue(x.SEQ_CADCAIXA);
           }
        });
    }

    montaGridTotais(){
        this.dataSource           = new MatTableDataSource<ControleDvCaixaTotais>(this.gridTotais);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort      = this.sort;
    }

    getTotalItens() {
        return this.gridTotais.map(t => t.total).reduce((acc, value) => acc + value, 0);
    }

    getItensCaixas(){
        let f = new ControleDevCaixa();
        f.obj = "BUSCACAIXA";
        f.tipo = this.form.get("tipo").value;
        f.nroControle  = this.form.get("nroControle").value;

        this.gridTotais = [];

        if(f.nroControle > 0) {

                this._subscriptions.push(this.entradaSaidaServ.execJson(f).subscribe((data : any) => {

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
                            }); */

                            es.total  = es.valor * es.quantidade;

                            this.gridTotais.push(es);

                        }
                    });


                    this.montaGridTotais();
                }));
            }
    }

    submit(a){
        //this.form.controls['codigoProd'].enable();

        if(this.form.valid) {

          let m = new ControleDevCaixa();
              m.acao = a;
              m.nroControle = (this.form.get("nroControle").value != null) ? this.form.get("nroControle").value : 0;
              m.observacao = this.form.get("observacao").value;
              m.fornec.codigo = this.form.get("codigoFornec").value;
              m.cadcaixa = 0;
              m.tipo = this.form.get("tipo").value;
              m.totais = this.gridTotais;

              if(m.tipo == "S"){
                  m.obj = "CONTROLESAIDA";
              }else{
                  m.obj = "CONTROLEENTRADA";
              }

              this._subscriptions.push(this.entradaSaidaServ.execJson(m).subscribe(x => {
               if(m.nroControle == 0) m.nroControle = Number(x);

               if((m.nroControle > 0 && m.nroControle != null) && a == 'I'){

                this.entradaSaidaServ.salvarItens(m)
                                     .subscribe((data : boolean) => {
                                        if(data == false) {
                                            this.form.get("nroControle").setValue(m.nroControle);
                                            this.getControle();
                                        }
                                     });

                }else{
                    this.form.get("nroControle").setValue(m.nroControle);
                    this.getControle();
                }

           }));
        }

        this.error.showError(this.form);
        //this.form.controls['codigoProd'].disable();
    }

    limpar(){
        this.gridTotais = [];
        this.form.reset();
        this.hideCampos = true;
        this.montaGridTotais();
    }

    limparCampos(){
        this.gridTotais = [];
        this.form.controls["modeloProd"].setValue(0);
        this.form.controls["quantidadeProd"].setValue(null);
        this.form.controls["codigoProd"].setValue(null);
        this.form.controls["telefone"].setValue(null);
        this.form.controls["endereco"].setValue(null);
        this.form.controls["cpfcnpjFornec"].setValue(null);
        this.form.controls["codigoFornec"].setValue(null);
        this.form.controls["nomeFornec"].setValue(null);
        this.form.controls["dtaLancto"].setValue(null);
        this.form.controls["status"].setValue(null);
       // this.form.controls["nroControle"].setValue(null);
        this.form.controls["observacao"].setValue(null);
        this.montaGridTotais();

    }

    limparCamposBt(){
        this.gridTotais = [];
        this.form.controls["modeloProd"].setValue(0);
        this.form.controls["quantidadeProd"].setValue(null);
        this.form.controls["codigoProd"].setValue(null);
        this.form.controls["telefone"].setValue(null);
        this.form.controls["endereco"].setValue(null);
        this.form.controls["cpfcnpjFornec"].setValue(null);
        this.form.controls["codigoFornec"].setValue(null);
        this.form.controls["nomeFornec"].setValue(null);
        this.form.controls["dtaLancto"].setValue(null);
        this.form.controls["status"].setValue(null);
        this.form.controls["nroControle"].setValue(null);
        this.form.controls["observacao"].setValue(null);
        this.montaGridTotais();

    }

    limpaMenosFornec() {
        this.gridTotais = [];
        this.form.controls["modeloProd"].setValue(0);
        this.form.controls["quantidadeProd"].setValue(null);
        this.form.controls["codigoProd"].setValue(null);
        this.form.controls["dtaLancto"].setValue(null);
        this.form.controls["status"].setValue(null);
        this.form.controls["nroControle"].setValue(null);
        this.form.controls["observacao"].setValue(null);
        this.montaGridTotais();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this._subscriptions.forEach(x => {
           x.unsubscribe();
        });
    }
}
