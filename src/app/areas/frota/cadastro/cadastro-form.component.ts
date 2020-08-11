
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Select } from "../../../shared/models/Components";
import { CadastroFrotaService } from "./cadastro.service";
import { Unidade } from "../../../shared/models/Unidade";
import { EmpresaDW } from "../../../shared/models/Empresa";
import { UserService } from "../../../shared/services/user.service";
import { RodarJson } from "../../../shared/models/RodarJson";
import { Subscription } from "rxjs";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { Rodizio, Cadastro } from "../../../shared/models/Frota";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { isArray } from "jquery";
import { CadastroPopupRodizioFrotaComponent } from "./cadastro-popup-rodizio-form.component";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";

@Component({
    selector: 'app-cadastro-form-frota',
    templateUrl: './cadastro-form.component.html',
    styleUrls: ['./cadastro-form.component.scss'],
})
export class  CadastroFormFrotaComponent implements OnInit, OnDestroy{
    form       : FormGroup;
    status     : Array<Select>  = [];
    unidades   : Array<Unidade> = [];
    empresas   : Array<EmpresaDW> = [];
    rodizio    : Array<Rodizio> = [];
    cadastros  : Array<Cadastro> = [];
    hide       : boolean = true;
    hideGrid   : boolean = true;
    isCheckedRodizio : boolean = false;
    private _subscriptions: Array<Subscription> = [];

    displayedColumns = ['uf', 'cidade', 'dia', 'status', 'deletar'];
	dataSource = new MatTableDataSource<Rodizio>(this.rodizio);

    constructor(private router: Router,
                private fb : FormBuilder,
                private cadastroService : CadastroFrotaService,
                private user : UserService,
                private activatedRouter: ActivatedRoute,
                public dialog: MatDialog,
                private validError : ValidationErrorService){

        this.status = this.cadastroService.gerStatus();
        this.unidades = this.user.getUnidadePerm();

        this.form = this.fb.group({
            placa       : new FormControl('', [Validators.required]),
            modelo      : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            ano         : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            nroempresa  : new FormControl('', [Validators.required]),
            sequnidade  : new FormControl('', [Validators.required]),
            status      : new FormControl('', [Validators.required]),
            rodizio     : new FormControl('', [Validators.nullValidator]),
            seqveiculo  : new FormControl('', [Validators.nullValidator]),
       tipohabilitacao  : new FormControl('', [Validators.nullValidator])
        });

    }

    ngOnInit(){
        this.carregaCadastros();
    }

    carregaCadastros(){
        this._subscriptions.push(
        this.activatedRouter.params.subscribe((params: Params) => {
            let seqveiculo = params['id'];
            let un = params['un'];

			if((seqveiculo != '' && seqveiculo != undefined) && (un != '' && un != undefined))
			{
                let r = new RodarJson();
                    r.obj = [{ sequnidade: un, placa : null, seqveiculo: seqveiculo }];
                    r.tipo = "CADASTROS";

				this._subscriptions.push(this.cadastroService.getExec(r).subscribe((c: Cadastro[]) => {
					if(isArray(c)){
                       if(c.length > 0) {
                            this.form.get("sequnidade").setValue(Number(c[0].SEQUNIDADE));
                            this.carregaEmpresa(c[0].SEQUNIDADE);
                            this.form.get("placa").setValue(c[0].PLACA);
                            this.form.get("nroempresa").setValue(c[0].EMPALOCACAO);
                            this.form.get("modelo").setValue(c[0].MODELO);
                            this.form.get("ano").setValue(c[0].ANO);
                            this.form.get("status").setValue(c[0].STATUS);
                            this.form.get("seqveiculo").setValue(c[0].SEQVEICULO);
                            this.form.get("tipohabilitacao").setValue(c[0].TIPOHABILITACAO);
                            this.carregaRodizio(c[0].SEQVEICULO);
                            this.hide = false;

                       }
					}
				}));
			}
		}));
	}

    carregaEmpresa(id){
        this.empresas = [];
        this.form.get("nroempresa").setValue(null);
        let r = new RodarJson();  r.obj = id; r.tipo = "EMPRESA";

        this._subscriptions.push(this.cadastroService.getExec(r).subscribe((e : EmpresaDW[]) => this.empresas = e));
    }

    carregaRodizio(seqveiculo){

        let r = new RodarJson();  r.obj = [{ seqveiculo: seqveiculo, data : null }]; r.tipo = "RODIZIO";
        this._subscriptions.push(this.cadastroService.getExec(r).subscribe((e : Rodizio[]) => {
            this.rodizio = new Array<Rodizio>();

            e.forEach(x => {
                let r           = new Rodizio();
                r.UF            = x.UF;
                r.CIDADE        = x.CIDADE;
                r.NOMEDIA       = x.NOMEDIA;
                r.STATUS        = x.STATUS;
                r.DIADASEMANA   = x.DIADASEMANA;
                r.SEQVEICULO    = x.SEQVEICULO;
                r.ICON          = x.STATUS;
                this.rodizio.push(r);
            });

            this.dataSource = new MatTableDataSource<Rodizio>(this.rodizio);

            if(this.rodizio.length > 0) {
                this.hide = false;
                this.hideGrid = false;
                this.isCheckedRodizio = true;
            }
        }));
    }

    ativaInativaRowGrid(seqveiculo, uf, cidade, status, dia) {
        let s = (status == 'Ativo') ? 'I' : 'A';
        let r = new RodarJson();
        r.obj = [{ seqveiculo: seqveiculo, uf : uf, cidade: cidade, status: s, dia: dia }];
        r.tipo = "CADRODIZIO";

        this._subscriptions.push(this.cadastroService.getExec(r).subscribe((e : Rodizio[]) => {
            this.rodizio = new Array<Rodizio>();
            if(isArray(e)) {
                if(e.length > 0) {
                   this.carregaRodizio(e[0].SEQVEICULO);
                }
            }
        }));
    }

    mostrarGridRodizio(event){
       if(event.checked) {
         this.hideGrid = false;
       }else{
         this.hideGrid = true;
       }
    }

    montaPopupRodizio(){
        let dialogRef = this.dialog.open(CadastroPopupRodizioFrotaComponent, {
            height: '300px',
            width: '500px',
            data: { seqveiculo: this.form.get("seqveiculo").value }
          });

          this._subscriptions.push(dialogRef.afterClosed().subscribe(result => {
            this.carregaRodizio(this.form.get("seqveiculo").value);
          }));
    }

    voltarLista() {
        this.router.navigate(["/admin/frota/cadastro/lista"]);
    }

    submit() {
        if(this.form.valid){
            let s = (status == 'Ativo') ? 'I' : 'A';
            let r = new RodarJson();
                r.obj = [{
                                placa: this.form.get("placa").value,
                               modelo: this.form.get("modelo").value,
                           sequnidade: this.form.get("sequnidade").value,
                                  ano: this.form.get("ano").value,
                              empresa: this.form.get("nroempresa").value,
                               status: this.form.get("status").value,
                           seqveiculo: this.form.get("seqveiculo").value,
                      tipohabilitacao: this.form.get("tipohabilitacao").value
                        }];
                r.tipo = "CADFROTA";

            this._subscriptions.push(this.cadastroService.getExec(r).subscribe((seqveiculo : any) => {
                this.rodizio = new Array<Rodizio>();
                if(seqveiculo > 0) {

                    this.router.navigate(['/admin/frota/cadastro/editar/' + seqveiculo + "/" + this.form.get("sequnidade").value]);

                }
            }));
        }

        this.validError.showError(this.form);
    }

    ngOnDestroy(){
        this._subscriptions.forEach(x => {
          if(x){
            x.unsubscribe();
          }
        });
    }
}
