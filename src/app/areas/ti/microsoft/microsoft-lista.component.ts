
import { Component, OnInit, ViewChild, EventEmitter, OnDestroy } from "@angular/core";
import { Microsoft } from "../../../shared/models/Microsoft";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Parametro, DbConsultModel } from "../../../shared/models/Service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { AppInfoService } from "../../../shared";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { MicrosoftService } from "./microsoft.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { Unidade } from '../../../shared/models/Unidade';
import { UserService } from '../../../shared/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ExcelService } from "../../../shared/util/excel-service";
import { Subscription } from "rxjs";

//import swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
	selector: "app-ti-microsoft-lista",
	templateUrl: "./microsoft-lista.component.html",
	styleUrls: ["./microsoft-lista.component.scss"],
	providers: []
})

export class MicrosoftListaComponent implements OnInit, OnDestroy {
	private _tel: Microsoft[] = [];
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
		private serviceMicrosoft: MicrosoftService,
		private spinner: SpinnerVisibilityService,
		private excelService: ExcelService,
		private activatedRoute: ActivatedRoute) {

		this._tel = new Array<Microsoft>();
		this.unidades = user.getUnidadePerm();
		this.form = this.fb.group({
			//codigo            : new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			demitido: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			auditoria: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			sequnidade: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
		});
	}

	displayedColumns = ['CODIGO', 'CHAPA', 'NOME', 'CR', 'EMAIL', 'EDITAR', 'DELETAR'];
	dataSource = new MatTableDataSource<Microsoft>(this._tel);

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
				this.carregaMicrosoft(sequnidade);

			} else {

				this.form.get("auditoria").setValue('T');
				this.form.get("demitido").setValue('T');
			}
		});
		this.carregaMicrosoft(0);
	}

verDetalhe(id) {
	let auditoria = this.form.get("auditoria").value;
	let demitido = this.form.get("demitido").value;
	let link = ['/admin/ti/microsoft/editar', id, auditoria, demitido];
	this.router.navigate(link);

	//this._buscaChange.emit('');
}

deletar(id) {
	this.spinner.show();
	this._subscriptions.push(this.serviceMicrosoft.deletar(id).subscribe((res: string) => {

		if (res[0]) {
			this.ngOnInit();
		}

		this.spinner.hide();
	}));
}

novo() {
	let link = ['/admin/ti/microsoft/novo'];
	this.router.navigate(link);
	//this._buscaChange.emit('');
}

applyFilter(filterValue: string) {
	filterValue = filterValue.trim(); // Remove whitespace
	filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
	this.dataSource.filter = filterValue;
}

onChange(event){

	this.carregaMicrosoft(null);

}

limparMicrosoft() {
	let link = ['/admin/ti/microsoft/lista'];
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

carregaMicrosoft(sequnidade){
	this._tel = [];
	this.spinner.show();
	this._subscriptions.push(this.serviceMicrosoft.getMicrosoft("0", null, (sequnidade != null) ? sequnidade : this.form.get("sequnidade").value).subscribe((data: Microsoft[]) => {

		if (data != null) {

			this.setFiltrar(data).forEach(t => {
				let m = new Microsoft();
				m.SEQMICROSOFT			    = t.SEQMICROSOFT;
				m.SEQUNIDADE				= t.SEQUNIDADE;
				m.CHAPA  					= t.CHAPA;
				m.NOME						= t.NOME;
				m.CCUSTO_DESCRICAO_C5		= t.CCUSTO_DESCRICAO_C5;
				m.EMAIL                     = t.EMAIL;
				m.SITUACAO					= t.SITUACAO;
				m.POWERBIFREE				= t.POWERBIFREE;
				m.CHECKIN_PWBF				= t.CHECKIN_PWBF;
				m.DTALIBERACAO_PWBF     	= t.DTALIBERACAO_PWBF;
				m.POWERBIPRO            	= t.POWERBIPRO;
				m.CHECKIN_PWBP				= t.CHECKIN_PWBP;
				m.DTALIBERACAO_PWBP     	= t.DTALIBERACAO_PWBP;
				m.EXCHANGEKIOSK         	= t.EXCHANGEKIOSK;
				m.CHECKIN_EK            	= t.CHECKIN_EK;
				m.DTALIBERACAO_EK       	= t.DTALIBERACAO_EK;
				m.EXCHENGEPLANO1        	= t.EXCHENGEPLANO1;
				m.CHECKIN_EP1           	= t.CHECKIN_EP1;
				m.DTALIBERACAO_EP1      	= t.DTALIBERACAO_EP1;
				m.EXCHENGEPLANO2        	= t.EXCHENGEPLANO2;
				m.CHECKIN_EP2           	= t.CHECKIN_EP2;
				m.DTALIBERACAO_EP2      	= t.DTALIBERACAO_EP2;
				m.SHAREPOINTPLANO2      	= t.SHAREPOINTPLANO2;
				m.CHECKIN_SPP2          	= t.CHECKIN_SPP2;
				m.DTALIBERACAO_SPP2     	= t.DTALIBERACAO_SPP2;
				m.OFFICE365BUSINESS     	= t.OFFICE365BUSINESS;
				m.CHECKIN_OFB           	= t.CHECKIN_OFB;
				m.DTALIBERACAO_OFB      	= t.DTALIBERACAO_OFB;
				m.MICROSOFTFLOWFREE     	= t.MICROSOFTFLOWFREE;
				m.CHECKIN_MFF             	= t.CHECKIN_MFF;
				m.DTALIBERACAO_MFF     		= t.DTALIBERACAO_MFF;
				m.MICROSOFTPOWERAPPSPLAN2TRIAL = t.MICROSOFTPOWERAPPSPLAN2TRIAL;
				m.CHECKIN_MPP2T            	= t.CHECKIN_MPP2T;
				m.DTALIBERACAO_MPP2T        = t.DTALIBERACAO_MPP2T;
				m.MICROSOFT365E3			= t.MICROSOFT365E3;
				m.DTALIBERACAO_M365E3		= t.DTALIBERACAO_M365E3;
				m.CHECKIN_M365E3		    = t.CHECKIN_M365E3;
				m.PROJECTONLINEPROFISSIONAL = t.PROJECTONLINEPROFISSIONAL;
				m.CHECKIN_POP            	= t.CHECKIN_POP;
				m.DTALIBERACAO_POP       	= t.DTALIBERACAO_POP;
				m.OFFICE365EXTRAFILASTORAFE = t.OFFICE365EXTRAFILASTORAFE;
				m.CHECKIN_OFEFS             = t.CHECKIN_OFEFS;
				m.DTALIBERACAO_OFEFS        = t.DTALIBERACAO_OFEFS;
				m.VISIOONLINE               = t.VISIOONLINE;
				m.CHECKIN_VO                = t.CHECKIN_VO;
				m.DTALIBERACAO_VO           = t.DTALIBERACAO_VO;
				m.VISIOONLINEPLAN2          = t.VISIOONLINEPLAN2;
				m.CHECKIN_VOP2              = t.CHECKIN_VOP2;
				m.DTALIBERACAO_VOP2         = t.DTALIBERACAO_VOP2;
				m.AUDITORIA					= t.AUDITORIA;
				this._tel.push(m);
			});

			this.totalSize = this._tel.length;
			this.dataSource = new MatTableDataSource<Microsoft>(this._tel);
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

atualizarAuditado(seqmicrosoft){
	let microsoft = new Microsoft();
	microsoft.SEQMICROSOFT = seqmicrosoft;

	this._subscriptions.push(this.serviceMicrosoft.setAuditoria(microsoft).subscribe((data: string) => {
		this.carregaMicrosoft(this.form.get("sequnidade").value);
	}));
}

exportParaExcel(event) {

	if (this._tel.length > 0) {
		this.excelService.exportAsExcelFile(this._tel, 'ListaMicrosoftOba');
	}

}

ngOnDestroy() {
	// unsubscribe to ensure no memory leaks
	this._subscriptions.forEach(x => {
		x.unsubscribe();
	});
}

}

