import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { UserService } from "../../../shared/services/user.service";
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, FormArray } from "@angular/forms";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
<<<<<<< HEAD
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
=======
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
import { Empresa } from "../../../shared/models/Empresa";
import { Unidade } from "../../../shared/models/Unidade";
import { Concorrente } from "../../../shared/models/Concorrente";
import { PesqConcorrenteService } from "./pesqconcorrente.services";
import { CustomValidators } from "../../../shared/custom.validators";
import { Subscription } from "rxjs";
<<<<<<< HEAD
=======
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

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
<<<<<<< HEAD
    
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    private _subscriptions: Array<Subscription> = [];

    constructor(private fb: FormBuilder, private error: ValidationErrorService, private user : UserService, private pesqConcorrenteServ : PesqConcorrenteService){
        this.unidades = user.getUnidadePerm();

        this.form = this.fb.group({
<<<<<<< HEAD
            checkall          : new FormControl('', [Validators.nullValidator]),			
            seqconcorrente    : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),           
=======
            checkall          : new FormControl('', [Validators.nullValidator]),
            seqconcorrente    : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
            empresa           : this.buildEmpresas(),
            sequnidade        : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
        });/*,{
            validator: Validators.compose([CustomValidators.ckEmpresa])
<<<<<<< HEAD
          })*/	
=======
          })*/
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    }

    buildEmpresas(){
        const regrasArray = this.empresas.map(e=>{
          return this.fb.control(e.checked);
        });
        return this.fb.array(regrasArray, CustomValidators.checkboxValidator);
    }

    updateChkbxArray(id, isChecked, key) {
        const chkArray = <FormArray> this.form.get(key);
<<<<<<< HEAD
       
        if (isChecked) {
          chkArray.push(new FormControl(id));          
        } else {
          let idx = chkArray.controls.findIndex(x => x.value == id);
          chkArray.removeAt(idx);   
        }        
    }
    
=======

        if (isChecked) {
          chkArray.push(new FormControl(id));
        } else {
          let idx = chkArray.controls.findIndex(x => x.value == id);
          chkArray.removeAt(idx);
        }
    }

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
	}

<<<<<<< HEAD
    onChange(sequnidade: number){ 
    
        this.form.patchValue({ checkall: false});
        this.empresas.map(x => { x.checked = false; });
        this.empresas = this.user.getEmpresaPermUnid(sequnidade);
       
        this._subscriptions.push(this.pesqConcorrenteServ.carregaFornecedores(sequnidade).subscribe(x => this.fornecedores = x));
        
        this.carregaConcorrentes(sequnidade);
        
=======
    onChange(sequnidade: number){

        this.form.patchValue({ checkall: false});
        this.empresas.map(x => { x.checked = false; });
        this.empresas = this.user.getEmpresaPermUnid(sequnidade);

        this._subscriptions.push(this.pesqConcorrenteServ.carregaFornecedores(sequnidade).subscribe(x => this.fornecedores = x));

        this.carregaConcorrentes(sequnidade);

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    }

    carregaConcorrentes(sequnidade : number){
        this._subscriptions.push(this.pesqConcorrenteServ.carregaConconrrentes(sequnidade).subscribe((x : Concorrente[]) => {
            this.concorrentes = x;

            this.dataSource = new MatTableDataSource<Concorrente>(this.concorrentes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }));
    }
<<<<<<< HEAD
    
    removeEmpresa(chkArray) {
        this.empresas.map(k =>  {
            let idx = chkArray.controls.findIndex(x => x.value == k.nroEmpresa);
            chkArray.removeAt(idx); 
        });                      
    }

    addEmpresa(chkArray) {
        this.empresas.map(x =>  { chkArray.push(new FormControl(x.nroEmpresa)) });     
=======

    removeEmpresa(chkArray) {
        this.empresas.map(k =>  {
            let idx = chkArray.controls.findIndex(x => x.value == k.nroEmpresa);
            chkArray.removeAt(idx);
        });
    }

    addEmpresa(chkArray) {
        this.empresas.map(x =>  { chkArray.push(new FormControl(x.nroEmpresa)) });
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    }

    checkAll(event) {
        const chkArray = <FormArray> this.form.get("empresa");
<<<<<<< HEAD
        if (event.checked == true) { 
            this.empresas.filter(x => x.checked = true);    

            this.removeEmpresa(chkArray);
            this.addEmpresa(chkArray); 
        
        } else {
            this.empresas.filter(x => x.checked = false);
            this.removeEmpresa(chkArray);             
=======
        if (event.checked == true) {
            this.empresas.filter(x => x.checked = true);

            this.removeEmpresa(chkArray);
            this.addEmpresa(chkArray);

        } else {
            this.empresas.filter(x => x.checked = false);
            this.removeEmpresa(chkArray);
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        }
    }

    deletar(seqconcorrente : number, nroempresa : number) {
        this._subscriptions.push(this.pesqConcorrenteServ.deletar(seqconcorrente, this.form.get("sequnidade").value, nroempresa)
                        .subscribe((data : Concorrente[]) => {
                            this.carregaConcorrentes(this.form.get("sequnidade").value);
<<<<<<< HEAD
                        }));                               
	}

    submit()
    {        
        if(this.form.valid)
        {
              let nroempresa : number[] = this.form.get("empresa").value; 
=======
                        }));
	}

    submit()
    {
        if(this.form.valid)
        {
              let nroempresa : number[] = this.form.get("empresa").value;
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
              let qtde : number = nroempresa.length;


                for (let e in nroempresa) {
                    let n : number = (Number(e) + 1);
                    this._subscriptions.push(this.pesqConcorrenteServ.salvar(nroempresa[e], this.form.get("sequnidade").value, this.form.get("seqconcorrente").value)
<<<<<<< HEAD
                                            .subscribe(x => { 
                                                    if(qtde == n) this.carregaConcorrentes(this.form.get("sequnidade").value);                                                  
                                            }));
                }    
        }
        
        this.form.updateValueAndValidity(); 
=======
                                            .subscribe(x => {
                                                    if(qtde == n) this.carregaConcorrentes(this.form.get("sequnidade").value);
                                            }));
                }
        }

        this.form.updateValueAndValidity();
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        this.error.showError(this.form);
    }

    ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this._subscriptions.forEach(x => {
		x.unsubscribe();
		});
    }

}
