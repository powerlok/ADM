import { ProdMonitorado, Embalagem, Custo, Motivo } from '../../../shared/models/Produto';
import { CadastroEmpresaDw } from "../../../../app/shared/models/CadastroEmpresaDw";
import { Empresa } from '../../../shared/models/Empresa';
import { Component, OnInit,  ViewChild, OnDestroy, EventEmitter, Output, ElementRef } from '@angular/core';
import {  Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { Unidade } from '../../../shared/models/Unidade';
import { UserService } from '../../../shared/services/user.service';
import { ValidationErrorService } from '../../../shared/services/validation-error.service';
import { AlteraPrecoService } from './alterapreco.service';
import 'rxjs/add/operator/switchMap';
import { RodarJson } from '../../../shared/models/RodarJson';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';
import { SpinnerVisibilityService } from "ng-http-loader";
import { isNgTemplate } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CurrencyFormat } from '../../../shared/util/moeda';
import { ExcelService } from '../../../shared/util/excel-service';


interface Produtos {
    codproduto: number;
    nroempresa: number;
    qtdembalagem: number;
    preconovo: number;
    dtahoraagenda: string;
}

@Component({
    selector: 'app-alterapreco',
    templateUrl: './alterapreco.component.html',
    styleUrls: ['./alterapreco.component.scss'],
})
export class AlteraPrecoComponent implements OnInit, OnDestroy {
    empresas              : Array<Empresa> = [];
    unidades              : Array<Unidade> = [];
    motivos               : Motivo[] = [];
    form                  : FormGroup;
    filteredOptions       : ProdMonitorado[];
    embalagens            : Embalagem[];
    produtosFamilia       : ProdMonitorado[];
    produtosMonitorado    : ProdMonitorado[];
    hideCampos            : boolean = true;
    hideCamposDataHora    : boolean = true;
    hideGridFamilia       : boolean = true;
    hideGridMonitoramento : boolean = true;
    empresasDw            : Array<CadastroEmpresaDw> = [];
    cidades               : Array<CadastroEmpresaDw> = [];
    _cidades = [];
    _empresas             : Array<Empresa> = [];
    hideElement: boolean = true;
    _prod                 : Array<Produtos> = [];
    file                  : File;
	arrayBuffer           : any;
    _emp                  : Empresa[] = [];
    isChecked             : boolean;
    private _subscriptions: Array<Subscription> = [];
    sequnidade = 6;
    sequsuario = 0;

    selecao : number = 0;

    @ViewChild('f') myNgForm;

    displayedColumns = ['codigo', 'descricao','checkbox'];
    dataSource = new MatTableDataSource<ProdMonitorado>(this.produtosFamilia);
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild(MatSort, { static: false} as any) sort: MatSort;

    displayedColumnsMonitoramento = ['checkbox', 'alteracao', 'codigo', 'empresa', 'descricao', 'embalagem', 'categoria', 'custo', 'preconovo', 'datahoraagendada', 'deletar'];
    dataSourceMonitoramento = new MatTableDataSource<ProdMonitorado>(this.produtosMonitorado);
    @ViewChild('paginatorMonitoramento') paginatorMonitoramento: MatPaginator;
    @ViewChild(MatSort, { static: true} as any) sortMonitoramento: MatSort;

   // @Output() toggle = new EventEmitter<any[]>();
    constructor(private spinner: SpinnerVisibilityService, private fb: FormBuilder, private user: UserService, private error: ValidationErrorService, private alterPrecoServ: AlteraPrecoService, private excelService: ExcelService, private moedaFormat : CurrencyFormat) {
        //this.unidades = this.user.getUnidadePerm();
       // this.sequsuario = this.user.getUserModels().sequsuario;

       this.form = this.fb.group({
            cidade               : new FormControl('', []),
            checkAllEmpresas     : new FormControl('', [Validators.nullValidator]),
            empresa              : new FormControl('', [Validators.nullValidator]),
            monitorado           : new FormControl('', [Validators.nullValidator]),
            familia              : new FormControl('', [Validators.required]),
            datahoraAgendada     : new FormControl('', [Validators.nullValidator]),
            motivo               : new FormControl('', [Validators.nullValidator]),
            preconovo            : new FormControl('', [Validators.required]),
            agendaenvio          : new FormControl('', [Validators.nullValidator/*, Validators.minLength(6)*/]),
            custo                : new FormControl({disabled: true, value: ''}, [Validators.nullValidator/*, Validators.minLength(6)*/]),
            embalagem            : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            codigo               : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
            descricao            : new FormControl('', [Validators.nullValidator/*, Validators.minLength(6)*/]),
            filtro            : new FormControl('', [Validators.nullValidator/*, Validators.minLength(6)*/]),
           // sequnidade           : new FormControl('', [Validators.required/*, Validators.minLength(3)*/])
        });


    }

    convert(data: string) {
        const leftPad = (s, c, n) =>{ s = s.toString(); c = c.toString(); return s.length > n ? s : c.repeat(n - s.length) + s; }
        const date = new Date(data);
        const day = leftPad(date.getDate().toString(),'0',2);
        const month = leftPad((date.getMonth() + 1).toString(),'0',2);
        const year = date.getFullYear();

        const h =  leftPad(date.getHours().toString(),'0',2);
        const m =  leftPad(date.getMinutes().toString(),'0',2);
        //const s =  leftPad(date.getSeconds().toString(),'0',2);

        return `${day}/${month}/${year} ${h}:${m}`
      }

    incomingfile(event) {
		if (event.target.files && event.target.files[0]) {
            this.file = event.target.files[0];

			let fileReader = new FileReader();
            this.spinner.show();

			fileReader.onload = (e) => {
                this.arrayBuffer = fileReader.result;

				let data = new Uint8Array(this.arrayBuffer);
				let arr = new Array();
				for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
				let bstr = arr.join("");
				let workbook = XLSX.read(bstr, { type: "binary", cellDates:true, cellNF: false, cellText:false  });
			    //let i = 0;
				workbook.SheetNames.forEach(element => {
                    let worksheet : XLSX.WorkSheet = workbook.Sheets[element];

                    let json = XLSX.utils.sheet_to_json(worksheet, { raw: true, header: ["nroempresa", "codproduto", "qtdembalagem", "preconovo", "dtahoraagenda"], defval: null, range:1 });
                    this._prod = JSON.parse(JSON.stringify(json));

                });

            }

                fileReader.readAsArrayBuffer(this.file);

			    fileReader.onloadend = (e) => {

                   // let empresas = Array.from(new Set(this._prod.filter(x => x.nroempresa).map(opt => opt.nroempresa)));
                   // let produtos = Array.from(new Set(this._prod.filter(x => x.codproduto).map(opt => opt.codproduto)));

                    let requets = [];
                    let w  = 0;
                    this._prod.forEach((p, i) => {
                       // console.log(p);


                        requets.push(this.alterPrecoServ.salvarVarios(p.codproduto,
                                                                      p.qtdembalagem,
                                                                      p.preconovo,
                                                                      (p.dtahoraagenda) ? this.convert(p.dtahoraagenda) : '',
                                                                      this.user.getUserModels().sequsuario,
                                                                      [p.nroempresa],
                                                                      this.sequnidade,
                                                                      [p.codproduto],
                                                                      0));

                                                                      w++;
                    });



                        this._subscriptions.push(forkJoin(requets).subscribe(results => {
                        this.alterPrecoServ.getRequest(results);
                        this.limpar();
                        this.spinner.hide();
                        this._prod = [];
                        requets = [];
                        event.target.value = '';
                        }));


            }
		}
    }
    /*filterGroup(sequnidade: number, seqproduto: number, desc: Params): Observable<ProdMonitorado[]> {
        let obs = new Observable<any>();
        let r = new RodarJson();

        if(desc != null) {

            r = {
                obj  : [{ sequnidade : sequnidade, desc : null, seqproduto : 0 }],
                tipo : "BUSCAPRODUTO",
                json : null
            };

            if(desc.length > 4) obs = this.alterPrecoServ.getProduto(r);

          if(Number(desc)){

                r = {
                    obj: [{ sequnidade : sequnidade, desc : null, seqproduto : Number(desc) }],
                    tipo : "BUSCAPRODUTO",
                    json : null
                };

                if(desc.length > 2) obs = this.alterPrecoServ.getProduto(r);

            }else{

                throw 'Apenas numeros';

                r = {
                    obj  : [{ sequnidade : sequnidade, desc : (desc != undefined) ? desc.toLowerCase() : null, seqproduto : 0 }],
                    tipo : "BUSCAPRODUTO",
                    json : null
                };

                if(desc.length > 4) obs = this.alterPrecoServ.getProduto(r);
            }
        }

        return obs;
    }*/

    ngOnInit() {

        //this.unidades = this.user.getUnidadePerm();

       /* this._subscriptions.push(this.form.get("codigo").valueChanges
                                        .switchMap((params : Params) =>  this.filterGroup(this.sequnidade, 0, params))
                                        .subscribe(
                                                val => {
                                                this.filteredOptions = val;
                                                }
                                            ));*/
    }

    ngAfterViewInit() {

        /*this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSourceMonitoramento.paginator = this.paginatorMonitoramento;
        this.dataSourceMonitoramento.sort = this.sortMonitoramento;*/

        this.getGridMonitoramento();
	}

    onKeypress(event){
        if (event.keyCode == 13) {

        var codigo = event.target.value;

        this.carregaInformacoesTela();


        if(Number(codigo)) {
            this._subscriptions.push(this.alterPrecoServ.getProdutoMonitorado(codigo, this.sequnidade).subscribe((x : ProdMonitorado[]) => {
                    x.map(prod => {
                        if(prod.SEQPRODUTO > 0 && this.sequnidade > 0) {
                            this.form.get('descricao').setValue(prod.DESCCOMPLETA);
                            this.form.get('codigo').setValue(codigo);

                            //carrega embalagem
                            this._subscriptions.push(this.alterPrecoServ.getEmbalagem(this.sequnidade, prod.SEQPRODUTO).subscribe((e : Embalagem[]) => {
                                this.embalagens = e;

                                this.selecao = this.embalagens.map(x => x).find(y => Math.max.apply(y.QTDEEMBALAGEM)).QTDEEMBALAGEM;

                            }));

                            //carrega todos os produtos da familia
                            this._subscriptions.push(this.alterPrecoServ.getFamilia(this.sequnidade, prod.SEQFAMILIA, "0").subscribe((f : ProdMonitorado[]) => {
                                    this.produtosFamilia = f;
                                    this.dataSource = new MatTableDataSource<ProdMonitorado>(this.produtosFamilia);

                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;

                                    this.hideGridFamilia = false;
                            }));
                        }
                    });

            }));

        }else{
            this.form.get('descricao').setValue(null);
            this.form.get('codigo').setValue(null);
        }
      }
    }

    carregaInformacoesTela() {
        this.hideCampos = true;

        this.limpar();

        if (this.sequnidade > 0) {
           this.hideCampos = false;
        }else{
           this.hideCampos = true;
        }

        this.hideGridFamilia = true;
        this.produtosFamilia = [];


        this.empresas = this.user.getEmpresaPermUnid(this.sequnidade);

        this._emp = this.empresas;

        this.alterPrecoServ.getCidadesPorUnidade(this.sequnidade).subscribe((x: CadastroEmpresaDw[]) => {
            this.empresasDw = x;
            this.cidades = _.uniqBy(x, 'CIDADE');

        });


        this._subscriptions.push(this.alterPrecoServ.getMotivo(this.sequnidade).subscribe((x : Motivo[]) => {
            this.motivos = x;
        }));

        this.getGridMonitoramento();

    }

    private getGridMonitoramento()
    {
        //monta o grid com os produtos cadastrados no monitoramento
        this._subscriptions.push(this.alterPrecoServ.getMonitoramento(this.sequnidade).subscribe((m : ProdMonitorado[]) => {
            this.produtosMonitorado = m;
            this.dataSourceMonitoramento = new MatTableDataSource<ProdMonitorado>(this.produtosMonitorado);

            this.dataSourceMonitoramento.paginator = this.paginatorMonitoramento;
            this.dataSourceMonitoramento.sort = this.sortMonitoramento;

            this.hideGridMonitoramento = false;
        }));
    }

    onChangeEmbalagem(event)
    {
        if(event > 0) {

            //carrega custo do produto
            this._subscriptions.push( this.alterPrecoServ.getCusto(this.sequnidade, this.form.get("codigo").value, event/*, 97*/).subscribe((x : Custo[]) => {
                this.form.get("custo").setValue(x[0].CUSTO);
            }));
        }
    }

    onChangeAgendaEnvio(event)
    {
       if(event.checked) {
         this.hideCamposDataHora = false;
       }else{
         this.hideCamposDataHora = true;
       }
    }

    get empArr() {
      return this.form.get('empresa') as FormArray;
    }

    checkAll(event, cidade) {
        var nroempresa : number[] = [];

        if(cidade == 0 || this.isChecked) {
            if (event.checked == true) {
                this.form.patchValue({cidade:true});

                this.empresasDw.map(x => {
                    this.cidades.map((j, i) => {

                        if(j.CIDADE == x.CIDADE){
                            nroempresa.push(Number(x.NROEMPRESA));
                        }
                    });
                });

                this.empresas = [];
                this._emp.map(x => {
                    let i = nroempresa.indexOf(x.nroEmpresa);

                    if(i > -1){
                        x.checked = true;
                        this.empresas.push(x);

                    }
                });

            } else {
                this.form.patchValue({cidade:false});

                this.empresas = this.user.getEmpresaPermUnid(this.sequnidade);

                this.empresas = [];
                this.empresas.map(x => {
                    let i = nroempresa.indexOf(x.nroEmpresa);

                    if(i > -1){
                        x.checked = true;
                        this.empresas.push(x);
                    }
                });


                this.isChecked= false;
            }

        }else {


            if (event.checked == true) {
                this._cidades.push(cidade);
            }else{
                let c = this._cidades;
            //  console.log(cidade);
                for (var i=c.length-1; i>=0; i--) {

                    if (c[i] === cidade) {
                        c.splice(i, 1);
                    }
                }
            }

            this.empresasDw.map(x => {
                this._cidades.map((i) => {
                 //   console.log(i);
                    if(i === x.CIDADE){
                        nroempresa.push(Number(x.NROEMPRESA));
                    }
                });
            });

            this.empresas = [];
            this._emp.map(x => {
                let i = nroempresa.indexOf(x.nroEmpresa);

                if(i > -1){
                    x.checked = true;
                    this.empresas.push(x);

                }
            });

        }
      //  }
    }

    marcarEmpresasPorCidade(nroempresa : CadastroEmpresaDw[], event){
        /*this._empresas = this.empresas;

        this.empresas = [];

        this._empresas.map((x) => {
            nroempresa.map((y) => {
                if(x.refexterno == y.NROEMPRESA) {
                   x.checked = true;
                }
            });

            this.empresas.push(x);
        });*/

       // console.log(this.form.get("items") );
        nroempresa.map((y) => {
            let element = this.empresas.find((x) => x.refexterno == y.NROEMPRESA);

            const chkArray = < FormArray > this.form.get('empresa');

            if(element) {
               // console.log(chkArray);
            }
        });
    }

    checkAllGridFamilia(event) {
        if (event.checked == true) {
            this.produtosFamilia.map(x => { x.CHECKED = true; });
        } else {
            this.produtosFamilia.map(x => { x.CHECKED = false; });
        }
    }

    checkAllGridMonitorados(event){

        var dataMonitoramento = this.dataSourceMonitoramento;

        if (event.checked == true) {
            dataMonitoramento.filteredData.map(x => { x.CHECKED = true; });
        } else {
            dataMonitoramento.filteredData.map(x => { x.CHECKED = false; });
        }

    }

    delete(seqalteracao : number, seqproduto: number){

        if(this.sequnidade > 0) {
            this._subscriptions.push(this.alterPrecoServ.deletar(this.sequnidade, seqalteracao, seqproduto)
                            .subscribe((res : string) => {
                                    if (res) {
                                        this.limpar();
                                    }
                                }));
        }else{
            this.error.showError(this.form);
        }
    }

    deleteSelecionados(){

        this.produtosMonitorado.filter(x => x.CHECKED == true).map((x) => {
            if(x.CHECKED == true){
                this._subscriptions.push(this.alterPrecoServ.deletar(this.sequnidade, x.SEQALTERACAO, x.SEQPRODUTO)
                .subscribe((res : string) => {
                    if (res) {
                        this.limpar();
                    }
                }));
            }
        });
    }

    submit()
    {
        if(this.form.valid)
        {

            this._subscriptions.push(this.alterPrecoServ.salvar(this.form.get("codigo").value,
                                    this.form.get("embalagem").value,
                                    this.form.get("preconovo").value,
                                    this.form.get("datahoraAgendada").value,
                                    this.user.getUserModels().sequsuario,
                                    this.empresas.filter(x => x.checked).map(opt => opt.nroEmpresa),
                                    this.sequnidade,
                                    this.produtosFamilia.filter(x => x.CHECKED).map(opt => opt.SEQPRODUTO),
                                    this.form.get("motivo").value)
                               .subscribe((res : string) => {
                                    if (res) {
                                        this.limpar();

                                    }
                               }));

        }

        this.error.showError(this.form);
    }

    private limpar(){
        this.getGridMonitoramento();
        this.form.get("codigo").setValue('');
        this.form.get("descricao").setValue('');
        this.form.get("embalagem").setValue('');
        this.form.get("datahoraAgendada").setValue('');
        this.form.get("custo").setValue('');
        this.form.get("preconovo").setValue('');
        this.form.get("motivo").setValue('');

        this.hideGridFamilia = true;
        this.produtosFamilia = [];
    }

    private limparEmpresas() {
        this.empresas.map(x => { x.checked = false; });
        this.form.patchValue({'checkAllEmpresas': false });
    }

    exportParaExcel(event) {
       this.excelService.exportAsExcelFile([{nroempresa: '', codproduto:'', qtdembalagem: '', preconovo: '', dtahoraagenda: ''}], 'Produtos');
    }

	applyFilter(filterValue: string) {
        this.dataSourceMonitoramento.filter = filterValue.trim().toLowerCase();
	}

    ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this._subscriptions.forEach(x => {
		x.unsubscribe();
		});
    }
}
