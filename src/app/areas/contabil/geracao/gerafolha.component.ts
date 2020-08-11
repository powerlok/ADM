import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { GeraFolhaService } from "./gerafolha.service";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { UserService } from "../../../shared/services/user.service";
import { DateOracle } from "../../../shared/util/date-format";
import { Subscription } from "rxjs";
import { Lista, Retorno, Inconsistencia } from "../../../../app/shared/models/GeraFolha";
import { MatTableDataSource } from "@angular/material/table";

@Component({
	selector: "app-contabil-gerafolha",
	templateUrl: "./gerafolha.component.html",
	styleUrls: ["./gerafolha.component.scss"],
	providers: []
})
export class GeraFolhaComponent implements OnInit, OnDestroy {
    private _subscriptions: Array<Subscription> = [];
	//public unidades = [];
	public banco = [];
	form : FormGroup;
	isCarregarMes = true;
	isCarregarAno = true;
	isCarregarMatriz = true;
	isCarregarDtaVenc = true;
	isCarregarDtaMov = true;
	isCarregarDtaPagtoDe = true;
	isCarregarDtaPagtoAte = true;
	isCarregarCPF = true;
	isCarregarTipoGeracao = true;
	isCarregarInconsistencia = true;
	geracao = [];
	dataDe = null;
	dataAte = null;
	sequnidade : number = 6;
	lista : Lista[];
	inconsistencias : Inconsistencia[] = [];

	displayedColumns = ['verificacadastro','verificaconta','gerandotitulos','integrandotitulos','gerandocomplemento'];
	dataSource = new MatTableDataSource<Lista>(this.lista);

	displayedColumns2 = ['nrotitulo','codpessoa','fantasia','motivo'];
	dataSource2 = new MatTableDataSource<Inconsistencia>(this.inconsistencias);

	constructor(private fb: FormBuilder, private geraFolhaService: GeraFolhaService, private error: ValidationErrorService, private user : UserService, private dateFormat: DateOracle) {
		//this.unidades = this.user.getUnidadePerm();
		this.banco =  [{ id: '001', text: 'BB' }, { id: '003', text: 'ITAÚ' }];

		this.lista = [{
			verificaCadastro: "",
			verificaContas: "",
			gerandoTitulos: "",
			integracaoTitulos: "",
			gerandoComplemento: ""
		}];

		this.geracao = [
			      { 'id': 'p_rm_gerafolha', 'text': 'Pagamento'},
						{ 'id': 'p_rm_gerafolha_13', 'text': '13º'},
						{ 'id': 'p_rm_gerafolha_adto', 'text': 'Adiantamento'},
						{ 'id': 'p_rm_gerafolha_compl', 'text': 'Complemento'},
						//{ 'id': 'p_rm_gerafolha_diferenca', 'text': 'Diferença'},
						{ 'id': 'p_rm_gerafolha_ferias', 'text': 'Férias'},
						{ 'id': 'p_rm_gerafolha_rescisao', 'text': 'Rescisão'},
            { 'id': 'p_rm_gerafolha_pensao', 'text': 'Pensão'},
            { 'id': 'p_rm_gerafolha_transp', 'text': 'Vale Transporte'}
						//{ 'id': 'p_CadPessoaPensao', 'text': 'Cadastro Pessoa Pensão'}
					   ];

		this.form = this.fb.group({
			mes					: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			ano					: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			matriz				: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			dtavencimento		: new FormControl({disabled: true, value: ''}, [Validators.nullValidator/*, Validators.minLength(3)*/]),
			dtamovimento		: new FormControl({disabled: true, value: ''}, [Validators.nullValidator/*, Validators.minLength(3)*/]),
			dtapagamentode		: new FormControl({disabled: true, value: ''}, [Validators.nullValidator/*, Validators.minLength(3)*/]),
			dtapagamentoate		: new FormControl({disabled: true, value: ''}, [Validators.nullValidator/*, Validators.minLength(3)*/]),
			cpf					: new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
			tipogeracao         : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
			banco		     	: new FormControl('', [Validators.required/*, Validators.minLength(3)*/])
			//sequnidade			: new FormControl('', [Validators.required/*, Validators.minLength(3)*/])
		});
	}

	ngOnInit() {
		this.isCarregarTipoGeracao  = false;

		this.dataSource.data = this.lista;

	}

	/*onchangeUnidade(event){

	}*/

	limparTabelaStatus() {
		this.lista[0].gerandoComplemento = "";
		this.lista[0].gerandoTitulos 	 = "";
		this.lista[0].integracaoTitulos  = "";
		this.lista[0].verificaCadastro   = "";
		this.lista[0].verificaContas     = "";
	}

	onChangeTipoGeracao() {

		this.form.get("ano").setValue(null);
		this.form.get("mes").setValue(null);
		this.form.get("matriz").setValue(null);
		this.form.get("dtavencimento").setValue(null);
		this.form.get("dtamovimento").setValue(null);
		this.form.get("dtapagamentode").setValue(null);
		this.form.get("dtapagamentoate").setValue(null);
		this.form.get("tipogeracao").setValue(null);
		this.form.get("banco").setValue(null);

       if(event == null){
		this.isCarregarMes          = true;
		this.isCarregarAno          = true;
		this.isCarregarMatriz       = true;
		this.isCarregarDtaVenc      = true;
		this.isCarregarDtaMov 	    = true;
		this.isCarregarDtaPagtoDe	= true;
		this.isCarregarDtaPagtoAte  = true;
		this.isCarregarCPF 			= true;
		this.isCarregarTipoGeracao  = true;

	   }else{
		this.isCarregarTipoGeracao  = false;
	   }
	}

	onChangeCampo(event) {
		this.showCamposTipoGeracao(event);
	}

	submit(){

		if(this.form.valid){
			this.form.controls['dtapagamentode'].enable();
			this.form.controls['dtapagamentoate'].enable();
			this.form.controls['dtavencimento'].enable();
			this.form.controls['dtamovimento'].enable();

			if(this.geraFolhaService.validaCampos(this.sequnidade, this.form)) {


					this.limparTabelaStatus();

					this.geraFolhaService.montaJsonCadFuncionario().subscribe((x : Retorno) => {

						if(x.value == "0") {
							this.lista[0].verificaCadastro = "check";

							this.geraFolhaService.montaJsonContaBancaria().subscribe((y : Retorno) => {
							if(y.value == "0") {

									this.lista[0].verificaContas = "check";

									this.geraFolhaService.montaJsonPrincipal(this.form.get("tipogeracao").value,
									this.sequnidade,
									this.form.get("ano").value,
									this.form.get("mes").value,
									this.form.get("cpf").value,
									this.dateFormat.get(this.form.get("dtamovimento").value),
									this.dateFormat.get(this.form.get("dtavencimento").value),
									this.dateFormat.get(this.form.get("dtapagamentode").value),
									this.dateFormat.get(this.form.get("dtapagamentoate").value),
									this.form.get("matriz").value,
									this.form.get("banco").value)
									.subscribe((a : Retorno) =>{

									if(a.value == "0") {

									    this.lista[0].gerandoTitulos = "check";

										this.geraFolhaService.montaJsonIntegracao().subscribe((b : Retorno) => {

										if(b.value == "0") {
											this.lista[0].integracaoTitulos = "check";

                      if(this.form.get("tipogeracao").value != "p_rm_gerafolha_pensao") {

												this.geraFolhaService.montaJsonComplTitulo(this.getTipoGeracao(this.form.get("tipogeracao").value)).subscribe((c : Retorno) => {

													if(c.value == "0") {

														this.lista[0].gerandoComplemento = "check";

														this.geraFolhaService.montaJsonInconsistencia(this.getTipoGeracao(this.form.get("tipogeracao").value)).subscribe((d : Retorno) => {

															if(d.inconsistencia.length > 0) {

																//console.log(d);
																this.dataSource2.data = this.inconsistencias;

																this.isCarregarInconsistencia = false;

															}
														})

													}else{
														this.lista[0].gerandoComplemento = "close";
													}
												})

											}else {

												this.lista[0].gerandoComplemento = "remove";

												this.geraFolhaService.montaJsonInconsistencia(this.getTipoGeracao(this.form.get("tipogeracao").value)).subscribe((d : Retorno) => {

													if(d.inconsistencia.length > 0) {

														//console.log(d);
														this.dataSource2.data = this.inconsistencias;

														this.isCarregarInconsistencia = false;

													}
												})

											}

										}else{
											this.lista[0].integracaoTitulos = "close";

										}
									  })
									}else{
										this.lista[0].gerandoTitulos = "close";
									}
								  })
							}else{
								this.lista[0].verificaContas = "close";
							}
						  })
						}else{
							this.lista[0].verificaCadastro = "close";
						}
					});

			}

			this.form.controls['dtapagamentode'].enable();
			this.form.controls['dtapagamentoate'].enable();
			this.form.controls['dtavencimento'].disable();
			this.form.controls['dtamovimento'].disable();

		}

		this.error.showError(this.form);
	}

	showCamposTipoGeracao(tipogeracao){
		this.isCarregarMes          = true;
		this.isCarregarAno          = true;
		this.isCarregarMatriz       = true;
		this.isCarregarDtaVenc      = true;
		this.isCarregarDtaMov 	    = true;
		this.isCarregarDtaPagtoDe	= true;
		this.isCarregarDtaPagtoAte  = true;
		this.isCarregarCPF 			= true;

		switch(tipogeracao){
			case 'p_rm_gerafolha':
				this.isCarregarMes 	   = false;
				this.isCarregarAno     = false;
				this.isCarregarDtaVenc = false;
		    this.isCarregarDtaMov  = false;
				this.isCarregarMatriz  = false;
			break;
			case 'p_rm_gerafolha_13':
				this.isCarregarMes 	   = false;
				this.isCarregarAno     = false;
				this.isCarregarDtaVenc = false;
		    this.isCarregarDtaMov  = false;
				this.isCarregarMatriz  = false;
			break;
			case 'p_rm_gerafolha_adto':
				this.isCarregarMes 	   = false;
				this.isCarregarAno     = false;
				this.isCarregarDtaVenc = false;
		        this.isCarregarDtaMov  = false;
				this.isCarregarMatriz  = false;
			break;
			case 'p_rm_gerafolha_compl':
				this.isCarregarMes 	   = false;
				this.isCarregarAno     = false;
				this.isCarregarDtaVenc = false;
		    this.isCarregarDtaMov  = false;
				this.isCarregarMatriz  = false;

			break;
			case 'p_rm_gerafolha_diferenca':
				this.isCarregarMes 	   = false;
				this.isCarregarAno     = false;
				this.isCarregarDtaVenc = false;
				this.isCarregarDtaMov  = false;
				this.isCarregarMatriz  = false;
			break;
			case 'p_rm_gerafolha_ferias':
				this.isCarregarDtaPagtoDe  = false;
				this.isCarregarDtaPagtoAte = false;
				this.isCarregarMatriz      = false;
				this.dataDe = "Pagto De";
                this.dataAte = "Pagto Até";
			break;
			case 'p_rm_gerafolha_rescisao':
				this.isCarregarDtaPagtoDe  = false;
				this.isCarregarDtaPagtoAte = false;
				this.isCarregarMatriz      = false;
				this.dataDe = "Desligamento De";
        this.dataAte = "Desligamento Até";
			break;
			case 'p_rm_gerafolha_pensao':
			  this.isCarregarMes 	   = false;
				this.isCarregarAno     = false;
				this.isCarregarDtaVenc = false;
		    this.isCarregarDtaMov  = false;
				this.isCarregarMatriz  = false;
			break;
			case 'p_CadPessoaPensao':
			    this.isCarregarCPF 	   = false;
        break;
      case 'p_rm_gerafolha_transp':
        this.isCarregarMes 	   = false;
				this.isCarregarAno     = false;
				this.isCarregarDtaVenc = false;
		    this.isCarregarDtaMov  = false;
				this.isCarregarMatriz  = false;

      break;
		}
	}

	getTipoGeracao(tipogeracao : string) {
		var r = "";

		switch(tipogeracao) {
      case 'p_rm_gerafolha': r = 'PGTO';
			break;
			case 'p_rm_gerafolha_13': r = '13 SAL';
			break;
			case 'p_rm_gerafolha_adto':	r = 'ADTO';
			break;
			case 'p_rm_gerafolha_compl': r = 'PGTOCO';
			break;
			case 'p_rm_gerafolha_diferenca': r = '';
			break;
			case 'p_rm_gerafolha_ferias': r = 'FERIAS';
			break;
			case 'p_rm_gerafolha_rescisao': r = 'RESCIS';
			break;
			case 'p_rm_gerafolha_pensao': r = 'PENSAO';
			break;
			case 'p_CadPessoaPensao': r = '';
      break;
      case 'p_rm_gerafolha_transp': r = 'TRANSP';
      break;
		}

		return r;
	}

	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this._subscriptions.forEach(x => {
		x.unsubscribe();
		});
    }
}

