import { Component, OnInit, ViewChild, EventEmitter, OnDestroy } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";;
import { UserService } from "../../../shared/services/user.service";
import { Empresa } from "../../../shared/models/Empresa";
import { Unidade } from "../../../shared/models/Unidade";
import { FormControl, Validators, FormBuilder, FormGroup, FormArray, ValidatorFn, AbstractControl } from "@angular/forms";

import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { ValidVendPdv, Validacao } from "../../../shared/models/ValidacaoVendaPdv";
import { VendaPdvService } from "./vendapdv.service";
import { DateOracle } from '../../../shared/util/date-format';
import { CurrencyFormat } from '../../../shared/util/moeda';
import { ExcelService } from '../../../shared/util/excel-service';
import { Subscription } from "rxjs";
import { Checkbox } from "../../../shared/models/Components";
import { isArray } from "jquery";


@Component({
    selector: "app-ti-vendapdv",
    templateUrl: "./vendapdv.component.html",
    styleUrls: ["./vendapdv.component.scss"],
    providers: []
})
export class VendaPdvComponent implements OnInit, OnDestroy {
    empresas        : Array<Empresa> = [];
    unidades        : Array<Unidade> = [];
    form            : FormGroup;
    validacao       : Array<Validacao> = [];
    numcols         : number = 1;
    validvendaPdv   : Array<ValidVendPdv> = [];
    ckdiferenca     : boolean = false;
    valid           : Array<ValidVendPdv> = [];
    validCent       : Array<ValidVendPdv> = [];
    validGrid       : Array<ValidVendPdv> = [];
    maxSizeGrid     : number = 0;
    colunas         : Array<Checkbox> = [];
    isCarregarInc   : boolean = true;

    displayedColumns = ['empresa', 'dtamovimento', 'sm', 'monitor', 'fiscal', 'tesouraria', 'atualizar'];
	dataSource = new MatTableDataSource<ValidVendPdv>(this.validvendaPdv);
	@ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumnsInc = ['empresa', 'nrodocto', 'codmodelo', 'serie', 'dtaemissao', 'motivo'];
	dataSourceInc = new MatTableDataSource<ValidVendPdv>(this.validvendaPdv);
    @ViewChild('paginatorInc') paginatorInc: MatPaginator;
    @ViewChild(MatSort) sortInc: MatSort;

    private _subscriptions: Array<Subscription> = [];

    constructor(private user : UserService, private fb: FormBuilder, private validVendaPdv : VendaPdvService, private error: ValidationErrorService, private dateFormat: DateOracle, private moedaFormat : CurrencyFormat, private excelService : ExcelService){
        this.unidades = this.user.getUnidadePerm();
        this.excelService = excelService;

        this.colunas = new Array<Checkbox>();

        this.form = this.fb.group({
			 validacao: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			   datafim: new FormControl({disabled: true, value: ''}, [Validators.required]),
			datainicio: new FormControl({disabled: true, value: ''}, [Validators.required]),
               empresa: new FormControl('', [Validators.required]),
            sequnidade: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
              checkall: new FormControl('', [Validators.nullValidator]),
            uncheckall: new FormControl('', [Validators.nullValidator]),
             diferenca: new FormControl('', [Validators.nullValidator]),
               colunas: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit() {

        let coluna = new Checkbox();
            coluna.valor = "MONITOR";
            coluna.text = "MONITOR";
        this.colunas.push(coluna);

            coluna = new Checkbox();
            coluna.valor = "FISCAL";
            coluna.text = "FISCAL";

        this.colunas.push(coluna);
            coluna = new Checkbox();
            coluna.valor = "TESOURARIA";
            coluna.text = "TESOURARIA";
        this.colunas.push(coluna);

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSourceInc.paginator = this.paginatorInc;
        this.dataSourceInc.sort = this.sortInc;
        this.getValidacao();
	}

    checkeds() {
        return this.empresas.filter(opt => opt.checked).map(opt => opt.nroEmpresa);
    }

    checkedsColunas() {
        return this.colunas.filter(opt => opt.checked).map(opt => opt.valor);
    }


    executar(tipo : string){
        this.form.controls['datainicio'].enable();
        this.form.controls['datafim'].enable();
        this.ckdiferenca = false;
        this.isCarregarInc = true;

        if(this.form.valid) {
           this._subscriptions.push(this.validVendaPdv.executar(this.checkeds(),
                                       this.dateFormat.get(this.form.get("datainicio").value),
                                       this.dateFormat.get(this.form.get("datafim").value),
                                       this.form.get("validacao").value,
                                       tipo,
                                       this.form.get("sequnidade").value,
                                       this.checkedsColunas().join(),
                                       this.form.get("diferenca").value)
                            .subscribe((x : ValidVendPdv[]) => {
                                if(x != null){
                                    this.validvendaPdv =  x;
                                   if(tipo != 'I') {

                                        this.dataSource = new MatTableDataSource<ValidVendPdv>(this.validvendaPdv);
                                        this.dataSource.paginator = this.paginator;
                                        this.dataSource.sort = this.sort;
                                   }else{
                                        this.isCarregarInc = false;
                                        this.dataSourceInc = new MatTableDataSource<ValidVendPdv>(this.validvendaPdv);
                                        this.dataSourceInc.paginator = this.paginatorInc;
                                        this.dataSourceInc.sort = this.sortInc;
                                   }

                                }
                            }));
        }

        this.error.showError(this.form);
        this.form.controls['datainicio'].disable();
        this.form.controls['datafim'].disable();

    }

    onChange(sequnidade: number){
        this.form.patchValue({ checkall: false});
        this.empresas.map(x => { x.checked = false; });
        this.empresas = this.user.getEmpresaPermUnid(sequnidade);
    }

    checkAll(event){
        this.form.patchValue({ uncheckall: false});

        if(event.checked == true){
            this.empresas.map(x => {  x.checked = true; });
        }else{
            this.empresas.map(x => {  x.checked = false; });
        }
    }

    uncheckAll(event){
        this.form.patchValue({ checkall: false});

        this.empresas.map(x => {  x.checked = false; });
    }

    getValidacao(){
        this._subscriptions.push(this.validVendaPdv.p_getValidacao().subscribe((x : Validacao[]) => {
            this.validacao = x;
        }));
    }

    marqueiconsist(sm, valcomparacao){
        let color = "";
             if(sm != valcomparacao){
                 color = "red";
             }
        return color;
    }

    atualizar(nroempresa : number, validacao : string, dtamovimento : string, sequnidade : string)
    {
           this.ckdiferenca = false;

           let empresas : number[] = [ nroempresa ];

           this._subscriptions.push(this.validVendaPdv.executar(empresas,
                                       dtamovimento,
                                       dtamovimento,
                                       validacao,
                                       'A',
                                       sequnidade,
                                       this.form.get("colunas").value,
                                       this.form.get("diferenca").value
                                       )
                            .subscribe((x : ValidVendPdv[]) => {
                                let element : HTMLElement = document.getElementById('pesquisar') as  HTMLElement;
                                element.click();
                                    /*this.validvendaPdv = x;
                                    this.dataSource = new MatTableDataSource<ValidVendPdv>(this.validvendaPdv);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;*/
                            }));
    }

    clickPesquisa(){

    }

    applyFilter(filterValue: string) {
        this.valid  = this.validvendaPdv;

        if(filterValue["checked"] == true){
            this.valid  = this.valid.filter(x => (x.SM != x.TESOURARIA || x.SM != x.MONITOR || x.SM != x.FISCAL));
            this.dataSource = new MatTableDataSource<ValidVendPdv>(this.valid);

        }else{
            this.dataSource = new MatTableDataSource<ValidVendPdv>(this.validvendaPdv);
        }

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
    }

    /*applyFilterCent() {
        this.validCent  = this.valid;
        let filterValue = this.form.get("arredondar").value;
        if(filterValue > 0){

            this.validCent = this.validCent.filter(x =>
                (Math.abs(parseFloat((this.moedaFormat.float(x.SM) - this.moedaFormat.float(x.TESOURARIA)).toFixed(2))) >=  filterValue ||
                (Math.abs(parseFloat((this.moedaFormat.float(x.SM) - this.moedaFormat.float(x.MONITOR)).toFixed(2))) >= filterValue   ||
                (Math.abs(parseFloat((this.moedaFormat.float(x.SM) - this.moedaFormat.float(x.FISCAL)).toFixed(2))) >= filterValue))
            ));

            this.dataSource = new MatTableDataSource<ValidVendPdv>(this.validCent);

        }else{
            this.dataSource = new MatTableDataSource<ValidVendPdv>(this.valid);
        }

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
    }*/

    mostrarAtualizar(sm : number, tersouraria : number, monitor : number, fiscal : number) : boolean
    {
        return (sm != tersouraria || sm != monitor || sm != fiscal) ? false : true;
    }

    exportParaExcel(event) {

        if(this.validCent.length > 0){
            this.validGrid = this.validCent;
        }else if(this.valid.length > 0){
            this.validGrid = this.valid;
        }else if(this.validvendaPdv.length > 0){
            this.validGrid = this.validvendaPdv;
        }

        this.excelService.exportAsExcelFile(this.validGrid, 'ValidaPDV');
   }


   ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this._subscriptions.forEach(x => {
        x.unsubscribe();
        });
    }
}
