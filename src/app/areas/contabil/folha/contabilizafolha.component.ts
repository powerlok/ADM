import { UserService } from '../../../shared/services/user.service';
import { Component, Inject, ViewChild, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from "@angular/forms";
import { ContabilizacaoService } from "./contabilizafolha.service";
import { Log } from "../../../shared/models/ContabilizacaoFolha";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: "app-contabil-contabilizafolha",
	templateUrl: "./contabilizafolha.component.html",
	styleUrls: ["./contabilizafolha.component.scss"],
	providers: []
})
export class ContabilizaFolhaComponent implements OnDestroy {
	public _error			: ValidationErrorService;
	private _log			: Log[] = [];
	public unidades = [];
	public recs = [{ id: 'S', desc: 'Sim' }, { id: 'N', desc: 'Não' }];
	isCarregarP: boolean = true;
	isCarregarSPDF: boolean = true;
	private _subscriptions: Array<Subscription> = [];

	form: FormGroup;
	displayedColumns = ['log'];
	dataSource = new MatTableDataSource<Log>(this._log);
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	_fb: FormBuilder;

	constructor(private fb: FormBuilder, private contabFolha: ContabilizacaoService, private error: ValidationErrorService, private user : UserService) {
		this._error = error;
	    this._log = new Array<Log>();
		this._fb = fb;
		this.unidades = user.getUnidadePerm();

		this.form = this.fb.group({
			mes: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			ano: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			sequnidade: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			matriz: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			coligada: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			recontabilizacao: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/])
		});


	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	submit(log : string) {
		if (this.form.valid) {

			this._subscriptions.push(this.contabFolha.contabilizarFolha(this.form.get('sequnidade').value,
												this.form.get('ano').value,
												this.form.get('mes').value,
												this.form.get('recontabilizacao').value,
												this.form.get('matriz').value,
												this.form.get('coligada').value,
												log
												).subscribe((data: object) => {
                                                    this._log = data as Log[];
													this.dataSource = new MatTableDataSource<Log>(this._log);
													this.dataSource.paginator = this.paginator;
													this.dataSource.sort = this.sort;
												}));
		} else {
			this._error.showError(this.form);
		}
	}

	onChange(id){

       if(id == 7){
		 this.isCarregarP = false;
		 this.isCarregarSPDF = true;
	   }else{
		 this.isCarregarSPDF = false;
		 this.isCarregarP = true;
	   }

	}

	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this._subscriptions.forEach(x => {
		x.unsubscribe();
		});
    }
}
