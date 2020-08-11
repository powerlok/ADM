import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Unidade } from "../../../shared/models/Unidade";
import { FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { ListaCheckinFrotaService } from "./lista-checkin.service";
import { UserService } from "../../../shared/services/user.service";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { Select } from "../../../shared/models/Components";
<<<<<<< HEAD
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ListaCheckin } from "../../../shared/models/Frota";
import { Subscription } from "rxjs";
import { RodarJson } from "../../../shared/models/RodarJson";
import { isArray } from "jquery";
import { Router } from "@angular/router";
=======
import { ListaCheckin } from "../../../shared/models/Frota";
import { Subscription } from "rxjs";
import { RodarJson } from "../../../shared/models/RodarJson";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { isArray } from 'jquery';
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

@Component({
    selector: 'app-lista-checkin-frota',
    templateUrl: './lista-checkin.component.html',
    styleUrls: ['./lista-checkin.component.scss'],
})
export class ListaCheckinFrotaComponent implements OnInit, OnDestroy {
  unidades              : Array<Unidade> = [];
  status                : Array<Select>  = [];
  form                  : FormGroup;
  listaCheckin          : Array<ListaCheckin>;
  private _subscriptions: Array<Subscription> = [];

  displayedColumns = ['desc', 'status', 'alter'];
  dataSource = new MatTableDataSource<ListaCheckin>(this.listaCheckin);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
<<<<<<< HEAD
  
  constructor(
      private router              : Router,
      private fb                  : FormBuilder, 
      private listaCheckinService : ListaCheckinFrotaService, 
      private user                : UserService, 
      private validError          : ValidationErrorService){      

        this.form = this.fb.group({ 
=======

  constructor(
      private router              : Router,
      private fb                  : FormBuilder,
      private listaCheckinService : ListaCheckinFrotaService,
      private user                : UserService,
      private validError          : ValidationErrorService){

        this.form = this.fb.group({
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
          sequnidade   : new FormControl('', [Validators.required]),
            descricao  : new FormControl('', [Validators.required])
        });
  }

    ngOnInit() {
       this.unidades = this.user.getUnidadePerm();
       this.dataSource.paginator = this.paginator;
    }
<<<<<<< HEAD
  
    carregaGridCheckins(sequnidade, seqitem){
      let r = new RodarJson();  r.obj = [{ sequnidade: sequnidade, descricao : null, seqitem: null, status: null }]; 
          r.tipo = "BUSCACHECKINS";
        
          this._subscriptions.push(this.listaCheckinService.getExec(r).subscribe((c : ListaCheckin[]) => { console.log(c);
            if(isArray(c)) {
               this.listaCheckin = new Array<ListaCheckin>(); 
=======

    carregaGridCheckins(sequnidade, seqitem){
      let r = new RodarJson();  r.obj = [{ sequnidade: sequnidade, descricao : null, seqitem: null, status: null }];
          r.tipo = "BUSCACHECKINS";

          this._subscriptions.push(this.listaCheckinService.getExec(r).subscribe((c : ListaCheckin[]) => { console.log(c);
            if(isArray(c)) {
               this.listaCheckin = new Array<ListaCheckin>();
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

                c.forEach(x => {
                    let r         = new ListaCheckin();
                    r.DESCRICAO   = x.DESCRICAO;
                    r.SEQITEM     = x.SEQITEM;
                    r.SEQUNIDADE  = x.SEQUNIDADE;
                    r.STATUS      = x.STATUS;
                    r.ICON        = x.STATUS;
                    this.listaCheckin.push(r);
                });

                this.dataSource = new MatTableDataSource<ListaCheckin>(this.listaCheckin);
                this.dataSource.paginator = this.paginator;
            }
        }));
    }

<<<<<<< HEAD
  ativaInativaRowGrid(sequnidade, seqitem, descricao, status) { 
      let s = (status == 'Ativo') ? 'I' : 'A';    
      let r = new RodarJson();  
      r.obj = [{ sequnidade: sequnidade, descricao : descricao, seqitem: seqitem, status: s }];     
      r.tipo = "CADITEMCHECKIN";   

      this._subscriptions.push(this.listaCheckinService.getExec(r).subscribe(seqitem => {
          if(Number(seqitem)) { 
            this.carregaGridCheckins(sequnidade, seqitem);              
=======
  ativaInativaRowGrid(sequnidade, seqitem, descricao, status) {
      let s = (status == 'Ativo') ? 'I' : 'A';
      let r = new RodarJson();
      r.obj = [{ sequnidade: sequnidade, descricao : descricao, seqitem: seqitem, status: s }];
      r.tipo = "CADITEMCHECKIN";

      this._subscriptions.push(this.listaCheckinService.getExec(r).subscribe(seqitem => {
          if(Number(seqitem)) {
            this.carregaGridCheckins(sequnidade, seqitem);
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
          }
      }));
  }

  submit(){
      if(this.form.valid){
<<<<<<< HEAD
        let r = new RodarJson();  
        r.obj = [{
                    sequnidade: this.form.get("sequnidade").value, 
                     descricao: this.form.get("descricao").value,
                       seqitem: 0, 
                        status: 'A'
                }]; 
        r.tipo = "CADITEMCHECKIN";   

        this._subscriptions.push(this.listaCheckinService.getExec(r).subscribe((seqitem : any) => {
            this.listaCheckin = new Array<ListaCheckin>();
            if(seqitem > 0) {    
=======
        let r = new RodarJson();
        r.obj = [{
                    sequnidade: this.form.get("sequnidade").value,
                     descricao: this.form.get("descricao").value,
                       seqitem: 0,
                        status: 'A'
                }];
        r.tipo = "CADITEMCHECKIN";

        this._subscriptions.push(this.listaCheckinService.getExec(r).subscribe((seqitem : any) => {
            this.listaCheckin = new Array<ListaCheckin>();
            if(seqitem > 0) {
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
              this.carregaGridCheckins(this.form.get("sequnidade").value, seqitem);
            }
        }));
      }

      this.validError.showError(this.form);
  }

<<<<<<< HEAD
     
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
  ngOnDestroy(){
    this._subscriptions.forEach(x => {
      if(x){
        x.unsubscribe();
      }
    });
  }

<<<<<<< HEAD
}
=======
}
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
