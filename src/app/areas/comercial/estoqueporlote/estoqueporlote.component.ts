import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../shared/services/user.service";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { EstoquePorLoteService } from "./estoqueporlote.service";
import { Empresa } from "../../../shared/models/Empresa";
import { Unidade } from "../../../shared/models/Unidade";;
import { Select } from "../../../shared/models/Components";
import { AlteraPrecoService } from "../alterapreco/alterapreco.service";
import { Observable, Subscription } from "rxjs";
import { ProdMonitorado, Lote } from "../../../shared/models/Produto";
import { Params } from "@angular/router";
import { CustomValidators } from "../../../shared/custom.validators";
import { MovEstoqueLote, Seq, Text } from "../../../shared/models/MovEstoqueLote";
import { Utils } from "../../../shared/util/utils";
import 'rxjs/add/operator/switchMap';
import { RodarJson } from "../../../shared/models/RodarJson";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'app-comercial-estoqueporlote',
    templateUrl: './estoqueporlote.component.html',
    styleUrls: ['./estoqueporlote.component.scss'],
})
export class EstoquePorLoteComponent implements OnInit, OnDestroy {
    empresas              : Array<Empresa> = [];
    unidades              : Array<Unidade> = [];
    motivo                : Array<Select>  = [];
    local                 : Array<Select>  = [];
    cgo                   : Array<Select>  = [];
    form                  : FormGroup;
    filteredOptions       : ProdMonitorado[];
    embalagens            : Lote[];
    hideCampos            : boolean = true;
    hideCampos2           : boolean = true;
    hideCamposSelect      : boolean = true;
    hideGrid              : boolean = true;
    hideSalvar            : boolean = true;
    lote                  : Lote[] = [];
    movestoquelote        : MovEstoqueLote[] = [];
    germov                :Array<Object> = [];
    @ViewChild ('codigoprod') codigoprod;

    displayedColumns = [/*'id',*/ 'sequnidade', 'nroempresa', 'local', 'cgo', 'motivo', 'seqproduto', 'lote', 'embalagem', 'qtdemov', 'justificativa', 'deletar'];
	dataSource = new MatTableDataSource<MovEstoqueLote>(this.movestoquelote);
	private _subscriptions: Array<Subscription> = [];

    constructor(private fb: FormBuilder, private user: UserService, private error: ValidationErrorService, private estoquePorLoteServ: EstoquePorLoteService, private alteraPrecoService : AlteraPrecoService, private utils : Utils) {
        this.unidades = this.user.getUnidadePerm();

        this.form = this.fb.group({
            estoquedisp           : new FormControl({disabled: true, value: ''}, [Validators.nullValidator]),
            justificativa         : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            qtdmov                : new FormControl('', [Validators.required, CustomValidators.validafloat]),
            germov                : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            lote                  : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            embalagem             : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            codigo                : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
            descricao             : new FormControl({disabled: true, value: ''}, [Validators.nullValidator/*, Validators.minLength(6)*/]),
            motivo                : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            cgo                   : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            local                 : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            nroempresa            : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            sequnidade            : new FormControl('', [Validators.required/*, Validators.minLength(3)*/])
        });

        this.germov = new Array<Select>();
        this.germov = [{ id: "S", text: "Sim"}, { id: "N", text: "Não"}];
    }

    filterGroup(sequnidade: number, seqproduto: number, desc: Params): Observable<ProdMonitorado[]> {
        let obs = new Observable<any>();
        let r   = new RodarJson();

        if(desc != null) {
            if(desc.length == 0)  this.limparRestante();
            if(Number(desc)){

                r = {
                    obj: [{ sequnidade : sequnidade, desc : null, seqproduto : Number(desc) }],
                    tipo : "BUSCAPRODUTO",
                    json : null
                };

                if(desc.length > 2) obs = this.estoquePorLoteServ.getProduto(r);
            }else{
                r = {
                    obj  : [{ sequnidade : sequnidade, desc : (desc != undefined) ? desc.toLowerCase() : null, seqproduto : 0 }],
                    tipo : "BUSCAPRODUTO",
                    json : null
                };

                if(desc.length > 4) obs = this.estoquePorLoteServ.getProduto(r);
            }
        }

        return obs;
    }

    ngOnInit() {

        this._subscriptions.push(this.form.get("codigo").valueChanges
                 .switchMap((params : Params) => this.filterGroup(this.form.get("sequnidade").value, 0, params))
                 .subscribe(
                        val => {
                            this.filteredOptions = val;
                        }
                 ));
    }

    onSelectProdChange(event){

        this._subscriptions.push(this.estoquePorLoteServ.execJson(event.source.value, this.form.get("sequnidade").value, 0, null, null, null, null, 'LoteProd')
                               .subscribe((x : Lote[]) => {
            this.lote = x;
            if(x.length > 0) {
              this.form.get('descricao').setValue(this.lote[0].DESCCOMPLETA);
              this.hideCampos2 = false;
            }else{
              this.form.get('descricao').setValue(null);
            }
        }));

    }

    onChangeEmpresa(id) {
        this.limpar();
        this.form.patchValue({"nroempresa": "0" });
        this.empresas = this.user.getEmpresaPermUnid(id);
    }

    onChangeEmbalagem(event)
    {
        if(event > 0) {
            this.embalagens = this.lote.filter(x => x.SEQLOTE == event);
            if(this.embalagens.length > 0){
              this.form.get('estoquedisp').setValue(this.embalagens[0].SALDO);
            }else{
              this.form.get('estoquedisp').setValue(null);
            }
        }
    }

    onChangeLocal(id) {

        this.local = [];
        this.cgo = [];
        this.motivo = [];
        this.form.patchValue({"cgo": "0" });

      if(id > 0) {
        this._subscriptions.push(this.estoquePorLoteServ.execJson(0, this.form.get('sequnidade').value, id, null, null, null, null, 'Local')
                                .subscribe((local : object) => {
                                        for(let i of local as Array<object>){
                                            let l = new Select();
                                            l.id   = i["SEQLOCAL"];
                                            l.text = i["LOCAL"];

                                            this.local.push(l);
                                        }
                                }));

         this._subscriptions.push(this.estoquePorLoteServ.execJson(0, this.form.get('sequnidade').value, id, "null", "CGO", "S", "I", "CGO")
                                .subscribe((cgo : object) => {
                                            for(let i of cgo as Array<object>){
                                                let l = new Select();
                                                l.id   = i["CODGERALOPER"];
                                                l.text = i["DESCRICAO"];

                                                this.cgo.push(l);
                                            }
                                }));
         }
    }

    onChangeMotivo(id){
        this.motivo = [];
        if(id > 0) {

            this._subscriptions.push(this.estoquePorLoteServ.execJson(0, this.form.get('sequnidade').value, 0, id, "MOTIVO", "null", "null", "Motivo")
            .subscribe((motivo : object) => {
                    for(let i of motivo as Array<object>){
                        let l = new Select();
                        l.id   = i["MOTIVOMOVTO"];
                        l.text = i["DESCRICAO"];

                        this.motivo.push(l);
                    }
            }));

        }
    }

    onChangeCampos(id){
        this.hideCampos = true;
        this.hideGrid   = true;
        if(id > 0){
            this.hideCampos = false;
            this.hideGrid   = false;
        }
    }

    submit(tipo : string){

            if(tipo == "S"){

                if(this.movestoquelote.length > 0){

                    this.estoquePorLoteServ.salvar(this.movestoquelote);

                    this.limparRestante();
                    this.movestoquelote = [];
                    this.dataSource = new MatTableDataSource<MovEstoqueLote>(this.movestoquelote);

                }

            }else if(tipo == "A"){


                if(this.form.valid){

                let m = new MovEstoqueLote();
                m.id                    = this.utils.guidId();
                m.seqs                  = new Seq();
                m.seqs.sequnidade       = this.form.get("sequnidade").value;
                m.seqs.seqproduto       = this.form.get("codigo").value;
                m.seqs.seqlote          = this.form.get("lote").value;
                m.seqs.nroempresa       = this.form.get("nroempresa").value;
                m.seqs.seqlocal         = this.form.get("local").value;
                m.seqs.seqcgo           = this.form.get("cgo").value;
                m.seqs.seqembalagem     = this.form.get("embalagem").value;
                m.seqs.seqmotivo        = this.form.get("motivo").value;
                m.seqs.seqgermov        = this.form.get("germov").value;
                m.texts                 = new Text();
                m.texts.unidade         = this.estoquePorLoteServ.getTextSelected(this.unidades, this.form.get("sequnidade").value, "Unidade");
                m.texts.produto         = this.form.get("descricao").value;
                m.texts.lote            = this.estoquePorLoteServ.getTextSelected(this.lote, this.form.get("lote").value, "Lote");
                m.texts.fantasia        = this.estoquePorLoteServ.getTextSelected(this.empresas, this.form.get("nroempresa").value, "Empresa");
                m.texts.local           = this.estoquePorLoteServ.getTextSelected(this.local, this.form.get("local").value, "Select");
                m.texts.cgo             = this.estoquePorLoteServ.getTextSelected(this.cgo, this.form.get("cgo").value, "Select");
                m.texts.embalagem       = this.estoquePorLoteServ.getTextSelected(this.embalagens, this.form.get("embalagem").value, "Embalagem");
                m.texts.motivo          = this.estoquePorLoteServ.getTextSelected(this.motivo, this.form.get("motivo").value, "Select");
                m.texts.germov          = this.estoquePorLoteServ.getTextSelected(this.germov, this.form.get("germov").value, "Select");
                m.qtdemov               = this.form.get("qtdmov").value;
                m.justificativa         = this.form.get("justificativa").value;


               this.movestoquelote.push(m);

               this.dataSource = new MatTableDataSource<MovEstoqueLote>(this.movestoquelote);

               this.showBotaoSalvar();
               this.limparRestante();
            }

            this.error.showError(this.form);
        }
    }

    removeRowGrid(id : string){
        this.movestoquelote = this.estoquePorLoteServ.deleteRow(this.movestoquelote, id);
        this.dataSource = new MatTableDataSource<MovEstoqueLote>(this.movestoquelote);

        this.showBotaoSalvar();
    }

    limpar() {
        this.empresas = [];
        this.local = [];
        this.cgo = [];
        this.motivo = [];
        this.filteredOptions = [];
        this.movestoquelote = [];
        this.dataSource = new MatTableDataSource<MovEstoqueLote>(this.movestoquelote);

        this.form.get("nroempresa").setValue(null);
        this.form.get("lote").setValue(null);
        this.form.get("cgo").setValue(null);
        this.form.get("motivo").setValue(null);

        this.form.get("codigo").setValue(null);
        this.form.get("descricao").setValue(null);
        this.form.get("lote").setValue(null);
        this.form.get("estoquedisp").setValue(null);
        this.form.get("embalagem").setValue(null);
        this.form.get("qtdmov").setValue(null);
        this.form.get("justificativa").setValue(null);
        this.form.get("germov").setValue(null);

        this.hideCamposSelect = false;
        this.hideCampos       = true;
        this.hideCampos2      = true;
        this.hideGrid         = true;

        this.codigoprod.nativeElement.focus();
    }



    limparRestante() {
        this.filteredOptions = [];

        this.form.get("codigo").setValue(null);
        this.form.get("descricao").setValue(null);
        this.form.get("lote").setValue(null);
        this.form.get("estoquedisp").setValue(null);
        this.form.get("embalagem").setValue(null);
        this.form.get("qtdmov").setValue(null);
        this.form.get("justificativa").setValue(null);
        this.form.get("germov").setValue(null);

        this.hideCampos2  = true;

        this.codigoprod.nativeElement.focus();
    }

    showBotaoSalvar(){
        if(this.movestoquelote.length > 0){
            this.hideSalvar = false;
        }else{
            this.hideSalvar = true;
        }
    }


   ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
        this._subscriptions.forEach(x => {
        x.unsubscribe();
        });
    }
}
