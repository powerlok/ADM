import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Microsoft } from "../../../shared/models/Microsoft";
import { MicrosoftService } from "./microsoft.service";
import { Unidade } from "../../../shared/models/Unidade";
import { UserService } from "../../../shared/services/user.service";
import { DialogService } from "../../../shared/services/dialog.service";
import { isNumber } from "util";
import { DateOracle, DateFormat } from "../../../shared/util/date-format";
import { UploadService } from "app/shared/services/upload.service";
import { Observable, Subscription, forkJoin } from 'rxjs';
import { saveAs } from 'file-saver/FileSaver';
@Component({
	selector: "app-ti-microsoft-form",
	templateUrl: "./microsoft-form.component.html",
	styleUrls: ["./microsoft-form.component.scss"],
	providers: []
})

export class MicrosoftFormComponent implements OnInit, OnDestroy {
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
	sequnidade: number;
	demitido: string;
	auditoria: string;

	constructor(fb: FormBuilder,
		router: Router,
		private serviceMicrosoft: MicrosoftService,
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
			checkin_vop2     			 : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_vop2 		 : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			visioonlineplan2              : new FormControl('', [Validators.nullValidator]),
			checkin_vo     			 : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_vo 		 : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			visioonline              : new FormControl('', [Validators.nullValidator]),
			checkin_ofefs            : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_ofefs       : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			office365extrafilastorafe: new FormControl('', [Validators.nullValidator]),
			checkin_m365e3     		 : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_m365e3         : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			microsoft365e3           : new FormControl('', [Validators.nullValidator]),
			checkin_mpp2t     		 : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_mpp2t          : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			microsoftpowerappsp2t    : new FormControl('', [Validators.nullValidator]),
			checkin_pop      		 : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_pop          : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			projectonlineprofissional      : new FormControl('', [Validators.nullValidator]),
			checkin_mff              : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_mff 		 : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			microsoftflowfree        : new FormControl('', [Validators.nullValidator]),
			checkin_ofb       	     : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_ofb  		 : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			office365business 	     : new FormControl('', [Validators.nullValidator]),
			checkin_spp2      		 : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_spp2 	     : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			sharepointplano2  	     : new FormControl('', [Validators.nullValidator]),	
			checkin_ep2              : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_ep2         : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			exchengeplano2    	     : new FormControl('', [Validators.nullValidator]),
			checkin_ep1              : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_ep1  		 : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			exchengeplano1           : new FormControl('', [Validators.nullValidator]),
			checkin_ek        	     : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_ek   		 : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			exchangekiosk     		 : new FormControl('', [Validators.nullValidator]),	
			checkin_pwbp      		 : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_pwbp 	     : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			powerbipro        		 : new FormControl('', [Validators.nullValidator]),
			checkin_pwbf      	  	 : new FormControl('', [Validators.nullValidator]),
			dtaliberacao_pwbf 		 : new FormControl({ disabled: false, value: '' }, [Validators.nullValidator]),
			powerbifree       		 : new FormControl('', [Validators.nullValidator]),
			nome              		 : new FormControl({ disabled: true, value: '' }, [Validators.required, Validators.maxLength(100)]),
			chapa             		 : new FormControl('', [Validators.required]),
			sequnidade        	     : new FormControl({ disabled: false, value: '' }, [Validators.required]),
			codigo            		 : new FormControl('', [Validators.nullValidator])
		});
	}

	ngOnInit() {

		this.tipos = [{ 'Texto': 'Próprio', 'Valor': 'P' }, { 'Texto': 'Empresa', 'Valor': 'E' }];
		this.getMicrosoft();
	}


	getMicrosoft() {
		this.activatedRoute.params.subscribe((params: Params) => {
			let userId = params['id'];
			this.auditoria = params['auditar'];
			this.demitido = params['demitido'];

			
			if (userId != ''  && userId != undefined) {
				this._subscriptions.push(this.serviceMicrosoft.getMicrosoft(userId, null, 0).subscribe((tel: Microsoft[]) => {
				
					if (tel[0].SEQMICROSOFT > 0) { 
						this.form.get("codigo").setValue(tel[0].SEQMICROSOFT);
						this.form.get("sequnidade").setValue(Number(tel[0].SEQUNIDADE));
						this.form.get("chapa").setValue(tel[0].CHAPA);
						//this.form.get("nome").setValue(tel[0].NOME);

						this.form.get("powerbifree").setValue((tel[0].POWERBIFREE == 'S') ? true : false);
						this.form.get("checkin_pwbf").setValue(tel[0].CHECKIN_PWBF == 0 ? null : Number(tel[0].CHECKIN_PWBF));
						this.form.get("dtaliberacao_pwbf").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_PWBF));

						this.form.get("powerbipro").setValue((tel[0].POWERBIPRO == 'S') ? true : false);
						this.form.get("checkin_pwbp").setValue(tel[0].CHECKIN_PWBP == 0 ? null : Number(tel[0].CHECKIN_PWBP));
						this.form.get("dtaliberacao_pwbp").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_PWBP));

						this.form.get("exchangekiosk").setValue((tel[0].EXCHANGEKIOSK == 'S') ? true : false);
						this.form.get("checkin_ek").setValue(tel[0].CHECKIN_EK == 0 ? null : Number(tel[0].CHECKIN_EK));
						this.form.get("dtaliberacao_ek").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_EK));

						this.form.get("exchengeplano1").setValue((tel[0].EXCHENGEPLANO1 == 'S') ? true : false);
						this.form.get("checkin_ep1").setValue(tel[0].CHECKIN_EP1 == 0 ? null : Number(tel[0].CHECKIN_EP1));
						this.form.get("dtaliberacao_ep1").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_EP1));

						this.form.get("exchengeplano2").setValue((tel[0].EXCHENGEPLANO2 == 'S') ? true : false);
						this.form.get("checkin_ep2").setValue(tel[0].CHECKIN_EP2 == 0 ? null : Number(tel[0].CHECKIN_EP2));
						this.form.get("dtaliberacao_ep2").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_EP2));

						this.form.get("sharepointplano2").setValue((tel[0].SHAREPOINTPLANO2 == 'S') ? true : false);
						this.form.get("checkin_spp2").setValue(tel[0].CHECKIN_SPP2 == 0 ? null : Number(tel[0].CHECKIN_SPP2));
						this.form.get("dtaliberacao_spp2").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_SPP2));

						this.form.get("office365business").setValue((tel[0].OFFICE365BUSINESS == 'S') ? true : false);
						this.form.get("checkin_ofb").setValue(tel[0].CHECKIN_OFB == 0 ? null : Number(tel[0].CHECKIN_OFB));
						this.form.get("dtaliberacao_ofb").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_OFB));

						this.form.get("microsoftflowfree").setValue((tel[0].MICROSOFTFLOWFREE == 'S') ? true : false);
						this.form.get("checkin_mff").setValue(tel[0].CHECKIN_MFF == 0 ? null : Number(tel[0].CHECKIN_MFF));
						this.form.get("dtaliberacao_mff").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_MFF));

						this.form.get("microsoft365e3").setValue((tel[0].MICROSOFT365E3 == 'S') ? true : false);
						this.form.get("checkin_m365e3").setValue(tel[0].CHECKIN_M365E3 == 0 ? null : Number(tel[0].CHECKIN_M365E3));
						this.form.get("dtaliberacao_m365e3").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_M365E3));

						this.form.get("microsoftpowerappsp2t").setValue((tel[0].MICROSOFTPOWERAPPSPLAN2TRIAL == 'S') ? true : false);
						this.form.get("checkin_mpp2t").setValue(tel[0].CHECKIN_MPP2T == 0 ? null : Number(tel[0].CHECKIN_MPP2T));
						this.form.get("dtaliberacao_mpp2t").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_MPP2T));

						this.form.get("projectonlineprofissional").setValue((tel[0].PROJECTONLINEPROFISSIONAL == 'S') ? true : false);
						this.form.get("checkin_pop").setValue(tel[0].CHECKIN_POP == 0 ? null : Number(tel[0].CHECKIN_POP));
						this.form.get("dtaliberacao_pop").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_POP));

						this.form.get("office365extrafilastorafe").setValue((tel[0].OFFICE365EXTRAFILASTORAFE == 'S') ? true : false);
						this.form.get("checkin_ofefs").setValue(tel[0].CHECKIN_OFEFS == 0 ? null : Number(tel[0].CHECKIN_OFEFS));
						this.form.get("dtaliberacao_ofefs").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_OFEFS));

						this.form.get("visioonline").setValue((tel[0].VISIOONLINE == 'S') ? true : false);
						this.form.get("checkin_vo").setValue(tel[0].CHECKIN_VO == 0 ? null : Number(tel[0].CHECKIN_VO));
						this.form.get("dtaliberacao_vo").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_VO));
						
						this.form.get("visioonlineplan2").setValue((tel[0].VISIOONLINEPLAN2 == 'S') ? true : false);
						this.form.get("checkin_vop2").setValue(tel[0].CHECKIN_VOP2 == 0 ? null : Number(tel[0].CHECKIN_VOP2));
						this.form.get("dtaliberacao_vop2").setValue(this.dateOriginal.parse(tel[0].DTALIBERACAO_VOP2));
						
						//if(tel[0].CENTROCUSTOC5 != '') this.form.get("centrocustoc5").setValue(tel[0].CENTROCUSTOC5);
					
						//this.codigo = tel[0].SEQMICROSOFT;
						
					}					
				}));
				setTimeout((e) => { this.getChapa(); },500);
			}
		});

		
						
	}

	voltar() { 
		let link = (this.form.get("codigo").value > 0) ? ['/admin/ti/microsoft/lista/' + this.form.get("sequnidade").value + '/' + this.auditoria + '/' + this.demitido] : ['/admin/ti/microsoft/lista'];
		this._router.navigate(link);
		//this._buscaChange.emit('');
	}

	getChapa() {
		
		  var  chapa = this.form.get("chapa").value;
		  var  sequnidade = this.form.get("sequnidade").value;
		
		
		if (chapa != '' && sequnidade != '') {
			this._subscriptions.push(this.serviceMicrosoft.getMicrosoft("0", chapa, sequnidade).subscribe((tel: Microsoft[]) => {
				
				if (tel.length > 0) {
					if (tel[0].NOME != null) {
						this.form.get("nome").setValue(tel[0].NOME);
						//this.form.get("sequnidade").setValue(Number(tel[0].SEQUNIDADE));
					}
				} else {
					this.form.get("nome").setValue(null);
				}
			}));
		}
	}

	submit() {

		if (this.form.valid) {
			this.salvar();
		}
	}

	salvar() { 
		
		let tel = new Microsoft();
		tel.SEQMICROSOFT = this.form.get("codigo").value != null && this.form.get("codigo").value != '' ? this.form.get("codigo").value : 0; 
		tel.CHAPA = this.form.get("chapa").value == "" ? 0 : this.form.get("chapa").value;
		tel.SEQUNIDADE = this.form.get("sequnidade").value == "" ? 0 : this.form.get("sequnidade").value;

		tel.POWERBIFREE = this.form.get("powerbifree").value ? 'S': 'N';
		tel.CHECKIN_PWBF = this.form.get("checkin_pwbf").value == null  ? 0 : this.form.get("checkin_pwbf").value;
		tel.DTALIBERACAO_PWBF = (this.form.get("dtaliberacao_pwbf").value != null && this.form.get("dtaliberacao_pwbf").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_pwbf").value) : null;
	
		tel.POWERBIPRO = this.form.get("powerbipro").value ? 'S': 'N';
		tel.CHECKIN_PWBP = this.form.get("checkin_pwbp").value == null ? 0 : this.form.get("checkin_pwbp").value;
		tel.DTALIBERACAO_PWBP = (this.form.get("dtaliberacao_pwbp").value != null && this.form.get("dtaliberacao_pwbp").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_pwbp").value) : null;
	
		tel.EXCHANGEKIOSK = this.form.get("exchangekiosk").value ? 'S': 'N';
		tel.CHECKIN_EK = this.form.get("checkin_ek").value == null ? 0 : this.form.get("checkin_ek").value;
		tel.DTALIBERACAO_EK = (this.form.get("dtaliberacao_ek").value != null && this.form.get("dtaliberacao_ek").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_ek").value) : null;
		
		tel.EXCHENGEPLANO1 = this.form.get("exchengeplano1").value ? 'S': 'N';
		tel.CHECKIN_EP1 = this.form.get("checkin_ep1").value == null ? 0 : this.form.get("checkin_ep1").value;
		tel.DTALIBERACAO_EP1 = (this.form.get("dtaliberacao_ep1").value != null && this.form.get("dtaliberacao_ep1").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_ep1").value) : null;
		
		tel.EXCHENGEPLANO2 = this.form.get("exchengeplano2").value ? 'S': 'N';
		tel.CHECKIN_EP2 = this.form.get("checkin_ep2").value == null ? 0 : this.form.get("checkin_ep2").value;
		tel.DTALIBERACAO_EP2 = (this.form.get("dtaliberacao_ep2").value != null && this.form.get("dtaliberacao_ep2").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_ep2").value) : null;
		
		tel.SHAREPOINTPLANO2 = this.form.get("sharepointplano2").value ? 'S': 'N';
		tel.CHECKIN_SPP2 = this.form.get("checkin_spp2").value == null ? 0 : this.form.get("checkin_spp2").value;
		tel.DTALIBERACAO_SPP2 = (this.form.get("dtaliberacao_spp2").value != null && this.form.get("dtaliberacao_spp2").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_spp2").value) : null;
		
		tel.OFFICE365BUSINESS = this.form.get("office365business").value ? 'S': 'N';
		tel.CHECKIN_OFB = this.form.get("checkin_ofb").value == null ? 0 : this.form.get("checkin_ofb").value;
		tel.DTALIBERACAO_OFB = (this.form.get("dtaliberacao_ofb").value != null && this.form.get("dtaliberacao_ofb").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_ofb").value) : null;
		
		tel.MICROSOFTFLOWFREE = this.form.get("microsoftflowfree").value ? 'S': 'N';
		tel.CHECKIN_MFF = this.form.get("checkin_mff").value == null ? 0 : this.form.get("checkin_mff").value;
		tel.DTALIBERACAO_MFF = (this.form.get("dtaliberacao_mff").value != null && this.form.get("dtaliberacao_mff").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_mff").value) : null;
	
		tel.MICROSOFT365E3 = this.form.get("microsoft365e3").value ? 'S': 'N';
		tel.CHECKIN_M365E3 = this.form.get("checkin_m365e3").value == null ? 0 : this.form.get("checkin_m365e3").value;
		tel.DTALIBERACAO_M365E3 = (this.form.get("dtaliberacao_m365e3").value != null && this.form.get("dtaliberacao_m365e3").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_m365e3").value) : null;
		
        tel.MICROSOFTPOWERAPPSPLAN2TRIAL = this.form.get("microsoftpowerappsp2t").value ? 'S': 'N';
		tel.CHECKIN_MPP2T = this.form.get("checkin_mpp2t").value == null ? 0 : this.form.get("checkin_mpp2t").value;
		tel.DTALIBERACAO_MPP2T = (this.form.get("dtaliberacao_mpp2t").value != null && this.form.get("dtaliberacao_mpp2t").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_mpp2t").value) : null;
		
		tel.PROJECTONLINEPROFISSIONAL = this.form.get("projectonlineprofissional").value ? 'S': 'N';
		tel.CHECKIN_POP = this.form.get("checkin_pop").value == null ? 0 : this.form.get("checkin_pop").value;
		tel.DTALIBERACAO_POP = (this.form.get("dtaliberacao_pop").value != null && this.form.get("dtaliberacao_pop").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_pop").value) : null;
		
		tel.OFFICE365EXTRAFILASTORAFE = this.form.get("office365extrafilastorafe").value ? 'S': 'N';
		tel.CHECKIN_OFEFS = this.form.get("checkin_ofefs").value == null ? 0 : this.form.get("checkin_ofefs").value;
		tel.DTALIBERACAO_OFEFS = (this.form.get("dtaliberacao_ofefs").value != null && this.form.get("dtaliberacao_ofefs").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_ofefs").value) : null;
		
		tel.VISIOONLINE = this.form.get("visioonline").value ? 'S': 'N';
		tel.CHECKIN_VO = this.form.get("checkin_vo").value == null ? 0 : this.form.get("checkin_vo").value;
		tel.DTALIBERACAO_VO = (this.form.get("dtaliberacao_vo").value != null && this.form.get("dtaliberacao_vo").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_vo").value) : null;

		tel.VISIOONLINEPLAN2 = this.form.get("visioonlineplan2").value ? 'S': 'N';
		tel.CHECKIN_VOP2 = this.form.get("checkin_vop2").value == null ? 0 : this.form.get("checkin_vop2").value;
		tel.DTALIBERACAO_VOP2 = (this.form.get("dtaliberacao_vop2").value != null && this.form.get("dtaliberacao_vop2").value != '') ? this.dateFormat.get(this.form.get("dtaliberacao_vop2").value) : null;

		this._subscriptions.push(this.serviceMicrosoft.salvar(tel).subscribe((res: string) => {

			if (res) { 
				if (tel.SEQMICROSOFT == 0) {
					this.myNgForm.resetForm();
				}else{
					this.getMicrosoft();
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