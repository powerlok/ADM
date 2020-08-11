import { Component, OnInit, OnDestroy, Input, Inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CadastroFrotaService } from "./cadastro.service";
import { UserService } from "../../../shared/services/user.service";
import { DiaSemana, Rodizio } from "../../../shared/models/Frota";
import { RodarJson } from "../../../shared/models/RodarJson";
import { Subscription } from "rxjs";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { isArray } from "util";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-cadastro-popup-rodizio-form-frota',
    templateUrl: './cadastro-popup-rodizio-form.component.html',
    styleUrls: ['./cadastro-popup-rodizio-form.component.scss'],
})
export class  CadastroPopupRodizioFrotaComponent implements OnInit, OnDestroy {
    form       : FormGroup;
    diaSemana  : Array<DiaSemana>;
    rodizios   : Array<Rodizio>;
    private _subscriptions: Array<Subscription> = [];
    constructor(private fb : FormBuilder, 
                private cadastroService : CadastroFrotaService, 
                private user : UserService, 
                private validError : ValidationErrorService,  
                private dialogRef: MatDialogRef<CadastroPopupRodizioFrotaComponent>,  @Inject(MAT_DIALOG_DATA) private data){
       
        this.carregaDiaSamana();
        this.form = this.fb.group({ 
            uf       : new FormControl('', [Validators.required]),
            cidade   : new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
            dia      : new FormControl('', [Validators.required/*, Validators.minLength(6)*/])
        });
       
    }

    ngOnInit(){
        
    }

    carregaDiaSamana(){
        let r = new RodarJson();  
        r.obj = [{ null: null  }]; 
        r.tipo = "DIASEMANA";
        this._subscriptions.push(this.cadastroService.getExec(r).subscribe((x : DiaSemana[]) =>  this.diaSemana = x));
    }

    submit(){
        if(this.form.valid){
            let r = new RodarJson();
            r.obj = [{seqveiculo: this.data.seqveiculo, 
                              uf: this.form.get("uf").value, 
                          cidade: this.form.get("cidade").value, 
                          status: "A", 
                             dia: this.form.get("dia").value
                    }];
            r.tipo = "CADRODIZIO";

            this.cadastroService.getExec(r).subscribe((x : Rodizio[]) => {
               if(isArray(x) && x != null){
                   if(x.length > 0){
                     this.dialogRef.close();
                   }
               }
            });
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