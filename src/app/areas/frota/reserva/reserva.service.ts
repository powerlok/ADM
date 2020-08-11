import { Injectable } from "@angular/core";
import { OrdenaArray } from "../../../shared/util/ordena-array";
import { ReservaFrotaServiceJson } from "./reserva.service.json";
import { Observable } from "rxjs";
import { RodarJson } from "../../../shared/models/RodarJson";
import { DbConsult } from "../../../shared/models/Service";
import { AlertService } from "../../../shared/services/alert.service";
import { AlertRodizioComponent } from "./popup/alert-rodizio.component";
import { MatDialog } from "@angular/material";
import { Rodizio, Local } from "../../../shared/models/Frota";

@Injectable()
export class ReservaFrotaService {

    constructor(private json : ReservaFrotaServiceJson, private ordenaArray : OrdenaArray, private alertService: AlertService, public dialog: MatDialog) {
    }

    getExec(r : RodarJson) : Observable<object> {
        return this.json.gerarJson(r);
    }

    getExecMult(r : RodarJson[]): Observable<object> {
        return this.json.gerarJsonMult(r);
    }

    getRequest(requests)  {
        let retorno : string = null;

        for(let res of requests) {
            let r = res as DbConsult;
            let resp : object = r.obj.json as object;

            if(res.error.errorMasseger != null){
                this.alertService.alert('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger);
                break;
            }else{
                retorno = resp.toString();
                continue;
            }
        }
    }


    dialogRodizio(titulo : string, descricao : string, rodizio: Rodizio[], width: string) : any{
        let dialogRef = this.dialog.open(AlertRodizioComponent, {
                width: width,
                data: { titulo : titulo, descricao: descricao, grid:  rodizio }
            });

            return dialogRef
    }

    removerLocalGrid(local : Local[], nroempresa : number) : Local[] {

        let index = local.findIndex(i => i.NROEMPRESA === nroempresa);
                    local.splice(index, 1);

        return local;
    }

    deleteReservaDestino(seqreserva, nroempresa, nomereduzido, sequnidade) : Observable<any>{
        let r = new RodarJson();
        r.obj = [{
            seqreserva  : seqreserva,
            acao        : "DELETE",
            nroempresa  : nroempresa,
            nomereduzido: nomereduzido,
            sequnidade  : sequnidade
        }];
        r.tipo = "DELETELOCALGRID";

        return this.getExec(r);
    }

}
