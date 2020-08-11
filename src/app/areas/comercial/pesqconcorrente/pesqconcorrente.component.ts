import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { UserService } from "../../../shared/services/user.service";
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, FormArray } from "@angular/forms";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Empresa } from "../../../shared/models/Empresa";
import { Unidade } from "../../../shared/models/Unidade";
import { Concorrente } from "../../../shared/models/Concorrente";
import { PesqConcorrenteService } from "./pesqconcorrente.services";
import { CustomValidators } from "../../../shared/custom.validators";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-pesqconcorrente',
    templateUrl: './pesqconcorrente.component.html',
    styleUrls: ['./pesqconcorrente.component.scss'],
})
export class PesqConcorrenteComponent implements OnDestroy {
    form: FormGroup;
    empresas        : Array<Empresa> = [];
    unidades        : Array<Unidade> = [];
    concorrentes    : Array<Concorrente> = [];
    fornecedores    : object;
    displayedColumns = ['seqconcorrente', 'unidade', 'nomereduzido', 'fantasia', 'delete'];
	dataSource = new MatTableDataSource<Concorrente>(this.concorrentes);
	@ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    checkedAll: any;

    private _subscriptions: Array<Subscription> = [];

    constructor(private fb: FormBuilder, private error: ValidationErrorService, private user : UserService, private pesqConcorrenteServ : PesqConcorrenteService){
        this.unidades = user.getUnidadePerm();

        this.form = this.fb.group({
            checkall          : new FormControl('', [Validators.nullValidator]),
            seqconcorrente    : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
            empresa           : this.buildEmpresas(),
            sequnidade        : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
        });/*,{
            validator: Validators.compose([CustomValidators.ckEmpresa])
          })*/
    }

    buildEmpresas(){
        const regrasArray = this.empresas.map(e=>{
          return this.fb.control(e.checked);
        });
        return this.fb.array(regrasArray, CustomValidators.checkboxValidator);
    }

    updateChkbxArray(id, isChecked, key) {
        const chkArray = <FormArray> this.form.get(key);

        if (isChecked) {
          chkArray.push(new FormControl(id));
        } else {
          let idx = chkArray.controls.findIndex(x => x.value == id);
          chkArray.removeAt(idx);
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
	}

    onChange(sequnidade: number){

        this.form.patchValue({ checkall: false});
        this.empresas.map(x => { x.checked = false; });
        this.empresas = this.user.getEmpresaPermUnid(sequnidade);

        this._subscriptions.push(this.pesqConcorrenteServ.carregaFornecedores(sequnidade).subscribe(x => this.fornecedores = x));

        this.carregaConcorrentes(sequnidade);

    }

    carregaConcorrentes(sequnidade : number){
        this._subscriptions.push(this.pesqConcorrenteServ.carregaConconrrentes(sequnidade).subscribe((x : Concorrente[]) => {
            this.concorrentes = x;

            this.dataSource = new MatTableDataSource<Concorrente>(this.concorrentes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }));
    }

    removeEmpresa(chkArray) {
        this.empresas.map(k =>  {
            let idx = chkArray.controls.findIndex(x => x.value == k.nroEmpresa);
            chkArray.removeAt(idx);
        });
    }

    addEmpresa(chkArray) {
        this.empresas.map(x =>  { chkArray.push(new FormControl(x.nroEmpresa)) });
    }

    checkAll(event) {
        const chkArray = <FormArray> this.form.get("empresa");
        if (event.checked == true) {
            this.empresas.filter(x => x.checked = true);

            this.removeEmpresa(chkArray);
            this.addEmpresa(chkArray);

        } else {
            this.empresas.filter(x => x.checked = false);
            this.removeEmpresa(chkArray);
        }
    }

    deletar(seqconcorrente : number, nroempresa : number) {
        this._subscriptions.push(this.pesqConcorrenteServ.deletar(seqconcorrente, this.form.get("sequnidade").value, nroempresa)
                        .subscribe((data : Concorrente[]) => {
                            this.carregaConcorrentes(this.form.get("sequnidade").value);
                        }));
	}

    submit()
    {
        if(this.form.valid)
        {
              let nroempresa : number[] = this.form.get("empresa").value;
              let qtde : number = nroempresa.length;


                for (let e in nroempresa) {
                    let n : number = (Number(e) + 1);
                    this._subscriptions.push(this.pesqConcorrenteServ.salvar(nroempresa[e], this.form.get("sequnidade").value, this.form.get("seqconcorrente").value)
                                            .subscribe(x => {
                                                    if(qtde == n) this.carregaConcorrentes(this.form.get("sequnidade").value);
                                            }));
                }
        }

        this.form.updateValueAndValidity();
        this.error.showError(this.form);
    }

    ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this._subscriptions.forEach(x => {
		x.unsubscribe();
		});
    }

}
