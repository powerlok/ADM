export class Rodizio {
    private _UF: string;
    private _CIDADE: string;
    private _DIADASEMANA: string;
    private _STATUS: string;
    private _NOMEDIA: string;
    private _SEQVEICULO: number;
    private _ICON: string;
    public get ICON(): string {
        return this._ICON;
    }
    public set ICON(value: string) {
        this._ICON = (value == "A") ? "toggle_on" :"toggle_off";;
    }

    public get SEQVEICULO(): number {
        return this._SEQVEICULO;
    }

    public set SEQVEICULO(value: number) {
        this._SEQVEICULO = value;
    }

    public get NOMEDIA(): string {
        return this._NOMEDIA;
    }

    public set NOMEDIA(value: string) {
        this._NOMEDIA = value;
    }

    public get STATUS(): string {
        return this._STATUS;
    }

    public set STATUS(value: string) {
        this._STATUS = (value == "A") ? "Ativo" : "Inativo";
    }

    public get DIADASEMANA(): string {
        return this._DIADASEMANA;
    }

    public set DIADASEMANA(value: string) {
        this._DIADASEMANA = value;
    }

    public get CIDADE(): string {
        return this._CIDADE;
    }

    public set CIDADE(value: string) {
        this._CIDADE = value;
    }

    public get UF(): string {
        return this._UF;
    }

    public set UF(value: string) {
        this._UF = value;
    }

    constructor(){

    }
}

export class Cadastro {

    private _LOCESTACIONAMENTO: string;
    public get LOCESTACIONAMENTO(): string {
        return this._LOCESTACIONAMENTO;
    }
    public set LOCESTACIONAMENTO(value: string) {
        this._LOCESTACIONAMENTO = value;
    }
    
    private _SEQVEICULO: number;

    public get SEQVEICULO(): number {
        return this._SEQVEICULO;
    }

    public set SEQVEICULO(value: number) {
        this._SEQVEICULO = value;
    }

    private _PLACA: string;

    public get PLACA(): string {
        return this._PLACA;
    }

    public set PLACA(value: string) {
        this._PLACA = value;
    }

    private _MODELO: string;

    public get MODELO(): string {
        return this._MODELO;
    }

    public set MODELO(value: string) {
        this._MODELO = value;
    }
    
    private _ANO: string;

    public get ANO(): string {
        return this._ANO;
    }

    public set ANO(value: string) {
        this._ANO = value;
    }

    private _EMPALOCACAO: number;

    public get EMPALOCACAO(): number {
        return this._EMPALOCACAO;
    }

    public set EMPALOCACAO(value: number) {
        this._EMPALOCACAO = value;
    }

    private _NOMEEMPALOC: string;

    public get NOMEEMPALOC(): string {
        return this._NOMEEMPALOC;
    }

    public set NOMEEMPALOC(value: string) {
        this._NOMEEMPALOC = value;
    }

    private _SEQUNIDADE: number;

    public get SEQUNIDADE(): number {
        return this._SEQUNIDADE;
    }

    public set SEQUNIDADE(value: number) {
        this._SEQUNIDADE = value;
    }

    private _UNIDADE: string;

    public get UNIDADE(): string {
        return this._UNIDADE;
    }

    public set UNIDADE(value: string) {
        this._UNIDADE = value;
    }

    private _STATUS: string;

    public get STATUS(): string {
        return this._STATUS;
    }

    public set STATUS(value: string) {
        this._STATUS = (value == "D") ? "Disponível" : "Indisponível";
    }

    private _TIPOHABILITACAO: string;

    public get TIPOHABILITACAO(): string {
        return this._TIPOHABILITACAO;
    }
    
    public set TIPOHABILITACAO(value: string) {
        this._TIPOHABILITACAO = value;
    }
}

export class DiaSemana {
    NRODIA :number;
    DIA    :string;
}

export class ListaCheckin {
    private _SEQCHEKINCHEKOUT: number;
    public get SEQCHEKINCHEKOUT(): number {
        return this._SEQCHEKINCHEKOUT;
    }
    public set SEQCHEKINCHEKOUT(value: number) {
        this._SEQCHEKINCHEKOUT = value;
    }

    private _CHECKED: Boolean;
    public get CHECKED(): Boolean {
        return this._CHECKED;
    }
    public set CHECKED(value: Boolean) {
        this._CHECKED = value;
    }

    private _ICON: string;
    public get ICON(): string {
        return this._ICON;
    }
    public set ICON(value: string) {
        this._ICON = (value == "A") ? "toggle_on" :"toggle_off";;
    }

    private _SEQUNIDADE: number;
    public get SEQUNIDADE(): number {
        return this._SEQUNIDADE;
    }
    public set SEQUNIDADE(value: number) {
        this._SEQUNIDADE = value;
    }
    private _SEQITEM: number;
    public get SEQITEM(): number {
        return this._SEQITEM;
    }
    public set SEQITEM(value: number) {
        this._SEQITEM = value;
    }
    private _DESCRICAO: string;
    public get DESCRICAO(): string {
        return this._DESCRICAO;
    }
    public set DESCRICAO(value: string) {
        this._DESCRICAO = value;
    }
    private _STATUS: string; 
    public get STATUS(): string {
        return this._STATUS;
    }
    public set STATUS(value: string) {
        this._STATUS = (value == "A") ? "Ativo" : "Inativo";
    }
}

export class Reservas {
    private _NOME: string;
    public get NOME(): string {
        return this._NOME;
    }
    public set NOME(value: string) {
        this._NOME = value;
    }

    private _SEQUSUARIOALTERACAO: string;
    public get SEQUSUARIOALTERACAO(): string {
        return this._SEQUSUARIOALTERACAO;
    }
    public set SEQUSUARIOALTERACAO(value: string) {
        this._SEQUSUARIOALTERACAO = value;
    }

    private _STATUS: string;
    public get STATUS(): string {
        return this._STATUS;
    }
    public set STATUS(value: string) {
        this._STATUS = value;
    }
     
    private _DATAALTERACAO: string;
    public get DATAALTERACAO(): string {
        return this._DATAALTERACAO;
    }
    public set DATAALTERACAO(value: string) {
        this._DATAALTERACAO = value;
    }

    private _CHAPACONDUTOR: string;
    public get CHAPACONDUTOR(): string {
        return this._CHAPACONDUTOR;
    }
    public set CHAPACONDUTOR(value: string) {
        this._CHAPACONDUTOR = value;
    }

    private _SEQUSUARIO: number;
    public get SEQUSUARIO(): number {
        return this._SEQUSUARIO;
    }
    public set SEQUSUARIO(value: number) {
        this._SEQUSUARIO = value;
    }
    
    private _SEQUNIDADE: number;
    public get SEQUNIDADE(): number {
        return this._SEQUNIDADE;
    }
    public set SEQUNIDADE(value: number) {
        this._SEQUNIDADE = value;
    }

    private _UNIDADE: string;
    public get UNIDADE(): string {
        return this._UNIDADE;
    }
    public set UNIDADE(value: string) {
        this._UNIDADE = value;
    }

    private _SEQRESERVA: number;
    public get SEQRESERVA(): number {
        return this._SEQRESERVA;
    }
    public set SEQRESERVA(value: number) {
        this._SEQRESERVA = value;
    }

    private _SEQVEICULO: number;
    public get SEQVEICULO(): number {
        return this._SEQVEICULO;
    }
    public set SEQVEICULO(value: number) {
        this._SEQVEICULO = value;
    }

    private _MODELO: string;
    public get MODELO(): string {
        return this._MODELO;
    }
    public set MODELO(value: string) {
        this._MODELO = value;
    }

    private _PLACA: string;
    public get PLACA(): string {
        return this._PLACA;
    }
    public set PLACA(value: string) {
        this._PLACA = value;
    }

    private _ANO: string;
    public get ANO(): string {
        return this._ANO;
    }
    public set ANO(value: string) {
        this._ANO = value;
    }

    private _ORIGEM: string;
    public get ORIGEM(): string {
        return this._ORIGEM;
    }
    public set ORIGEM(value: string) {
        this._ORIGEM = value;
    }

    private _DATAINCLUSAO: string;
    public get DATAINCLUSAO(): string {
        return this._DATAINCLUSAO;
    }
    public set DATAINCLUSAO(value: string) {
        this._DATAINCLUSAO = value;
    }

    private _DATARESERVA: string;
    public get DATARESERVA(): string {
        return this._DATARESERVA;
    }
    public set DATARESERVA(value: string) {
        if(value != null){
           this._DATARESERVA = value.split(' ')[0];
        }else{
           this._DATARESERVA = value;
        }
    }

    private _HORAINICIO: string;
    public get HORAINICIO(): string {
        return this._HORAINICIO;
    }

    public set HORAINICIO(value: string) {
        if(value != null){
           this._HORAINICIO = value.split(' ')[1];
        }else{
           this._HORAINICIO = value;
        }
    }

    private _HORAFIM: string;
    public get HORAFIM(): string {
        return this._HORAFIM;
    }

    public set HORAFIM(value: string) {
        if(value != null){
            this._HORAFIM = value.split(' ')[1];
        }else{
            this._HORAFIM = value;
        }
    }

    private _OBSERVACAO: string;
    public get OBSERVACAO(): string {
        return this._OBSERVACAO;
    }

    public set OBSERVACAO(value: string) {
        this._OBSERVACAO = value;
    }

    private _DESTINOS: string;
    public get DESTINOS(): string {
        return this._DESTINOS;
    }

    public set DESTINOS(value: string) {
        this._DESTINOS = value;
    }
}

export class Local {
    SEDQRESERVA  : number;
    NROEMPRESA   : number;
    NOMEREDUZIDO : string;     
    SEQUNIDADE   : number;
}

export class CheckInCheckOut {
    SEQUNIDADE         : number;
    SEQRESERVA         : number;
    SEQCHEKINCHEKOUT   : number;
    DATAHORA           : string;
    TIPO               : string;
    KMINICIAL          : string;
    KMFINAL            : string;
    ESTACIONAMENTO     : string;
    OBSERVACAO         : string;
    SEQITEM            : number;
    ITEMOK             : string;
    OBSERVACAOITEM     : string;
    DESCRICAO          : string;
    
 }