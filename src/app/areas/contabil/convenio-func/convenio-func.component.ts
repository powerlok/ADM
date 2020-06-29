import { UserService } from '../../../shared/services/user.service';
import { Component, Inject, ViewChild, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from "@angular/forms";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { Log, CbPeriodo, ComparaConvCompra } from "../../../shared/models/ConvenioFunc";
import { ConvenioFuncService } from "./convenio-func.service";
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: "app-contabil-convenio-func",
	templateUrl: "./convenio-func.component.html",
	styleUrls: ["./convenio-func.component.scss"],
	providers: []
})
export class ConvenioFuncComponent implements OnDestroy {
	//public _contabFolha		: ConvenioFuncService;
	public _error			: ValidationErrorService;
	private log			    : Log[] = [];
	public unidades 		= [];
	public periodos         : Array<CbPeriodo>;
	public compConvCompra   : ComparaConvCompra[] = [];
	totalSizeLog 		    : number = 0;
	totalSizeCompConvCompra : number = 0;

	private _subscriptions: Array<Subscription> = [];

	form: FormGroup;
	displayedColumns = ['log'];
	dataSource = new MatTableDataSource<Log>(this.log);
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	displayedColumns2 = ['seqpessoa', 'nomerazao', 'cpf', 'vlr_c5', 'vlr_rm'];
	dataSource2 = new MatTableDataSource<ComparaConvCompra>(this.compConvCompra);
	@ViewChild('paginator2') paginator2: MatPaginator;
	@ViewChild(MatSort) sort2: MatSort;


	constructor(private fb: FormBuilder, private convenioFuncServ: ConvenioFuncService, error: ValidationErrorService, private user : UserService) {
		this._error = error;
		this.periodos = new Array<CbPeriodo>();
		this.unidades = user.getUnidadePerm();

		this.form = fb.group({
			mes: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			ano: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			sequnidade: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			coligada: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			periodo: new FormControl('', [Validators.required/*, Validators.minLength(3)*/])
		});


	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource2.paginator = this.paginator2;
	}

	onChangeUnidade(id){
		this._subscriptions.push(this.convenioFuncServ.getPeriodo(id).subscribe((select : CbPeriodo[]) => this.periodos = select));
	}

	submit(log: string) {
		if (this.form.valid) {

			this._subscriptions.push(this.convenioFuncServ.integrar(this.form.get('sequnidade').value,
										   this.form.get('ano').value,
										   this.form.get('mes').value,
										   this.form.get('coligada').value,
										   this.form.get('periodo').value,
										   log).subscribe((log: Log[]) => {
													this.log = log;
													this.dataSource = new MatTableDataSource<Log>(log);
													this.dataSource.paginator = this.paginator;
													this.dataSource.sort = this.sort;
													this.totalSizeLog = this.log.length;

													this.convenioFuncServ.getCompConvCompra(this.form.get('sequnidade').value,
																							this.form.get('ano').value,
																							this.form.get('mes').value,
																							this.form.get('coligada').value,
																							this.form.get('periodo').value)
																		 .subscribe((c : ComparaConvCompra[]) => {
																			this.compConvCompra = c;
																			this.dataSource2 = new MatTableDataSource<ComparaConvCompra>(c);
																			this.dataSource2.paginator = this.paginator2;
																			this.dataSource2.sort = this.sort;
																			this.totalSizeCompConvCompra = this.compConvCompra.length;
																		 });
												}));
		} else {
			this._error.showError(this.form);
		}
	}


	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this._subscriptions.forEach(x => {
		x.unsubscribe();
		});
    }
}
