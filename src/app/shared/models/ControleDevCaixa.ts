export class ControleDevCaixa {
    constructor(){
        this.fornec    = new ControleDevCaixaFornec();
        this.produto   = new ControleDvCaixaProduto();
        this.totais    = new Array<ControleDvCaixaTotais>();
    }

    private _observacao: string;
    public get observacao(): string {
        return this._observacao;
    }
    public set observacao(value: string) {
        this._observacao = value;
    }
    
    private _acao: string;
    
    public get acao(): string {
        return this._acao;
    }
    public set acao(value: string) {
        this._acao = value;
    }

    private _cadcaixa: number;
    public get cadcaixa(): number {
        return this._cadcaixa;
    }
    public set cadcaixa(value: number) {
        this._cadcaixa = value;
    }

    private _tipo: string;
    public get tipo(): string {
        return this._tipo;
    }
    public set tipo(value: string) {
        this._tipo = value;
    }
    private _obj: string;

    public get obj(): string {
        return this._obj;
    }
    public set obj(value: string) {
        this._obj = value;
    }
    private _dtaLancto: string;
    public get dtaLancto(): string {
        return this._dtaLancto;
    }
    public set dtaLancto(value: string) {
        this._dtaLancto = value;
    }
    private _nroControle: number;
    public get nroControle(): number {
        return this._nroControle;
    }
    public set nroControle(value: number) {
        this._nroControle = value;
    }
    private _status: string;
    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }
    private _fornec: ControleDevCaixaFornec;
    public get fornec(): ControleDevCaixaFornec {
        return this._fornec;
    }
    public set fornec(value: ControleDevCaixaFornec) {
        this._fornec = value;
    }
    private _produto: ControleDvCaixaProduto;
    public get produto(): ControleDvCaixaProduto {
        return this._produto;
    }
    public set produto(value: ControleDvCaixaProduto) {
        this._produto = value;
    }
    private _totais: ControleDvCaixaTotais[];
    public get totais(): ControleDvCaixaTotais[] {
        return this._totais;
    }
    public set totais(value: ControleDvCaixaTotais[]) {
        this._totais = value;
    }
}

export class ControleDevCaixaFornec {
   
    private _fornecedor: string;
    public get fornecedor(): string {
        return this._fornecedor;
    }
    public set fornecedor(value: string) {
        this._fornecedor = value;
    }
    private _codigo: number;
    public get codigo(): number {
        return this._codigo;
    }
    public set codigo(value: number) {
        this._codigo = value;
    }
    private _cpfcnpj: number;
    public get cpfcnpj(): number {
        return this._cpfcnpj;
    }
    public set cpfcnpj(value: number) {
        this._cpfcnpj = value;
    }
    private _endereco: string;
    public get endereco(): string {
        return this._endereco;
    }
    public set endereco(value: string) {
        this._endereco = value;
    }
    private _telefone: string;    
    public get telefone(): string {
        return this._telefone;
    }
    public set telefone(value: string) {
        this._telefone = value;
    }
}

export class ControleDvCaixaProduto {
    private _codigo: number;
    public get codigo(): number {
        return this._codigo;
    }
    public set codigo(value: number) {
        this._codigo = value;
    }
    private _modelo: string;
    public get modelo(): string {
        return this._modelo;
    }
    public set modelo(value: string) {
        this._modelo = value;
    }
    private _valor: number;
    public get valor(): number {
        return this._valor;
    }
    public set valor(value: number) {
        this._valor = value;
    }
    private _quantidade: number;
    public get quantidade(): number {
        return this._quantidade;
    }
    public set quantidade(value: number) {
        this._quantidade = value;
    }
}

export class ControleDvCaixaTotais {
    private _codigo_1: number;
    public get codigo(): number {
        return this._codigo_1;
    }
    public set codigo(value: number) {
        this._codigo_1 = value;
    }
    private _modelo: string;
    public get modelo(): string {
        return this._modelo;
    }
    public set modelo(value: string) {
        this._modelo = value;
    }
    private _quantidade: number;
    public get quantidade(): number {
        return this._quantidade;
    }
    public set quantidade(value: number) {
        this._quantidade = value;
    }
    private _valor: number;
    public get valor(): number {
        return this._valor;
    }
    public set valor(value: number) {
        this._valor = value;
    }
    private _total: number; 
    public get total(): number {
        return this._total;
    }
    public set total(value: number) {
        this._total = value;
    }
}

export class RelatorioCaixa {
    codigo     : number;
    fornecedor : string;
    modelo     : string;
    data       : string;
    saida      : number;
    retorno    : number;
    saldo      : number;
    valor      : number;
}

export class ControlePorFornec {
    seqcontrole   : number;
    seqfornecedor : number;
    data          : string;
    nome          : string;
}