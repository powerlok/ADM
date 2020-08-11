import { Injectable } from "@angular/core";
import { OrdenaArray } from "../../../shared/util/ordena-array";
import { Observable, of } from "rxjs";
import { RodarJson } from "../../../shared/models/RodarJson";
import { AlertService } from "../../../shared/services/alert.service";
<<<<<<< HEAD
import { MatDialog } from "@angular/material";
=======
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
import { Rodizio, Local, ListaCheckin, CheckInCheckOut } from "../../../shared/models/Frota";
import { GerenciarReservaFrotaServiceJson } from "./gerenciarreserva.service.json";
import { ReservaFrotaService } from "../reserva/reserva.service";
import { DbConsult } from "../../../shared/models/Service";
<<<<<<< HEAD

@Injectable()
export class GerenciareservaFrotaService {
    
=======
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class GerenciareservaFrotaService {

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    listaCheckInCheckOut    : Array<CheckInCheckOut> = [];
    constructor(private json : GerenciarReservaFrotaServiceJson, private ordenaArray : OrdenaArray, private alertService: AlertService, public dialog: MatDialog, private reservaService : ReservaFrotaService,) {
    }

    getExec(r : RodarJson) : Observable<object> {
        return this.json.gerarJson(r);
    }

    getExecMult(r : RodarJson[]): Observable<object> {
        return this.json.gerarJsonMult(r);
    }
<<<<<<< HEAD
    
    getRequest(requests) : Observable<string> {   
        let retorno : string = null;   

        for(let res of requests) {
            let r = res as DbConsult;
            let resp : object = r.obj.json as object; 
       
            if(res.error.errorMasseger != null){
                this.alertService.alert('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                retorno = '0';
                break;                                                    
            }else{              
                retorno = resp.toString();
                continue;                   
            } 
        } 
        
=======

    getRequest(requests) : Observable<string> {
        let retorno : string = null;

        for(let res of requests) {
            let r = res as DbConsult;
            let resp : object = r.obj.json as object;

            if(res.error.errorMasseger != null){
                this.alertService.alert('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                retorno = '0';
                break;
            }else{
                retorno = resp.toString();
                continue;
            }
        }

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        return of(retorno);
    }

    buscaListaCheckin(sequnidade) : Observable<any>{
        let r = new RodarJson();
            r.obj = [{ sequnidade : sequnidade }];
            r.tipo = "BUSCAITENSCHECKIN";
<<<<<<< HEAD
            
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        return  this.getExec(r);
    }

    buscaCheckinCheckout(seqreserva) : Observable<any>{
<<<<<<< HEAD
   
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        let r = new RodarJson();
            r.obj = [{
                seqreserva : seqreserva
            }];
            r.tipo = "BUSCACHECKINCHECKOUT";

        return this.getExec(r);
    }

    buscaItemCheckinCheckoutId(item: CheckInCheckOut[], seqitem : number, tipo : string) : CheckInCheckOut {
        let checkInCheckOut : CheckInCheckOut = new CheckInCheckOut();
<<<<<<< HEAD
  
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        item.forEach(element => {
            if(element.SEQITEM == seqitem && element.TIPO == tipo) {
                checkInCheckOut = element;
            }
        });

        return checkInCheckOut;
<<<<<<< HEAD
       
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    }

    salvaReservaDestino(seqreserva: number, local : Local[]) : Observable<any>{

        let jsons = new Array<RodarJson>();
        local.forEach(x => {

            let r = new RodarJson();
            r.obj = [{
                seqreserva  : seqreserva,
                acao        : "INSERT",
                nroempresa  : x.NROEMPRESA,
                nomereduzido: x.NOMEREDUZIDO,
                sequnidade  : x.SEQUNIDADE
            }];
            r.tipo = "RESERVADESITINO";

            jsons.push(r);
        });

        return this.reservaService.getExecMult(jsons);
<<<<<<< HEAD
    }  
   
    salvaCheckinCheckOut(seqreserva : number, sequnidade : number, tipo : string, kminicial : string, kmfinal : string, estacionamento : string, observacao : string) : Observable<any>{
  
=======
    }

    salvaCheckinCheckOut(seqreserva : number, sequnidade : number, tipo : string, kminicial : string, kmfinal : string, estacionamento : string, observacao : string) : Observable<any>{

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        let r = new RodarJson();
        r.obj = [{
            seqreserva     : seqreserva,
            sequnidade     : sequnidade,
            tipo           : tipo,
            kminicial      : kminicial,
            kmfinal        : kmfinal,
            estacionamento : estacionamento,
            observacao     : observacao
        }];
        r.tipo = "EDITARCHECKINCHECKOUT";

        return this.getExec(r);
    }

    salvarCheckinCheckoutItens(check : ListaCheckin[]) : Observable<any>{
<<<<<<< HEAD
        
        let jsons = new Array<RodarJson>();
        check.forEach(x => {
              
=======

        let jsons = new Array<RodarJson>();
        check.forEach(x => {

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
            let r = new RodarJson();
            r.obj = [{
                seqcheckincheckout  : x.SEQCHEKINCHEKOUT,
                seqitem             : x.SEQITEM,
                itemok              : (x.CHECKED) ? 'S' : 'N',
                observacao          : null
            }];
            r.tipo = "SALVARITENSCHECKIN";

            jsons.push(r);
        });
<<<<<<< HEAD
        
        return this.getExecMult(jsons);
    }

}
=======

        return this.getExecMult(jsons);
    }

}
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
