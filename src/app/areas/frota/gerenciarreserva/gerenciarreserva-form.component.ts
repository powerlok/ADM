import { Component, OnInit, OnDestroy, Inject, forwardRef, Input, EventEmitter, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { RodarJson } from "../../../shared/models/RodarJson";
import { Cadastro, Local, Reservas, Rodizio, ListaCheckin, CheckInCheckOut } from "../../../shared/models/Frota";
import { UserService } from "../../../shared/services/user.service";
import { Unidade } from "../../../shared/models/Unidade";
import { Subscription, Observable } from "rxjs";
import { DateOracle, DateFormat } from "../../../shared/util/date-format";
import { CadastroFrotaService } from "../cadastro/cadastro.service";
import { Empresa, EmpresaDW } from "../../../shared/models/Empresa";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { ValidationErrorService } from "../../../shared/services/validation-error.service";
import { AlertService } from "../../../shared/services/alert.service";
import { CustomValidators } from "../../../shared/custom.validators";
import { ReservaFrotaService } from "../reserva/reserva.service";
import { Usuario } from "../../../shared/models/Usuario";
import { SpinnerVisibilityService } from "../../../../../node_modules/ng-http-loader";
import { GerenciareservaFrotaService } from "./gerenciarreserva.service";
import { MatTableDataSource } from "@angular/material/table";
import { isArray } from "jquery";
import { MatStepper } from "@angular/material/stepper";


@Component({
    selector: 'app-gerenciarreserva-form-frota',
    templateUrl: './gerenciarreserva-form.component.html',
    styleUrls: ['./gerenciarreserva-form.component.scss']
})
export class GerenciarReservaFormFrotaComponent implements OnInit, OnDestroy {
    firstFormGroup          : FormGroup;
    secondFormGroup         : FormGroup;
    thirdFormGroup          : FormGroup;
    fourthFormGroup         : FormGroup;
    fifthFormGroup          : FormGroup;
    sixthFormGroup          : FormGroup;
    seventhFormGroup        : FormGroup;
    seqreserva              : number = 0;
    isOptional              : boolean = false;
    veiculos                : Array<Cadastro> = [];
    unidades                : Array<Unidade> = [];
    empresas                : Array<EmpresaDW> = [];
    _subscriptions          : Array<Subscription> = [];
    local                   : Array<Local> = [];
    reservas                : Array<Reservas> = [];
    reserva                 : Reservas = null;
    isCompleted             : boolean = false;
    isLinear                : boolean = true;
    rodizio                 : Array<Rodizio> = [];
    fUsuario                : Usuario[];
    listaCheckin            : Array<ListaCheckin> =[];
    listaCheckOut           : Array<ListaCheckin> =[];
    listaCheckInCheckOut    : Array<CheckInCheckOut> = [];

    verificaCheckIn         : boolean = false;
    verificaCheckOut        : boolean = false;

    displayedColumns = ['empresa', 'remover'];
    dataSource = new MatTableDataSource<Local>(this.local);

    constructor(private router             : Router,
        private _formBuilder               : FormBuilder,
        private user                       : UserService,
        private reservaService             : ReservaFrotaService,
        private dateFormat                 : DateOracle,
        private cadastroService            : CadastroFrotaService,
        private validError                 : ValidationErrorService,
        private activatedRouter            : ActivatedRoute,
        private alertService               : AlertService,
        private dateOriginal               : DateFormat,
        private spinner                    : SpinnerVisibilityService,
        private gerenciarReservaService    : GerenciareservaFrotaService) {
        this.reserva = new Reservas();
    }

    ngOnInit() {
        this._subscriptions.push(
            this.activatedRouter.params.subscribe((params: Params) => {
                this.seqreserva = (Number(params['id']) > 0) ? Number(params['id']) : 0;
            })
        );


        this.unidades = this.user.getUnidadePerm();
        this.firstFormGroup = this._formBuilder.group({
            sequnidade       : ['', Validators.required],
            status           : ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            horafinal        : ['', Validators.required, CustomValidators.validaHoraIniFim],
            horainicial      : ['', Validators.required, CustomValidators.validaHoraIniFim],
            datareserva      : ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            veiculo          : ['', Validators.required]
        });
        this.fourthFormGroup = this._formBuilder.group({
            destino          : ['', Validators.nullValidator],
            origem           : ['', Validators.required]
        });
        this.fifthFormGroup = this._formBuilder.group({
            sequsuario       : ['', Validators.required],
            usuario          : ['', Validators.required],
            chapa            : ['', Validators.required]
        });
        this.sixthFormGroup = this._formBuilder.group({
            kmInicialCheckIn       : ['', Validators.nullValidator],
            estaciomentoCheckIn    : ['', Validators.nullValidator],
            observacaoCheckIn      : ['', Validators.nullValidator],
            checkIn                : ['', Validators.nullValidator],
            kmFinalCheckOut        : ['', Validators.nullValidator],
            estaciomentoCheckOut   : ['', Validators.nullValidator],
            observacaoCheckOut     : ['', Validators.nullValidator],
            checkOut               : ['', Validators.nullValidator],
        });
        this.seventhFormGroup = this._formBuilder.group({
            observacao       : ['', Validators.nullValidator]
        });

        this.buscaReserva();

        this._subscriptions.push(this.fifthFormGroup.get("usuario").valueChanges
                    .switchMap((params : Params) =>  this.filtrarUsuario(params))
                    .subscribe((val : any) => {
                            this.fUsuario = new Array<Usuario>();
                            if(isArray(val)) {
                                if(val.length > 0) {
                                    val.map(m => {
                                        let c               = new  Usuario();
                                            c.sequsuario    = m.SEQUSUARIO;
                                            c.nome          = m.NOME;
                                            c.chapa         = m.CHAPA;
                                        this.fUsuario.push(c);
                                    });
                                }
                            }else{
                                this.fifthFormGroup.get("sequsuario").setValue(null);
                                this.fifthFormGroup.get("chapa").setValue(null);
                             }
                        }
                    ));
    }

    radioChangeCheck(event, item : ListaCheckin, tipo : string) {
        if(tipo == "CHECKIN") {
            this.listaCheckin.filter(x => x.SEQITEM == item.SEQITEM).map(c => {
                if(event.value == 'S') {
                   c.CHECKED = true;
                }else{
                   c.CHECKED = false;
                }
            })
        }else if(tipo == "CHECKOUT"){
            this.listaCheckOut.filter(x => x.SEQITEM == item.SEQITEM).map(c => {
                if(event.value == 'S') {
                   c.CHECKED = true;
                }else{
                   c.CHECKED = false;
                }
            })
        }
    }

    filtrarUsuario(desc: Params): Observable<Usuario[]> {
        let obs = new Observable<any>();
        if(desc != null && (!Number(desc) && desc.toString().length > 4)) {
            let r = new RodarJson(); r.obj = [{ param: desc }];
                r.tipo = "BUSCAUSUARIO";
            obs = this.reservaService.getExec(r);
        }

        this.spinner.hide();

        return obs;
    }

    aoSelecionarUsuario(sequsuario, nome, chapa){
        let usuario = "("+sequsuario+") - " + nome;

        this.fifthFormGroup.get("sequsuario").setValue(sequsuario);
        this.fifthFormGroup.get("usuario").setValue(usuario);
        this.fifthFormGroup.get("chapa").setValue(chapa);
    }

    buscaVeiculos() {
        this.veiculos = [];
        if (this.seqreserva == 0) {
            this.thirdFormGroup.get("veiculo").setValue(null);
        }

        if (this.secondFormGroup.get("horainicial").value != "" && this.secondFormGroup.get("horafinal").value != "") {
            let r = new RodarJson();
            r.obj = [{
                sequnidade      : this.firstFormGroup.get("sequnidade").value,
                placa           : null,
                seqveiculo      : null,
                data            : this.dateFormat.get(this.secondFormGroup.get("datareserva").value),
                horainicio      : this.secondFormGroup.get("horainicial").value,
                horafim         : this.secondFormGroup.get("horafinal").value,
                seqreserva      : this.seqreserva
            }];
            r.tipo = "BUSCAFROTADISP";

            this._subscriptions.push(this.reservaService.getExec(r).subscribe((c: Cadastro[]) => {
                if (isArray(c)) {
                    if (c.length > 0) {
                        this.veiculos = new Array<Cadastro>();

                        c.forEach(x => {
                            let v               = new Cadastro();
                            v.SEQVEICULO        = x.SEQVEICULO;
                            v.PLACA             = x.PLACA;
                            v.ANO               = x.ANO;
                            v.MODELO            = x.MODELO;
                            v.EMPALOCACAO       = x.EMPALOCACAO;
                            v.LOCESTACIONAMENTO = x.LOCESTACIONAMENTO;
                            v.NOMEEMPALOC       = x.NOMEEMPALOC;

                            this.veiculos.push(v);
                        });
                    }
                }
            }));
        }
    }

    buscaLocal() {
        let r = new RodarJson(); r.obj = [{ seqreserva: this.seqreserva }]; r.tipo = "BUSCADESTINORESERVAS";
        this._subscriptions.push(this.reservaService.getExec(r).subscribe((x: Local[]) => {
            if (isArray(x)) {
                if (x.length > 0) {
                    this.local      = new Array<Local>();
                    x.forEach((e) => {
                        let l           = new Local();
                        l.NROEMPRESA    = e.NROEMPRESA;
                        l.NOMEREDUZIDO  = e.NOMEREDUZIDO;
                        l.SEDQRESERVA   = e.SEDQRESERVA;
                        l.SEQUNIDADE    = e.SEQUNIDADE;
                        this.local.push(l);
                    });

                    this.dataSource = new MatTableDataSource<Local>(this.local);
                }
            }
        }));
    }

    buscaListaCheckin(tipo : string){

        let listaCK = this.listaCheckInCheckOut;

        this.listaCheckin = [];
            this._subscriptions.push(this.gerenciarReservaService.buscaListaCheckin(this.firstFormGroup.get("sequnidade").value).subscribe((x: ListaCheckin[]) => {

                if (x != null) {
                    if (x.length > 0) {
                        if(tipo == "CHECKIN")  {
                            this.listaCheckin = new Array<ListaCheckin>();
                        }else {
                            this.listaCheckOut = new Array<ListaCheckin>();
                        }


                        x.forEach(l => {
                            let c = this.gerenciarReservaService.buscaItemCheckinCheckoutId(listaCK, l.SEQITEM, tipo);

                            let itemOK = (c != undefined) ?  c.ITEMOK : null;
                            let seqcheckinckout = (c != undefined) ?  c.SEQCHEKINCHEKOUT : 0;

                            let lista = new ListaCheckin();
                                lista.SEQUNIDADE        = l.SEQUNIDADE;
                                lista.STATUS            = l.STATUS;
                                lista.SEQITEM           = l.SEQITEM;
                                lista.DESCRICAO         = l.DESCRICAO;
                                lista.SEQCHEKINCHEKOUT  = seqcheckinckout;
                                lista.CHECKED           = (itemOK == 'S') ? true : false;

                                if(tipo == "CHECKIN")  {
                                    this.listaCheckin.push(lista);
                                }else {
                                    this.listaCheckOut.push(lista);
                                }
                        });

                    }
                }
            }));
    }

    buscaCheckinCheckout(){
        this.listaCheckInCheckOut = new Array<CheckInCheckOut>();

        this._subscriptions.push(this.gerenciarReservaService.buscaCheckinCheckout(this.seqreserva).subscribe((x : CheckInCheckOut[]) => {
            this.listaCheckInCheckOut = x;
            this.buscaListaCheckin("CHECKIN");
            this.buscaListaCheckin("CHECKOUT");
            this.carregarCamposCheckInCheckOut();
        }));
    }

    carregarCamposCheckInCheckOut() {
        let listaCK = this.listaCheckInCheckOut;

        let c =  this.gerenciarReservaService.buscaItemCheckinCheckoutId(listaCK, 1, "CHECKIN");

        if(c != null) {
            this.sixthFormGroup.get("kmInicialCheckIn").setValue(c.KMINICIAL);
            this.sixthFormGroup.get("estaciomentoCheckIn").setValue(c.ESTACIONAMENTO);
            this.sixthFormGroup.get("observacaoCheckIn").setValue(c.OBSERVACAO);


                if(c.SEQITEM > 0) this.verificaCheckIn = true;

        }

        let o = this.gerenciarReservaService.buscaItemCheckinCheckoutId(listaCK, 1, "CHECKOUT");
        if(o != null) {
            this.sixthFormGroup.get("kmFinalCheckOut").setValue(o.KMINICIAL);
            this.sixthFormGroup.get("estaciomentoCheckOut").setValue(o.ESTACIONAMENTO);
            this.sixthFormGroup.get("observacaoCheckOut").setValue(o.OBSERVACAO);

            if(o.SEQITEM > 0) this.verificaCheckOut = true;
        }

    }

    buscaReserva() {
        if (this.seqreserva > 0) {

            this.firstFormGroup.controls['sequnidade'].disable();
            this.isCompleted = true;
            //this.isLinear = false;
            this.reserva = null;

            let r = new RodarJson(); r.obj = [{ status: null, seqreserva: this.seqreserva, tipo: 'T' }]; r.tipo = "BUSCARESERVAS";
            this._subscriptions.push(this.reservaService.getExec(r).subscribe((x: Reservas) => {

                if (x[0] != undefined) {
                    this.reserva = new Reservas();
                    this.reserva.PLACA              = x[0].PLACA;
                    this.reserva.ANO                = x[0].ANO;
                    this.reserva.DATAINCLUSAO       = x[0].DATAINCLUSAO;
                    this.reserva.DATARESERVA        = x[0].DATARESERVA;
                    this.reserva.DESTINOS           = x[0].DESTINOS;
                    this.reserva.HORAINICIO         = x[0].HORAINICIO;
                    this.reserva.HORAFIM            = x[0].HORAFIM;
                    this.reserva.MODELO             = x[0].MODELO;
                    this.reserva.ORIGEM             = x[0].ORIGEM;
                    this.reserva.OBSERVACAO         = x[0].OBSERVACAO;
                    this.reserva.SEQRESERVA         = x[0].SEQRESERVA;
                    this.reserva.SEQUNIDADE         = x[0].SEQUNIDADE;
                    this.reserva.SEQUSUARIO         = x[0].SEQUSUARIO;
                    this.reserva.SEQVEICULO         = x[0].SEQVEICULO;
                    this.reserva.UNIDADE            = x[0].UNIDADE;
                    this.reserva.NOME               = x[0].NOME;
                    this.reserva.CHAPACONDUTOR      = x[0].CHAPACONDUTOR;
                    this.reserva.STATUS             = x[0].STATUS;

                    this.firstFormGroup.get("sequnidade").setValue(Number(this.reserva.SEQUNIDADE));
                    this.firstFormGroup.get("status").setValue(this.reserva.STATUS);
                    this.secondFormGroup.get("datareserva").setValue(this.dateOriginal.parse(this.reserva.DATARESERVA));
                    this.secondFormGroup.get("horainicial").setValue(this.reserva.HORAINICIO);
                    this.secondFormGroup.get("horafinal").setValue(this.reserva.HORAFIM);
                    this.thirdFormGroup.get("veiculo").setValue(Number(this.reserva.SEQVEICULO));
                    this.fourthFormGroup.get("origem").setValue(this.reserva.ORIGEM);
                    this.fourthFormGroup.get("destino").setValue(this.reserva.DESTINOS);
                    this.fifthFormGroup.get("sequsuario").setValue(this.reserva.SEQUSUARIO);
                    this.fifthFormGroup.get("chapa").setValue(this.reserva.CHAPACONDUTOR);
                    this.fifthFormGroup.get("usuario").setValue("(" + this.reserva.SEQUSUARIO + ") - " + this.reserva.NOME);
                    this.seventhFormGroup.get("observacao").setValue(this.reserva.OBSERVACAO);

                    this.buscaVeiculos();
                    this.buscaEmpresas();
                    this.buscaLocal();

                    this.buscaCheckinCheckout();

                    this.thirdFormGroup.get("veiculo").setValue(this.reserva.SEQVEICULO);


                }else{
                    this.voltar();
                }
            }));
        }
    }

    buscaEmpresas() {
        this.fourthFormGroup.get("destino").setValue(null);
        let r = new RodarJson(); r.obj = this.firstFormGroup.get("sequnidade").value; r.tipo = "EMPRESA";
        r.tipo = "EMPRESA";
        this.cadastroService.getExec(r).subscribe((e: EmpresaDW[]) => this.empresas = e);
    }

    submit() {
        if ((this.local.length == 0 && this.seventhFormGroup.get("observacao").value != "") || (this.local.length > 0)) {
            let r = new RodarJson();
            r.obj = [{
                seqreserva          : this.seqreserva,
                seqveiculo          : this.thirdFormGroup.get("veiculo").value,
                origem              : this.fourthFormGroup.get("origem").value,
                datareserv          : this.dateFormat.get(this.secondFormGroup.get("datareserva").value),
                horainicial         : this.dateFormat.get(this.secondFormGroup.get("datareserva").value) + ' ' + this.secondFormGroup.get("horainicial").value,
                horafim             : this.dateFormat.get(this.secondFormGroup.get("datareserva").value) + ' ' + this.secondFormGroup.get("horafinal").value,
                observacao          : this.seventhFormGroup.get("observacao").value,
                sequnidade          : this.firstFormGroup.get("sequnidade").value,
                sequsuario          : this.fifthFormGroup.get("sequsuario").value,
                chapa               : this.fifthFormGroup.get("chapa").value,
                tipo                : 'T',
                status              : this.firstFormGroup.get("status").value
            }];
            r.tipo = "RESERVAFROTA";

            //SALVA RESERVA
            this._subscriptions.push(this.reservaService.getExec(r).subscribe((c: object) => {

                if (Number(c)) {
                    //SALVA DESTINO
                    this._subscriptions.push(this.gerenciarReservaService.salvaReservaDestino(
                         Number(c),
                         this.local).subscribe((result) => {

                            this._subscriptions.push(this.gerenciarReservaService.getRequest(result).subscribe((x : string) => {

                                if(x == "sucesso"){

                                    if(this.verificaCheckIn) {
                                        //SALVA CHECKIN INFORMAÇÕES
                                        this._subscriptions.push(this.gerenciarReservaService.salvaCheckinCheckOut(
                                            this.seqreserva,
                                            this.firstFormGroup.get("sequnidade").value,
                                            "CHECKIN",
                                            this.sixthFormGroup.get("kmInicialCheckIn").value,
                                            null,
                                            this.sixthFormGroup.get("estaciomentoCheckIn").value,
                                            this.sixthFormGroup.get("observacaoCheckIn").value).subscribe((result) => {

                                                    //SALVA ITENS CHECKIN
                                                    this._subscriptions.push(this.gerenciarReservaService.salvarCheckinCheckoutItens(
                                                        this.listaCheckin).subscribe((result) => {
                                                        this._subscriptions.push(this.gerenciarReservaService.getRequest(result).subscribe((r) => {
                                                            if(r == '1' && this.verificaCheckOut == false){
                                                                this.voltar();
                                                            }
                                                        }));
                                                    }));
                                            }));
                                        }

                                        if(this.verificaCheckOut) {

                                            //SALVA CHECKOUT INFORMAÇÕES
                                            this._subscriptions.push(this.gerenciarReservaService.salvaCheckinCheckOut(
                                                this.seqreserva,
                                                this.firstFormGroup.get("sequnidade").value,
                                                "CHECKOUT",
                                                null,
                                                this.sixthFormGroup.get("kmFinalCheckOut").value,
                                                this.sixthFormGroup.get("estaciomentoCheckOut").value,
                                                this.sixthFormGroup.get("observacaoCheckOut").value).subscribe((result) => {

                                                     //SALVA ITENS CHECKOUT
                                                    this._subscriptions.push(this.gerenciarReservaService.salvarCheckinCheckoutItens(
                                                        this.listaCheckOut).subscribe((result) => {
                                                        this._subscriptions.push(this.gerenciarReservaService.getRequest(result).subscribe((r) => {
                                                            if(r == '1'){
                                                                this.voltar();
                                                            }
                                                        }));
                                                    }));

                                            }));
                                        }

                                        if(!this.verificaCheckIn && !this.verificaCheckOut){
                                            this.voltar();
                                        }
                                    }
                            }));

                        }));

                    if (this.seqreserva > 0) {
                        this.alertService.alert("Reserva alterada com sucesso.");
                    } else {
                        this.alertService.alert("Reserva cadastrada com sucesso.");
                    }

                } else {
                    this.alertService.alert(c.toString());
                }
            }));
        } else {
            this.alertService.alert("O campo observação é obrigatório caso não selecione um destino!");
        }

    }

    AoSelecionarVeiculo(seqveiculo) {
        this.rodizio = [];
        if ((seqveiculo != this.reserva.SEQVEICULO) && (seqveiculo != null)) {

            let r = new RodarJson(); r.obj = [{ seqveiculo: seqveiculo, data: this.dateFormat.get(this.secondFormGroup.get("datareserva").value) }]; r.tipo = "RODIZIO";
            this._subscriptions.push(this.cadastroService.getExec(r).subscribe((e: Rodizio[]) => {
                this.rodizio = new Array<Rodizio>();
                e.forEach(x => {
                    let r           = new Rodizio();
                    r.UF            = x.UF;
                    r.CIDADE        = x.CIDADE;
                    r.NOMEDIA       = x.NOMEDIA;
                    r.STATUS        = x.STATUS;
                    r.DIADASEMANA   = x.DIADASEMANA;
                    r.SEQVEICULO    = x.SEQVEICULO;
                    r.ICON          = x.STATUS;
                    this.rodizio.push(r);
                });

                if (this.rodizio.length > 0) {

                    let dialogRef = this.reservaService.dialogRodizio("Confirmação!", "Existe rodizio para esse veiculo, gostaria de continuar mesmo assim?", this.rodizio, "450px");
                    this._subscriptions.push(dialogRef.afterClosed().subscribe(result => {
                        if (!result) {
                            this.thirdFormGroup.get("veiculo").setValue(null);
                        }
                    }));
                }

            }));

            if(this.veiculos.length > 0) {
                this.veiculos.filter(x => x.SEQVEICULO == seqveiculo).map(v => {
                    this.fourthFormGroup.get("origem").setValue(v.NOMEEMPALOC + " / " +v.LOCESTACIONAMENTO);
                });
            }
        }
    }
    /*getVeiculoEsc(id) {

        this.veiculos.filter(x => x.SEQVEICULO == id).map((v:Cadastro) => {
              //let l : string = (v.LOCESTACIONAMENTO != null && v.LOCESTACIONAMENTO != '') ? '(' +v.EMPALOCACAO + ') ' + v.LOCESTACIONAMENTO :  v.EMPALOCACAO.toString();

              this.fourthFormGroup.get("origem").setValue(l);
        });
    }*/

    addLocal() {
        let destino = this.fourthFormGroup.get("destino").value;
        if (destino != null && this.local.filter(x => x.NROEMPRESA == destino).length == 0) {
            let local           = new Local();
            local.SEQUNIDADE    = this.firstFormGroup.get("sequnidade").value;
            local.NROEMPRESA    = destino;
            local.NOMEREDUZIDO  = this.empresas.filter(x => x.NROEMPRESA == destino).map(e => e.NOMEREDUZIDO)[0];
            local.SEDQRESERVA   = this.seqreserva;

            this.local.push(local);

            this.dataSource = new MatTableDataSource<Local>(this.local);

            this.fourthFormGroup.get("destino").setValue(null);
        }

    }

    removerLocalGrid(nroempresa: number, nomereduzido : string, sequnidade: number) {
        if(this.seqreserva > 0) {
            this._subscriptions.push(this.reservaService.deleteReservaDestino(this.seqreserva, nroempresa, nomereduzido, sequnidade).subscribe((x) => {
                if(x == "sucesso") this.dataSource = new MatTableDataSource<Local>(this.reservaService.removerLocalGrid(this.local, nroempresa));
            }));
        }else{
            this.dataSource = new MatTableDataSource<Local>(this.reservaService.removerLocalGrid(this.local, nroempresa));
        }
    }

    goBack(stepper: MatStepper) {
        stepper.previous();
    }

    goForward(stepper: MatStepper) {

        switch(stepper.selectedIndex){
            case 0:
                if(this.seqreserva > 0) {
                    this.firstFormGroup.controls["sequnidade"].enable();
                    this.validError.showError(this.firstFormGroup);
                    if(this.firstFormGroup.valid) stepper.next();
                    this.firstFormGroup.controls['sequnidade'].disable();
                }else{
                    this.validError.showError(this.firstFormGroup);
                    if(this.firstFormGroup.valid) stepper.next();
                }
            break;
            case 1:
                this.validError.showError(this.secondFormGroup);
                if(this.secondFormGroup.valid) stepper.next();
            break;
            case 2:
                this.validError.showError(this.thirdFormGroup);
                if(this.thirdFormGroup.valid) stepper.next();
            break;
            case 3:
                this.validError.showError(this.fourthFormGroup);
                if(this.fourthFormGroup.valid) stepper.next();
            break;
            case 4:
                this.validError.showError(this.fifthFormGroup);
                if(this.fifthFormGroup.valid) stepper.next();
            break;
            case 5:
                this.validError.showError(this.sixthFormGroup);
                if(this.sixthFormGroup.valid) stepper.next();
            case 6:
                this.validError.showError(this.seventhFormGroup);
                if(this.seventhFormGroup.valid) stepper.next();
            break;
        }
    }

    voltar() {
        this.router.navigate(['/admin/frota/gerenciar reserva/lista/' + this.firstFormGroup.get("status").value]);
    }

    _click(btn: string) {
        switch (btn) {
            case "ADD":
                this.router.navigate(['/admin/frota/gerenciar reserva/novo']);
                break;
        }
    }
    ngOnDestroy() {

    }
}
