export class CadCaixa {

    private _SEQ_CADCAIXA: number;

    public get SEQ_CADCAIXA(): number {
        return this._SEQ_CADCAIXA;
    }

    public set SEQ_CADCAIXA(value: number) {
        this._SEQ_CADCAIXA = value;
    }

    private _MODELO: string;

    public get MODELO(): string {
        return this._MODELO;
    }

    public set MODELO(value: string) {
        this._MODELO = value;
    }

    private _DESCRICAO: string;

    public get DESCRICAO(): string {
        return this._DESCRICAO;
    }

    public set DESCRICAO(value: string) {
        this._DESCRICAO = value;
    }

    private _VALOR: number;

    public get VALOR(): number {
        return this._VALOR;
    }

    public set VALOR(value: number) {
        this._VALOR = value;
    }
}

export class CadCaixaViewModel {

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

    private _descricao: string;

    public get descricao(): string {
        return this._descricao;
    }
    
    public set descricao(value: string) {
        this._descricao = value;
    }

    private _valor: number;

    public get valor(): number {
        return this._valor;
    }

    public set valor(value: number) {
        this._valor = value;
    }

    private _acao: string;

    public get acao(): string {
        return this._acao;
    }

    public set acao(value: string) {
        this._acao = value;
    }

    private _obj: string;

    public get obj(): string {
        return this._obj;
    }

    public set obj(value: string) {
        this._obj = value;
    }

    private _cadastros: CadCaixa[];
    
    public get cadastros(): CadCaixa[] {
        return this._cadastros;
    }

    public set cadastros(value: CadCaixa[]) {
        this._cadastros = value;
    }

}