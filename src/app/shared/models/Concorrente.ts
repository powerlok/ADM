export class Concorrente {

  private _SEQUNIDADE       : number;
  private _UNIDADE          : string;
  private _NROEMPRESA       : string;
  private _NOMEREDUZIDO     : string
  private _SEQCONCORRENTE   : number;
  private _FANTASIA         : string;


  public get SEQUNIDADE(): number {
    return this._SEQUNIDADE;
  }

  public set SEQUNIDADE(value: number) {
    this._SEQUNIDADE = value;
  }

  public get UNIDADE(): string {
    return this._UNIDADE;
  }

  public set UNIDADE(value: string) {
    this._UNIDADE = value;
  }

  public get NROEMPRESA(): string {
    return this._NROEMPRESA;
  }

  public set NROEMPRESA(value: string) {
    this._NROEMPRESA = value;
  }

  public get NOMEREDUZIDO(): string {
    return this._NOMEREDUZIDO;
  }

  public set NOMEREDUZIDO(value: string) {
    this._NOMEREDUZIDO = value;
  }

  public get SEQCONCORRENTE(): number {
    return this._SEQCONCORRENTE;
  }

  public set SEQCONCORRENTE(value: number) {
    this._SEQCONCORRENTE = value;
  }

  public get FANTASIA() {
    return this._FANTASIA;
  }

  public set FANTASIA(value: string) {
    this._FANTASIA = value;
  }
}
