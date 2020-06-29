import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Telefonia } from "../../../shared/models/Telefonia";
import { TelefoniaService } from "./telefonia.service";
import { Unidade } from "../../../shared/models/Unidade";
import { UserService } from "../../../shared/services/user.service";
import { DialogService } from "../../../shared/services/dialog.service";
import { isNumber } from "util";
import { DateOracle, DateFormat } from "../../../shared/util/date-format";
import { UploadService } from "../../../../app/shared/services/upload.service";
import { Observable, Subscription, forkJoin } from 'rxjs';
import { saveAs } from 'file-saver/FileSaver';
@Component({
	selector: "app-ti-telefonia-form",
	templateUrl: "./telefonia-form.component.html",
	styleUrls: ["./telefonia-form.component.scss"],
	providers: []
})

export class TelefoneFormComponent implements OnInit, OnDestroy {
	form: FormGroup;
	tipos = {};
	private _router: Router;
	//private _buscaChange = new EventEmitter();
	private _subscriptions: Array<Subscription> = [];
	@ViewChild('f') myNgForm;
	unidades: Unidade[] = [];
	@ViewChild('file') file;
	public files: Set<File>;
	progress;
	selectedFile: File;
	arquivo: string;
	codigo: number;
	demitido: string;
	auditoria: string;

	constructor(fb: FormBuilder,
		router: Router,
		private serviceTelefonia: TelefoniaService,
		private activatedRoute: ActivatedRoute,
		private user: UserService,
		private dialog: DialogService,
		private dateFormat: DateOracle,
		private dateOriginal: DateFormat,
		public uploadService: UploadService) {

		this._router = router;
		//this._buscaChange = new EventEmitter();
		this.unidades = this.user.getUnidadePerm();

		this.form = fb.group({
			arquivo: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			checkin: new FormControl('', [Validators.nullValidator]),
			dtadevolucao: new FormControl({ disabled: true, value: '' }, [Validators.nullValidator]),
			dtaentrega: new FormControl({ disabled: true, value: '' }, [Validators.nullValidator]),
			nrolinha: new FormControl('', [Validators.required, Validators.maxLength(15)]),
			aparelhos: new FormControl('', [Validators.required]),
			imeiaparelho: new FormControl('', [Validators.required, Validators.maxLength(50)]),
			imeisimcard: new FormControl('', [Validators.required, Validators.maxLength(50)]),
			planovoz: new FormControl('', [Validators.required, Validators.maxLength(100)]),
			planodados: new FormControl('', [Validators.required, Validators.maxLength(100)]),
			nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
			chapa: new FormControl('', [Validators.nullValidator]),
			sequnidade: new FormControl('', [Validators.required]),
			codigo: new FormControl('', [Validators.nullValidator])
		});
	}

	onFileChanged() {
		this.files = new Set();

		const files: { [key: string]: File } = this.file.nativeElement.files;
		for (let key in files) {
			if (!isNaN(parseInt(key))) {
				this.files.add(files[key]);
			}
		}

	}

	downLoadFile(data: any, type: string) {
		var blob = new Blob([data], { type: type.toString() });
		var url = window.URL.createObjectURL(blob);
		saveAs(blob, "anyName.txt");
		window.open(url);

	}

	ngOnInit() {

		this.tipos = [{ 'Texto': 'Próprio', 'Valor': 'P' }, { 'Texto': 'Empresa', 'Valor': 'E' }];
		this.getTelefonia();
	}

	getTelefonia() {
		this.activatedRoute.params.subscribe((params: Params) => {
			let userId = params['id'];
			this.auditoria = params['auditar'];
			this.demitido = params['demitido'];

			if (userId != '' && this.auditoria != '' && this.demitido  != '' && userId != undefined) {
				this._subscriptions.push(this.serviceTelefonia.getTelefonia(userId, null, 0).subscribe((tel: Telefonia[]) => {

					if (tel[0].SEQTELEFONIA > 0) {
						this.form.get("codigo").setValue(tel[0].SEQTELEFONIA);
						this.form.get("aparelhos").setValue(tel[0].APARELHO);
						this.form.get("imeiaparelho").setValue(tel[0].IMEIAPARELHO);
						this.form.get("imeisimcard").setValue(tel[0].IMEISIMCARD);
						this.form.get("planodados").setValue(tel[0].PLANODADOS);
						this.form.get("planovoz").setValue(tel[0].PLANOVOZ);
						this.form.get("chapa").setValue(tel[0].CHAPA);
						this.form.get("nrolinha").setValue(tel[0].NROLINHA);
						this.form.get("nome").setValue(tel[0].NOME);
						this.form.get("sequnidade").setValue(Number(tel[0].SEQUNIDADE));
						this.form.get("dtadevolucao").setValue(this.dateOriginal.parse(tel[0].DTADEVOLUCAO));
						this.form.get("dtaentrega").setValue(this.dateOriginal.parse(tel[0].DTAENTREGA));
						this.form.get("checkin").setValue(tel[0].CHECKIN);
						//if(tel[0].CENTROCUSTOC5 != '') this.form.get("centrocustoc5").setValue(tel[0].CENTROCUSTOC5);
						this.arquivo = tel[0].ARQUIVO;
						this.codigo = tel[0].SEQTELEFONIA;

					}
				}));

			}
		});
	}

	voltar() {
		let link = (this.form.get("codigo").value > 0) ? ['/admin/ti/telefonia/lista/' + this.form.get("sequnidade").value + '/' + this.auditoria + '/' + this.demitido] : ['/admin/ti/telefonia/lista'];

		this._router.navigate(link);
		//this._buscaChange.emit('');
	}

	getChapa() {
		let chapa = this.form.get("chapa").value;

		if (chapa != '' && chapa != 0) {
			this._subscriptions.push(this.serviceTelefonia.getTelefonia("0", chapa, 0).subscribe((tel: Telefonia[]) => {
				if (tel.length > 0) {
					if (tel[0].NOME != null) {
						this.form.get("nome").setValue(tel[0].NOME);
						this.form.get("sequnidade").setValue(Number(tel[0].SEQUNIDADE));
					}
				} else {
					this.form.get("nome").setValue(null);
				}
			}));
		}

		if(chapa == 0) {
			this.form.get("nome").setValue('NAO CLASSIFICADO');
		}
	}

	submit() {

		if (this.form.valid) {
			this._subscriptions.push(this.serviceTelefonia.validaChapaVinculadoATelefonia(this.form.get("chapa").value, this.form.get("sequnidade").value, this.form.get("codigo").value).subscribe((x: any) => {

				if (isNumber(Number(x))) {
					if (x > 0) {
						let dialogRef = this.dialog.dialogConfirm("Confirmação", "Chapa já vinculada a um telefone, gostaria de continuar mesmo assim?", "300px");
						this._subscriptions.push(dialogRef.afterClosed().subscribe(result => {
							if (result) {
								this.salvar();
							}
						}));
					} else {
						this.salvar();
					}
				}
			}));
		}
	}

	salvar() {
		let tel = new Telefonia();
		tel.SEQTELEFONIA = this.form.get("codigo").value == null || this.form.get("codigo").value == "" ? 0 : this.form.get("codigo").value;
		tel.APARELHO = this.form.get("aparelhos").value;
		tel.IMEIAPARELHO = this.form.get("imeiaparelho").value;
		tel.IMEISIMCARD = this.form.get("imeisimcard").value;
		tel.PLANODADOS = this.form.get("planodados").value;
		tel.PLANOVOZ = this.form.get("planovoz").value;
		tel.CHAPA = this.form.get("chapa").value;
		tel.NROLINHA = this.form.get("nrolinha").value;
		tel.SEQUNIDADE = this.form.get("sequnidade").value;
		tel.DTAENTREGA = (this.form.get("dtaentrega").value != null && this.form.get("dtaentrega").value != '') ? this.dateFormat.get(this.form.get("dtaentrega").value) : '';
		tel.DTADEVOLUCAO = (this.form.get("dtadevolucao").value != null && this.form.get("dtadevolucao").value != '') ? this.dateFormat.get(this.form.get("dtadevolucao").value) : '';
		tel.CHECKIN = (Number.isInteger(Number(this.form.get("checkin").value))) ? this.form.get("checkin").value : '';
		tel.ARQUIVO = (this.file != undefined && this.file.nativeElement.files.length > 0) ? this.file.nativeElement.files[0].name : '';

		this._subscriptions.push(this.serviceTelefonia.salvar(tel).subscribe((res: string) => {

			if (res) {
				if (tel.SEQTELEFONIA > 0) {
					if (this.file != undefined && this.file.nativeElement.files.length > 0) {

						this.progress = this.uploadService.upload(this.files, "C:\\inetpub\\wwwroot\\telefonia\\" + this.form.get("codigo").value, 'S');

						let allProgressObservables = [];
						for (let key in this.progress) {
							allProgressObservables.push(this.progress[key].progress);
						}

						this._subscriptions.push(forkJoin(allProgressObservables).subscribe(end => {
							if (end[0] == 100) {
								//this.myNgForm.resetForm();
							}
						}));
					}
				} else {
					this.myNgForm.resetForm();
					this.form.get("codigo").setValue(0);
				}
			}
		}));
	}

	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this._subscriptions.forEach(x => {
			x.unsubscribe();
		});
	}
}
