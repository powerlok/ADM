import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Unidade } from "../../../shared/models/Unidade";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../../shared/services/user.service";
import { Subscription } from "rxjs";
import { RodarJson } from "../../../shared/models/RodarJson";
import { Reservas } from "../../../shared/models/Frota";
<<<<<<< HEAD
import { isArray } from "jquery";
import { DialogService } from "../../../shared/services/dialog.service";
import { ReservaFrotaService } from "../reserva/reserva.service";
import { Select } from "../../../shared/models/Components";
=======
import { DialogService } from "../../../shared/services/dialog.service";
import { ReservaFrotaService } from "../reserva/reserva.service";
import { Select } from "../../../shared/models/Components";
import { isArray } from "jquery";
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

@Component({
    selector: 'app-gerenciarreserva-lista-frota',
    templateUrl: './gerenciarreserva-lista.component.html',
    styleUrls: ['./gerenciarreserva-lista.component.scss']
})
export class GerenciarReservaListaFrotaComponent implements OnInit, OnDestroy{
    form                  : FormGroup;
    situacoes             : Array<Select>       = [];
    reservas              : Array<Reservas>     = [];
    private _subscriptions: Array<Subscription> = [];
    fragment              : any;

    private _fixed: boolean = false;
    qtdreservas : number = 0;
    open: boolean;
    spin: boolean = true;
    direction: string = 'left';
    animationMode: string = 'fling';

    get fixed() { return this._fixed; }
    set fixed(fixed: boolean) {
        this._fixed = fixed;
        if (this._fixed) {
            this.open = false;
<<<<<<< HEAD
        } 
    }
    
    constructor(private router                     : Router, 
                private fb                         : FormBuilder,
                private reservaService             : ReservaFrotaService, 
=======
        }
    }

    constructor(private router                     : Router,
                private fb                         : FormBuilder,
                private reservaService             : ReservaFrotaService,
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
                private user                       : UserService,
                private activatedRouter            : ActivatedRoute,
                private dialog                     : DialogService
                ){

<<<<<<< HEAD
        this.form = this.fb.group({ 
=======
        this.form = this.fb.group({
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
            situacao  : new FormControl('', [Validators.nullValidator])
        });
    }

    ngOnInit() {
       this.situacoes = new Array<Select>({id:'V', text: 'Validos', selected: false}, {id:'C' , text: 'Cancelado', selected: false}, { id:'F' , text: 'Finalizado', selected: false});
<<<<<<< HEAD
              
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
       this._subscriptions.push(
        this.activatedRouter.params.subscribe((params: Params) => {
            if(params["id"] != null) {
              this.form.get("situacao").setValue(params["id"]);
              this.carregaGridReservas(params["id"]);
            }else{
              this.form.get("situacao").setValue('V');
              this.carregaGridReservas('V');
<<<<<<< HEAD
            }            
=======
            }
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        }));

    }

<<<<<<< HEAD
    aoSelecionarUSituacao(situacao){     
=======
    aoSelecionarUSituacao(situacao){
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
       this.carregaGridReservas(situacao);
    }

    carregaGridReservas(status){
        this.reservas = [];
        let r = new RodarJson();  r.obj = [{ status : status, seqreserva: null, tipo: "T" }]; r.tipo = "BUSCARESERVAS";
        this._subscriptions.push(this.reservaService.getExec(r).subscribe((c : Reservas[]) => {
            if(isArray(c)) {
                if(c.length > 0) {
                    c.forEach(x => {
                        let r           = new Reservas();
                        r.PLACA         = x.PLACA;
                        r.ANO           = x.ANO;
                        r.DATAINCLUSAO  = x.DATAINCLUSAO;
                        r.DATARESERVA   = x.DATARESERVA;
                        r.DESTINOS      = x.DESTINOS;
                        r.HORAINICIO    = x.HORAINICIO;
                        r.HORAFIM       = x.HORAFIM;
                        r.MODELO        = x.MODELO;
                        r.ORIGEM        = x.ORIGEM;
                        r.OBSERVACAO    = x.OBSERVACAO;
                        r.SEQRESERVA    = x.SEQRESERVA;
                        r.SEQUNIDADE    = x.SEQUNIDADE;
                        r.SEQUSUARIO    = x.SEQUSUARIO;
                        r.SEQVEICULO    = x.SEQVEICULO;
                        r.UNIDADE       = x.UNIDADE;
                        r.CHAPACONDUTOR = x.CHAPACONDUTOR;
                        r.NOME          = x.NOME;
                        r.STATUS        = x.STATUS;
                        this.reservas.push(r);
<<<<<<< HEAD
                    });   
                }                
=======
                    });
                }
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

               this.qtdreservas = this.reservas.length;
            }
        }));
    }

    cancelarReserva(seqreserva : number, datareserva : string, horainicio : string, horafim : string, observacao : string, seqveiculo : number, sequnidade : number, sequsuario : number, chapa : string){
       let dialogRef = this.dialog.dialogConfirm("Confirmação!", "Tem certeza que deseja cancelar a reserva " + seqreserva + "?", "450px");
<<<<<<< HEAD
        
       this._subscriptions.push(dialogRef.afterClosed().subscribe(result => {
        if(result){
    
            let r = new RodarJson();
                r.obj = [{
                    seqreserva  : seqreserva,         
=======

       this._subscriptions.push(dialogRef.afterClosed().subscribe(result => {
        if(result){

            let r = new RodarJson();
                r.obj = [{
                    seqreserva  : seqreserva,
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
                    seqveiculo  : seqveiculo,
                    datareserv  : datareserva,
                    horainicial : datareserva + ' ' + horainicio,
                    horafim     : datareserva + ' ' + horafim,
                    observacao  : observacao,
                    sequnidade  : sequnidade,
                    status      : 'C',
                    sequsuario  : sequsuario,
                    chapa       : chapa,
                    tipo: 'T'
                }];
                r.tipo = "RESERVAFROTA";
<<<<<<< HEAD
                            
                this._subscriptions.push(this.reservaService.getExec(r).subscribe((c: object) => { 
=======

                this._subscriptions.push(this.reservaService.getExec(r).subscribe((c: object) => {
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
                    this.router.navigate(['/admin/frota/gerenciar reserva/lista']);
                }));
            }
        }));
    }

    submit(){}

    _click(btn: string, seqreserva : number) {
        switch(btn){
            case "ADD":
               this.router.navigate(['/admin/frota/gerenciar reserva/novo']);
              break;
            case "EDIT":
              this.router.navigate(['/admin/frota/gerenciar reserva/editar/' + seqreserva]);
              break;
        }
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
