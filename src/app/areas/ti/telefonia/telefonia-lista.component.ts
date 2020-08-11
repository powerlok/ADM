
import { Component, OnInit, ViewChild, EventEmitter, OnDestroy } from "@angular/core";
import { Telefonia } from "../../../shared/models/Telefonia";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Parametro, DbConsultModel } from "../../../shared/models/Service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { AppInfoService } from "../../../shared";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { TelefoniaService } from "./telefonia.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { Unidade } from '../../../shared/models/Unidade';
import { UserService } from '../../../shared/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ExcelService } from "../../../shared/util/excel-service";
import { Subscription } from "rxjs";

//import swal from 'sweetalert2';

@Component({
	selector: "app-ti-telefonia-lista",
	templateUrl: "./telefonia-lista.component.html",
	styleUrls: ["./telefonia-lista.component.scss"],
	providers: []
})

export class TelefoniaListaComponent implements OnInit, OnDestroy {
	private _tel: Telefonia[] = [];
	selectedAll: any;
	names: any;
	totalSize: number;
	unidades: Unidade[] = [];
	form: FormGroup;
	private _subscriptions: Array<Subscription> = [];
	auditorias = [{ id: 'S', desc: 'Sim' }, { id: 'N', desc: 'Não' }, { id: 'T', desc: 'Todos' }];
	demitidos = [{ id: 'S', desc: 'Sim' }, { id: 'N', desc: 'Não' }, { id: 'T', desc: 'Todos' }];
	codigo: number[] = [];
	auditoria: string;
	demitido: string;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private fb: FormBuilder,
		private appInfo: AppInfoService,
		private consult: ConsultAPIService,
		private user: UserService,
		private router: Router,
		private serviceTelefonia: TelefoniaService,
		private spinner: SpinnerVisibilityService,
		private excelService: ExcelService,
		private activatedRoute: ActivatedRoute) {

		this._tel = new Array<Telefonia>();
		this.unidades = user.getUnidadePerm();
		this.form = this.fb.group({
			//codigo            : new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			demitido: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			auditoria: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			sequnidade: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
		});

	}

	displayedColumns = ['CODIGO', 'CHAPA', 'NOME', 'NROLINHA', 'APARELHO', 'IMEIAPARELHO', 'IMEISIMCARD', 'PLANOVOZ', 'PLANODADOS', 'UNIDADE', 'CENTROCUSTOC5', 'EDITAR', 'DELETAR'];
	dataSource = new MatTableDataSource<Telefonia>(this._tel);

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	ngOnInit() {

		this.activatedRoute.params.subscribe((params: Params) => {
			let sequnidade = params['un'];
			this.auditoria = params['auditar'];
			this.demitido = params['demitido'];

			if (sequnidade != '' && this.auditoria != '' && this.demitido != '' && sequnidade != undefined) {
				this.form.get("sequnidade").setValue(Number(sequnidade));
				this.form.get("auditoria").setValue(this.auditoria);
				this.form.get("demitido").setValue(this.demitido);
				this.carregaTelefonia(sequnidade);

			} else {

				this.form.get("auditoria").setValue('T');
				this.form.get("demitido").setValue('T');
			}
		});
		this.carregaTelefonia(0);
	}

verDetalhe(id) {
	let auditoria = this.form.get("auditoria").value;
	let demitido = this.form.get("demitido").value;
	let link = ['/admin/ti/telefonia/editar', id, auditoria, demitido];
	this.router.navigate(link);

	//this._buscaChange.emit('');
}

deletar(id) {
	this.spinner.show();
	this._subscriptions.push(this.serviceTelefonia.deletar(id).subscribe((res: string) => {

		if (res[0]) {
			this.ngOnInit();
		}

		this.spinner.hide();
	}));
}

novo() {
	let link = ['/admin/ti/telefonia/novo'];
	this.router.navigate(link);
	//this._buscaChange.emit('');
}

applyFilter(filterValue: string) {
	filterValue = filterValue.trim(); // Remove whitespace
	filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
	this.dataSource.filter = filterValue;
}

onChange(event){

	this.carregaTelefonia(null);

}

limparTelefonia() {
	let link = ['/admin/ti/telefonia/lista'];
	this.router.navigate(link);
}

setFiltrar(data){
	if (this.form.get("demitido").value == 'N') {
		data = data.filter(x => x.SITUACAO !== 'Demitido');
	} else if (this.form.get("demitido").value === 'S') {
		data = data.filter(x => x.SITUACAO === 'Demitido');
	}

	if (this.form.get("auditoria").value == 'N') {
		data = data.filter(x => x.AUDITORIA !== 'S');
	} else if (this.form.get("auditoria").value === 'S') {
		data = data.filter(x => x.AUDITORIA === 'S');
	}

	return data;
}

carregaTelefonia(sequnidade){
	this._tel = [];
	this.spinner.show();
	this._subscriptions.push(this.serviceTelefonia.getTelefonia("0", null, (sequnidade != null) ? sequnidade : this.form.get("sequnidade").value).subscribe((data: Telefonia[]) => {

		if (data != null) {

			this.setFiltrar(data).forEach(tel => {
				let telefonia = new Telefonia();
				telefonia.NROLINHA = tel.NROLINHA.trim(),
					telefonia.APARELHO = (tel.APARELHO != null) ? (tel.APARELHO == 'P') ? 'Próprio' : 'Empresa' : null;
				telefonia.IMEIAPARELHO = tel.IMEIAPARELHO,
					telefonia.IMEISIMCARD = tel.IMEISIMCARD,
					telefonia.PLANOVOZ = tel.PLANOVOZ,
					telefonia.PLANODADOS = tel.PLANODADOS,
					telefonia.CHAPA = tel.CHAPA;
				telefonia.NOME = tel.NOME;
				telefonia.SEQTELEFONIA = tel.SEQTELEFONIA;
				telefonia.UNIDADE = tel.UNIDADE;
				telefonia.FUNCAO = tel.FUNCAO;
				telefonia.SITUACAO = tel.SITUACAO;
				telefonia.CENTROCUSTOC5 = tel.CENTROCUSTOC5;
				telefonia.AUDITAR = tel.AUDITORIA;
				this._tel.push(telefonia);
			});

			this.totalSize = this._tel.length;
			this.dataSource = new MatTableDataSource<Telefonia>(this._tel);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		}
		this.spinner.hide();
	}));
}

/*selectAll() {
	for (var i = 0; i < this.form..length; i++) {
	  this.names[i].selected = this.selectedAll;
	}
  }
checkIfAllSelected() {
	this.selectedAll = this.names.every(function(item:any) {
	return item.selected == true;
	})
}*/

atualizarAuditado(seqtelefonia){

	let telefonia = new Telefonia();
	telefonia.SEQTELEFONIA = seqtelefonia;

	this._subscriptions.push(this.serviceTelefonia.setAuditoria(telefonia).subscribe((data: string) => {
		//this.carregaTelefonia(this.form.get("sequnidade").value);
	}));
}

exportParaExcel(event) {

	if (this._tel.length > 0) {
		this.excelService.exportAsExcelFile(this._tel, 'ListaTelefoniaOba');
	}

}

ngOnDestroy() {
	// unsubscribe to ensure no memory leaks
	this._subscriptions.forEach(x => {
		x.unsubscribe();
	});
}

}

