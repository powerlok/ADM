import { Component, ViewChild, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../../shared/services/user.service";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { CadastroCaixariaService } from "./cadastro.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { CadCaixa, CadCaixaViewModel } from "../../../shared/models/CadCaixa";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-caixaria-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss'],
})
export class CadastroCaixariaComponent implements OnDestroy{
    cadastro  : CadCaixaViewModel; 
    cadastros : CadCaixa[] = [];
    form      : FormGroup;

    displayedColumns = ['codigo', 'modelo', 'valor', 'descricao', 'editar'];    
    dataSource = new MatTableDataSource<CadCaixa>(this.cadastros);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild ('modelo') modelo;
    private _subscriptions: Array<Subscription> = [];
    
    constructor(private fb: FormBuilder, private user: UserService, private error: ValidationErrorService, private cadCaixariaServ: CadastroCaixariaService) {
        //this.tipos = [{ id : 'E', text : 'Entrada' }, { id : 'S', text : 'Saída'}];
        this.form = this.fb.group({ 
            valor             : new FormControl('', [Validators.required, CustomValidators.validafloat]),
            descricao         : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            modelo            : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            codigo            : new FormControl({disabled: true, value: ''}, [Validators.nullValidator])
        });
    }

    ngAfterViewInit() {
        
        this.getAllCadCaixa();
	}

    removeRowGrid(){

    }

    submit(){

        if(this.form.valid) {
            this.form.controls['codigo'].enable();
 
            this.cadastro           = new CadCaixaViewModel();
            this.cadastro.codigo    = (this.form.get("codigo").value == "") ? 0 : this.form.get("codigo").value;
            this.cadastro.modelo    = this.form.get("modelo").value;
            this.cadastro.descricao = this.form.get("descricao").value;
            this.cadastro.valor     = this.form.get("valor").value;
            if(this.cadastro.codigo == 0) {
              this.cadastro.acao      = "I";
            }else{
              this.cadastro.acao      = "A";
            }
            this.cadastro.obj       = "POST";
            

           this._subscriptions.push(this.cadCaixariaServ.execJson(this.cadastro)
                               .subscribe((data : object) => { 
                                  
                                       this.form.reset();
                                       this.getAllCadCaixa();
                                 
                               }));
        }
        
        this.error.showError(this.form);
        this.form.controls['codigo'].disable();
    }

    getAllCadCaixa(){
        this.cadastro     = new CadCaixaViewModel();
        this.cadastro.obj = "GET";
        
        this._subscriptions.push(this.cadCaixariaServ.execJson(this.cadastro)
                            .subscribe((data : object) => {
                                this.cadastro.cadastros   = data as CadCaixa[];
                                this.dataSource           = new MatTableDataSource<CadCaixa>(this.cadastro.cadastros);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort      = this.sort;
                            }));
    }

    editRowGrid(id) {
        this.limpar();
        this.cadastro.cadastros.map(data => { 
            if(data.SEQ_CADCAIXA == id) {   
                this.form.get("codigo").setValue(data.SEQ_CADCAIXA);
                this.form.get("modelo").setValue(data.MODELO);
                this.form.get("descricao").setValue(data.DESCRICAO);
                this.form.get("valor").setValue(data.VALOR);  
            }     
        }); 
    }

    limpar(){
        this.form.reset();
        this.modelo.nativeElement.focus();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this._subscriptions.forEach(x => {
           x.unsubscribe();
        });
    }
}
