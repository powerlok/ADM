import { Component, ViewChild, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
<<<<<<< HEAD
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
=======
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
import { RelatorioCaixa, ControlePorFornec, ControleDevCaixa } from "../../../shared/models/ControleDevCaixa";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { RelatorioCaixaService } from "./relatorio.service";
import { DateOracle } from "../../../shared/util/date-format";
import { Subscription, Observable } from "rxjs";
import { Params } from "@angular/router";
<<<<<<< HEAD
import { isArray } from "jquery";
import { EntradaSaidaCaixaService } from "../entrada_saida/entradasaida.service";
import { ExcelService } from '../../../shared/util/excel-service';
=======
import { EntradaSaidaCaixaService } from "../entrada_saida/entradasaida.service";
import { ExcelService } from '../../../shared/util/excel-service';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { isArray } from 'jquery';
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

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

<<<<<<< HEAD
    displayedColumns = ['codigo', 'fornecedor', 'modelo', 'data', 'saida', 'retorno', 'saldo', 'valor'];    
=======
    displayedColumns = ['codigo', 'fornecedor', 'modelo', 'data', 'saida', 'retorno', 'saldo', 'valor'];
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    dataSource = new MatTableDataSource<RelatorioCaixa>(this.grid);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private _subscriptions: Array<Subscription> = [];

<<<<<<< HEAD
    constructor(private fb: FormBuilder, 
                private error: ValidationErrorService, 
                private relatorioCaixaServ : RelatorioCaixaService, 
                private dateFormat: DateOracle, 
                private entradaSaidaServ: EntradaSaidaCaixaService, 
                private excelService: ExcelService) {

        this.tipos = [{ id: 'SAIDA', text: 'Saída' }, { id: 'ENTRADA', text: 'Entrada' }, { id: 'SALDO', text: 'Saldo' }];
              
        this.grid = new Array<RelatorioCaixa>();

        this.form = this.fb.group({
            
=======
    constructor(private fb: FormBuilder,
                private error: ValidationErrorService,
                private relatorioCaixaServ : RelatorioCaixaService,
                private dateFormat: DateOracle,
                private entradaSaidaServ: EntradaSaidaCaixaService,
                private excelService: ExcelService) {

        this.tipos = [{ id: 'SAIDA', text: 'Saída' }, { id: 'ENTRADA', text: 'Entrada' }, { id: 'SALDO', text: 'Saldo' }];

        this.grid = new Array<RelatorioCaixa>();

        this.form = this.fb.group({

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
            tipo      : new FormControl('', [Validators.required]),
            datafim   : new FormControl({ disabled: true, value: '' }, [Validators.nullValidator]),
            datainicio: new FormControl({ disabled: true, value: '' }, [Validators.nullValidator]),
            codfornec : new FormControl('', [Validators.nullValidator]),
            fornecedor:  new FormControl({ disabled: true, value: '' }, [Validators.nullValidator]),
<<<<<<< HEAD
        });        
        
=======
        });

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        this.form.controls["datainicio"].setValue(this.defaultDate);
        this.form.controls["datafim"].setValue(this.defaultDate);
    }

    ngOnInit(){
        this._subscriptions.push(this.form.get("codfornec").valueChanges
        .switchMap((params : Params) =>  this.filterGroupFornec(params))
<<<<<<< HEAD
        .subscribe((val : any) => {  
                   
=======
        .subscribe((val : any) => {

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
            this.filteredOptionsFornec = new Array<ControlePorFornec>();

            if(isArray(val)) {
                if(val.length > 0) {
<<<<<<< HEAD
                    val.map(m => { 
                        let  c               = new  ControlePorFornec();
                             c.seqfornecedor = m.SEQFORNECEDOR;
                             c.nome          = m.NOMERAZAO; 
    
                            this.filteredOptionsFornec.push(c); 
                    });    
                }
            }                               
                    
=======
                    val.map(m => {
                        let  c               = new  ControlePorFornec();
                             c.seqfornecedor = m.SEQFORNECEDOR;
                             c.nome          = m.NOMERAZAO;

                            this.filteredOptionsFornec.push(c);
                    });
                }
            }

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        }));
    }

    filterGroupFornec(desc: Params): Observable<ControlePorFornec[]> {
<<<<<<< HEAD
        let obs = new Observable<any>();      
=======
        let obs = new Observable<any>();
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

        if(desc != null && ((Number(desc) && Number(desc) >= 1 || (!Number(desc) && desc.toString().length > 4)))) {
            let f = new ControleDevCaixa();
            f.obj = "FORNECEDOR";
<<<<<<< HEAD
            f.fornec.fornecedor  = (!Number(desc)) ? desc.toString() : null;     
            f.fornec.cpfcnpj = (Number(desc)) ? Number(desc) : 0;
            f.fornec.codigo =  0; 
            obs = this.entradaSaidaServ.execJson(f);
        }else{
           this.form.get("fornecedor").setValue(null);
        } 
=======
            f.fornec.fornecedor  = (!Number(desc)) ? desc.toString() : null;
            f.fornec.cpfcnpj = (Number(desc)) ? Number(desc) : 0;
            f.fornec.codigo =  0;
            obs = this.entradaSaidaServ.execJson(f);
        }else{
           this.form.get("fornecedor").setValue(null);
        }
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

        return obs;
    }

<<<<<<< HEAD
    onSelectChangeFornec(nome){          
=======
    onSelectChangeFornec(nome){
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
         this.form.get("fornecedor").setValue(nome);
    }

    ngAfterViewInit() {

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort      = this.sort;
    }

    pesquisar(){
<<<<<<< HEAD
        
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        this.form.controls['datainicio'].enable();
        this.form.controls['datafim'].enable()

        if(this.form.valid){
            this.grid = [];
<<<<<<< HEAD
           this._subscriptions.push(this.relatorioCaixaServ.execJson(this.form.get("codfornec").value, 
                                             this.dateFormat.get(this.form.get("datainicio").value), 
                                             this.dateFormat.get(this.form.get("datafim").value), 
                                             this.form.get("tipo").value)
                                   .subscribe((data : any) => {
                                        if(data!= null) {
                                            data.map(x => {                                 
=======
           this._subscriptions.push(this.relatorioCaixaServ.execJson(this.form.get("codfornec").value,
                                             this.dateFormat.get(this.form.get("datainicio").value),
                                             this.dateFormat.get(this.form.get("datafim").value),
                                             this.form.get("tipo").value)
                                   .subscribe((data : any) => {
                                        if(data!= null) {
                                            data.map(x => {
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

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
<<<<<<< HEAD
        
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
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
<<<<<<< HEAD
              this.form.get("datafim").setValue(this.defaultDate);            
=======
              this.form.get("datafim").setValue(this.defaultDate);
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
            }
        }
    }

<<<<<<< HEAD
    
    exportParaExcel(event) {
                
        if(this.grid.length > 0){
            this.validGrid = this.grid;
        }
        
        this.excelService.exportAsExcelFile(this.validGrid, 'Relatório');
   }
}
=======

    exportParaExcel(event) {

        if(this.grid.length > 0){
            this.validGrid = this.grid;
        }

        this.excelService.exportAsExcelFile(this.validGrid, 'Relatório');
   }
}
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
