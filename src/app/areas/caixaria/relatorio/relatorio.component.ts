import { Component, ViewChild, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { RelatorioCaixa, ControlePorFornec, ControleDevCaixa } from "../../../shared/models/ControleDevCaixa";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { RelatorioCaixaService } from "./relatorio.service";
import { DateOracle } from "../../../shared/util/date-format";
import { Subscription, Observable } from "rxjs";
import { Params } from "@angular/router";
import { EntradaSaidaCaixaService } from "../entrada_saida/entradasaida.service";
import { ExcelService } from '../../../shared/util/excel-service';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { isArray } from 'jquery';

@Component({
    selector: 'app-caixaria-relatorio',
    templateUrl: './relatorio.component.html',
    styleUrls: ['./relatorio.component.scss'],
})
export class RelatorioCaixaComponent implements OnInit, OnDestroy {
    tipos      : Array<Object> = [];
    form       : FormGroup;
    defaultDate: Date = new Date();
    grid       : RelatorioCaixa[] = [];
    sizeItensPages : number = 0;
    filteredOptionsFornec      : ControlePorFornec[];
    validGrid : RelatorioCaixa[] = [];

    displayedColumns = ['codigo', 'fornecedor', 'modelo', 'data', 'saida', 'retorno', 'saldo', 'valor'];
    dataSource = new MatTableDataSource<RelatorioCaixa>(this.grid);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private _subscriptions: Array<Subscription> = [];

    constructor(private fb: FormBuilder,
                private error: ValidationErrorService,
                private relatorioCaixaServ : RelatorioCaixaService,
                private dateFormat: DateOracle,
                private entradaSaidaServ: EntradaSaidaCaixaService,
                private excelService: ExcelService) {

        this.tipos = [{ id: 'SAIDA', text: 'Saída' }, { id: 'ENTRADA', text: 'Entrada' }, { id: 'SALDO', text: 'Saldo' }];

        this.grid = new Array<RelatorioCaixa>();

        this.form = this.fb.group({

            tipo      : new FormControl('', [Validators.required]),
            datafim   : new FormControl({ disabled: true, value: '' }, [Validators.nullValidator]),
            datainicio: new FormControl({ disabled: true, value: '' }, [Validators.nullValidator]),
            codfornec : new FormControl('', [Validators.nullValidator]),
            fornecedor:  new FormControl({ disabled: true, value: '' }, [Validators.nullValidator]),
        });

        this.form.controls["datainicio"].setValue(this.defaultDate);
        this.form.controls["datafim"].setValue(this.defaultDate);
    }

    ngOnInit(){
        this._subscriptions.push(this.form.get("codfornec").valueChanges
        .switchMap((params : Params) =>  this.filterGroupFornec(params))
        .subscribe((val : any) => {

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

        }));
    }

    filterGroupFornec(desc: Params): Observable<ControlePorFornec[]> {
        let obs = new Observable<any>();

        if(desc != null && ((Number(desc) && Number(desc) >= 1 || (!Number(desc) && desc.toString().length > 4)))) {
            let f = new ControleDevCaixa();
            f.obj = "FORNECEDOR";
            f.fornec.fornecedor  = (!Number(desc)) ? desc.toString() : null;
            f.fornec.cpfcnpj = (Number(desc)) ? Number(desc) : 0;
            f.fornec.codigo =  0;
            obs = this.entradaSaidaServ.execJson(f);
        }else{
           this.form.get("fornecedor").setValue(null);
        }

        return obs;
    }

    onSelectChangeFornec(nome){
         this.form.get("fornecedor").setValue(nome);
    }

    ngAfterViewInit() {

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort      = this.sort;
    }

    pesquisar(){

        this.form.controls['datainicio'].enable();
        this.form.controls['datafim'].enable()

        if(this.form.valid){
            this.grid = [];
           this._subscriptions.push(this.relatorioCaixaServ.execJson(this.form.get("codfornec").value,
                                             this.dateFormat.get(this.form.get("datainicio").value),
                                             this.dateFormat.get(this.form.get("datafim").value),
                                             this.form.get("tipo").value)
                                   .subscribe((data : any) => {
                                        if(data!= null) {
                                            data.map(x => {

                                                let r = new RelatorioCaixa();
                                                    r.codigo     = x.SEQFORNECEDOR;
                                                    r.fornecedor = x.FANTASIA;
                                                    r.modelo     = x.MODELO;
                                                    r.data       = x.DATA;
                                                    r.saida      = x.SAIDA;
                                                    r.saldo      = x.SALDO;
                                                    r.retorno    = x.RETORNO;
                                                    r.valor      = x.VALORTOTAL;

                                                    this.grid.push(r);
                                            });

                                            this.dataSource           = new MatTableDataSource<RelatorioCaixa>(this.grid);
                                            this.dataSource.paginator = this.paginator;
                                            this.dataSource.sort      = this.sort;
                                            this.sizeItensPages       = this.grid.length;
                                        }
                                   }));

        }

        this.error.showError(this.form);

        this.form.controls['datainicio'].disable();
        this.form.controls['datafim'].disable();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this._subscriptions.forEach(x => {
           x.unsubscribe();
        });
    }

    limpaData(id){
        if(id == "SALDO") {
            this.form.get("datainicio").setValue(null);
            this.form.get("datafim").setValue(null);
        }else{
            if(this.form.get("datainicio").value == null || this.form.get("datafim").value == null) {
              this.form.get("datainicio").setValue(this.defaultDate);
              this.form.get("datafim").setValue(this.defaultDate);
            }
        }
    }


    exportParaExcel(event) {

        if(this.grid.length > 0){
            this.validGrid = this.grid;
        }

        this.excelService.exportAsExcelFile(this.validGrid, 'Relatório');
   }
}
