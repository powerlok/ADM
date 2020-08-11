import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Cadastro } from "../../../shared/models/Frota";
import { CadastroFrotaService } from "./cadastro.service";
import { UserService } from "../../../shared/services/user.service";
import { Unidade } from "../../../shared/models/Unidade";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { RodarJson } from "../../../shared/models/RodarJson";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { isArray } from "jquery";

@Component({
    selector: 'app-cadastro-lista-frota',
    templateUrl: './cadastro-lista.component.html',
    styleUrls: ['./cadastro-lista.component.scss'],
})
export class CadastroListaFrotaComponent implements OnInit, OnDestroy {
    form       : FormGroup;
    cadastros  : Array<Cadastro> = [];
    unidades   : Array<Unidade> = [];
    private _subscriptions: Array<Subscription> = [];

    displayedColumns = ['placa', 'modelo', 'empresa', 'status', 'editar'];
    dataSource = new MatTableDataSource<Cadastro>(this.cadastros);
    @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

    constructor(private router: Router, private fb : FormBuilder, private cadastroService : CadastroFrotaService, private user : UserService){

        this.form = this.fb.group({
            sequnidade  : new FormControl('', [Validators.nullValidator])
        });
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.unidades = this.user.getUnidadePerm();
    }

    carregaGridCadastros(id){
        this.cadastros = [];
        let r = new RodarJson();  r.obj = [{ sequnidade: id, placa : null, seqveiculo: null }]; r.tipo = "CADASTROS";
        this._subscriptions.push(this.cadastroService.getExec(r).subscribe((c : Cadastro[]) => {
            if(isArray(c)) {
                c.forEach(x => {
                    let r          = new Cadastro();
                    r.PLACA        = x.PLACA;
                    r.MODELO       = x.MODELO;
                    r.NOMEEMPALOC  = x.NOMEEMPALOC;
                    r.EMPALOCACAO  = x.EMPALOCACAO;
                    r.SEQUNIDADE   = x.SEQUNIDADE;
                    r.SEQVEICULO   = x.SEQVEICULO;
                    r.ANO          = x.ANO;
                    r.STATUS       = x.STATUS;
                    r.UNIDADE      = x.UNIDADE;
                    this.cadastros.push(r);
                });
                this.dataSource = new MatTableDataSource<Cadastro>(this.cadastros);
                this.dataSource.paginator = this.paginator;
            }
        }));
    }

    novoCadastro(){
		this.router.navigate(['/admin/frota/cadastro/novo/']);
    }

    editaGridLinhaCadastro(seqveiculo){
		this.router.navigate(['/admin/frota/cadastro/editar/' + seqveiculo + "/" + this.form.get("sequnidade").value]);
    }

    removeGridLinhaCadastro(){

    }

    submit(){}

    ngOnDestroy(){
        this._subscriptions.forEach(x => {
          if(x){
            x.unsubscribe();
          }
        });
    }
}
