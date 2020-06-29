import { PesquisaService } from './pesquisa.service';
import { Checkbox } from '../../../shared/models/Components';
import { Component, Inject, ViewChild, OnInit, Pipe, PipeTransform, OnDestroy } from "@angular/core";

import { AppInfoService } from "../../../shared";
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { Parametro, DbConsult, DbConsultModel } from "../../../shared/models/Service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { Funcionario, FuncGrid } from "../../../shared/models/Funcionario";
import { SpinnerVisibilityService } from "ng-http-loader";
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: "app-ti-pesquisa",
	templateUrl: "./pesquisa.component.html",
	styleUrls: ["./pesquisa.component.scss"],
	providers: []
})
export class PesquisaComponent implements OnInit, OnDestroy {
    private _subscriptions: Array<Subscription> = [];
	private _dbConsult: DbConsultModel;
	//title = this.appInfo.title;
	form: FormGroup;
	private _funcGrid: FuncGrid[] = [];
	public checkboxList: Checkbox[];
	private situacao: string[] = [];


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private appInfo: AppInfoService, private fb: FormBuilder, private consult: ConsultAPIService, private spinner: SpinnerVisibilityService, private pesquisaService : PesquisaService) {
		this._dbConsult = new DbConsultModel();

		this.form = fb.group({
			chapa: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			checkbox: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/])
		});

	}

	displayedColumns = ['unidade', 'chapa', 'nome', 'cargo', 'depto', 'empresa', 'usercomp', 'situacao'];
	dataSource = new MatTableDataSource<FuncGrid>(this._funcGrid);


	ngOnInit() {
		this.carregaChekbox();
	}

	carregaChekbox(){
        this.situacao = new Array<string>();
		this._dbConsult.model = new DbConsult();
		this._dbConsult.model.objeto = "p_getFuncSitDW";
		this._dbConsult.model.package = "pkg_api_usuario";
		this._dbConsult.model.tiporetorno = "121";
		this._dbConsult.model.retorno = "r_result";

		let parametro = new Parametro();
		parametro.nome = "pr_param";
		parametro.valor = "null";
		this._dbConsult.model.parameters = new Array<Parametro>();
		this._dbConsult.model.parameters.push(parametro);

		this._subscriptions.push(this.consult.post(JSON.stringify(this._dbConsult), 0).subscribe((res: DbConsult) => {
			this.checkboxList = new Array<Checkbox>();
			let resp = res.obj.json as string[];
			resp.map(check => {
				let checkbox = new Checkbox();
				checkbox.text = check["SITUACAO"];

				this.checkboxList.push(checkbox);
			});
		}));
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	toggle(event) {
		this.spinner.show();
		let array_filtrado = [];
		let array = [];
		if (event.checked) {
			this.situacao.push(event.source.value);
		} else {
			const index: number = this.situacao.indexOf(event.source.value);
			this.situacao.splice(index, 1);
		}

		array = this._funcGrid;
		array_filtrado = array.filter(x => this.situacao.indexOf(x.situacao) !== -1);

		if (this.situacao[0] == null) {
			array_filtrado = this._funcGrid;
		}

		this.dataSource = new MatTableDataSource<FuncGrid>(array_filtrado);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.spinner.hide();
	}

	submit() {
		if (this.form.valid) {
			this.carregaChekbox();

			    this.spinner.show();
			    this._subscriptions.push(this.pesquisaService.getFornecItens(this.form.get("chapa").value.toUpperCase()).subscribe((x : FuncGrid[]) => {

					this.dataSource = new MatTableDataSource<FuncGrid>(x);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;

					this._funcGrid = x;

					this.spinner.hide();
				}));


		}
	}

	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this._subscriptions.forEach(x => {
		x.unsubscribe();
		});
    }

}


