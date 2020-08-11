import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Unidade } from "../../../shared/models/Unidade";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ReservaFrotaService } from "./reserva.service";
import { UserService } from "../../../shared/services/user.service";
import { Subscription } from "rxjs";
import { RodarJson } from "../../../shared/models/RodarJson";
import { Reservas } from "../../../shared/models/Frota";
import { isArray } from "jquery";
import { DialogService } from "../../../shared/services/dialog.service";

@Component({
    selector: 'app-reserva-lista-frota',
    templateUrl: './reserva-lista.component.html',
    styleUrls: ['./reserva-lista.component.scss']
})
export class ReservaListaFrotaComponent implements OnInit, OnDestroy{
    form                  : FormGroup;
    unidades              : Array<Unidade>      = [];
    reservas              : Array<Reservas>     = [];
    private _subscriptions: Array<Subscription> = [];

    //fabspeeddial : FabSpeedDial;

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
        }
   }

    constructor(private router                      : Router,
                private fb                          : FormBuilder,
                private reservaService              : ReservaFrotaService,
                private user                        : UserService,
                private dialog                      : DialogService,
                private activatedRouter             : ActivatedRoute,
                ){

        this.form = this.fb.group({
            sequnidade  : new FormControl('', [Validators.nullValidator])
        });
    }

    ngOnInit() {
       this.unidades = this.user.getUnidadePerm();
       this.carregaGridReservas('V');

    }

    carregaGridReservas(status){
        let r = new RodarJson();  r.obj = [{ status : status, seqreserva: null, tipo : '' }]; r.tipo = "BUSCARESERVAS";
        this._subscriptions.push(this.reservaService.getExec(r).subscribe((c : Reservas[]) => {
            if(isArray(c)) {
                if(c.length > 0) {
                    c.forEach(x => {
                        let r          = new Reservas();
                        r.PLACA        = x.PLACA;
                        r.ANO          = x.ANO;
                        r.DATAINCLUSAO = x.DATAINCLUSAO;
                        r.DATARESERVA  = x.DATARESERVA;
                        r.DESTINOS     = x.DESTINOS;
                        r.HORAINICIO   = x.HORAINICIO;
                        r.HORAFIM      = x.HORAFIM;
                        r.MODELO       = x.MODELO;
                        r.ORIGEM       = x.ORIGEM;
                        r.OBSERVACAO   = x.OBSERVACAO;
                        r.SEQRESERVA   = x.SEQRESERVA;
                        r.SEQUNIDADE   = x.SEQUNIDADE;
                        r.SEQUSUARIO   = x.SEQUSUARIO;
                        r.SEQVEICULO   = x.SEQVEICULO;
                        r.UNIDADE      = x.UNIDADE;
                        r.NOME         = x.NOME;
                        this.reservas.push(r);
                    });
                }

               this.qtdreservas = this.reservas.length;
            }
        }));
    }


    cancelarReserva(seqreserva : number, datareserva : string, horainicio : string, horafim : string, observacao : string, seqveiculo : number, sequnidade : number, sequsuario : number){
       let dialogRef = this.dialog.dialogConfirm("Confirmação!", "Tem certeza que deseja cancelar a reserva " + seqreserva + "?", "450px");

       this._subscriptions.push(dialogRef.afterClosed().subscribe(result => {
        if(result){

            let r = new RodarJson();
                r.obj = [{
                    seqreserva  : seqreserva,
                    seqveiculo  : seqveiculo,
                    datareserv  : datareserva,
                    horainicial : datareserva + ' ' + horainicio,
                    horafim     : datareserva + ' ' + horafim,
                    observacao  : observacao,
                    sequnidade  : sequnidade,
                    status      : 'C',
                    sequsuario  : sequsuario,
                    tipo        : ''
                }];
                r.tipo = "RESERVAFROTA";

                this._subscriptions.push(this.reservaService.getExec(r).subscribe((c: object) => {
                    this.router.navigate(['/admin/frota/reserva/lista']);
                }));
            }
        }));
    }

    submit(){}

    _click(btn: string, seqreserva : number) {
        switch(btn){
            case "ADD":
               this.router.navigate(['/admin/frota/reserva/novo']);
              break;
            case "EDIT":
              this.router.navigate(['/admin/frota/reserva/editar/' + seqreserva]);
              break;
        }
    }

    ngOnDestroy(){
        this._subscriptions.forEach(x => {
          if(x){
            x.unsubscribe();
          }
        });
    }
}
