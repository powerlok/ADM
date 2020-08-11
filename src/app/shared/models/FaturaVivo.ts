export class FaturaVivo {
    demonstrativo1          : Demonstrativo1[];
    demonstrativo2          : Demonstrativo2[];
    demonstrativoServico    : DemonstrativoServicos[];
    servicos                : Servicos[];
    celularesFatura         : CelularesFatura[];
    detalhesNF              : DetalhesNF[];
    impostos                : Impostos[];
    resumo                  : Resumo[];
    fatura                  : Fatura[];
    demonstrativo3          : Demonstrativo3[];
}

export class Delete {
    conta : string;
}

export class Demonstrativo1 {
    conta          : string;
    centrocusto    : string;
    private celular        : string;
    secaochamada   : string;
    mesanoref      : string;
    descchamada    : string;
    datachamada    : string;
    horachamada    : string;
    tipochamada    : string;
    cidadeorigem   : string;
    uforigem       : string;
    cidadedestino  : string;
    ufdestino      : string;
    nchamada       : string;
    tarifa         : string;
    duracao        : string;
    quantidade     : number;
    contratados    : number;
    utilizados     : number;
    excedentes     : number;
    unidade        : string;
    atransporte    : string;
    private valor : number;

    constructor(){}

    public get _celular() : string {
        return this.celular;
    }
    
    public set _celular (v : string){
        this.celular = (v != undefined) ?  v.trim() : v;
    }

    public get _valor() : number {
        return this.valor;
    }
    
    public set _valor (v : number){
        this.valor = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }
    
}

export class Demonstrativo2 {
    conta          : string;
    centrocusto    : string;
    private celular        : string;
    secaochamada   : string;
    mesanoref      : string;
    descchamada    : string;
    datachamada    : string;
    horachamada    : string;
    tipochamada    : string;
    cidadeorigem   : string;
    uforigem       : string;
    cidadedestino  : string;
    ufdestino      : string;
    nchamada       : string;
    tarifa         : string;
    duracao        : string;
    quantidade     : number;
    contratados    : number;
    utilizados     : number;
    excedentes     : number;
    unidade        : string;
    atransporte    : string;
    private valor  : number;

    
    constructor(){}
    
    public get _celular() : string {
        return this.celular;
    }
    
    public set _celular (v : string){
        this.celular = (v != undefined) ?  v.trim() : v;
    }
    public get _valor() : number {
        return this.valor;
    }
    
    public set _valor (v : number){
        this.valor = (v != undefined) ?  Number(v.toString().replace('R$', '').replace('(', '').replace(')', '').trim()) : v;
    }
    
}

export class DemonstrativoServicos {
    conta          : string;
    centrocusto    : string;
    private celular        : string;
    tiposervico    : string;
    desccservico   : string;
    mesanoref      : string;
    subsecaoservico: string;
    dataredebito   : string;
    datachamada    : string;
    datainicial    : string;
    datafinal      : string;
    tipochamada    : string;
    cidadeorigem   : string;
    uforigem       : string;
    cidadedestino  : string;
    ufdestino      : string;
    numerochamado  : string;
    tipotarifa     : string;
    duracao        : string;
    private valorreais      : number;

    
    constructor(){}

    public get _celular() : string {
        return this.celular;
    }
    
    public set _celular (v : string){
        this.celular = (v != undefined) ?  v.trim() : v;
    }

    public get _valorreais() : number {
        return this.valorreais;
    }
    
    public set _valorreais (v : number){
        this.valorreais = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }
    
}

export class Servicos {
    conta               : string;
    centrocusto         : string;
    tiposervico         : string;
    descservico         : string;
    celular             : string;
    mesanoref           : string;
    nomecompartilhamento: string;
    contratados         : string;
    utilizados          : string;
    parcela             : number;
    private valor      : number;


    constructor(){}

    public get _valor() : number {
        return this.valor;
    }
    
    public set _valor (v : number){
        this.valor =(v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }
    
        
}

export class CelularesFatura {
    conta           : string;
    centrocusto     : string;
    private numerocelular   : string;
    private valorcelular    : number;
    departamento    : string;
    
    constructor(){}
        
    public get _numerocelular() : string {
        return this.numerocelular;
    }
    
    public set _numerocelular (v : string){
        this.numerocelular = (v != undefined) ?  v.trim() : v;
    }

    public get _valorcelular() : number {
        return this.valorcelular;
    }
    
    public set _valorcelular (v : number){
        this.valorcelular = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }

}

export class DetalhesNF {
    conta           : string;
    centrocusto     : string;
    operadora       : string;
    notafiscal      : string;
    sequencia       : number;
    codservico      : number;
    secao           : string;
    descricao       : string;
    referencia      : string;
    private quantidade : string;    
    private valor      : number;
    icms                : string;
    private totalnf    : number;

    constructor(){}

    public get _quantidade() : string {
        return this.quantidade;
    }
    
    public set _quantidade (v : string){
        this.quantidade = (v != undefined) ? v.trim() : v;
    }

    public get _valor() : number {
        return this.valor;
    }
    
    public set _valor (v : number){
        this.valor = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }

    public get _totalnf() : number {
        return this.totalnf;
    }
    
    public set _totalnf(v : number){
        this.totalnf = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }
}

export class Impostos {
    conta              : string;
    centrocusto        : string;
    operadora          : string;
    endereco1          : string;
    endereco2          : string;
    cep                : string;
    cnpj               : string;
    notafiscal         : string;
    descimposto        : string;
    aliquota           : string;
    private basecalculoimposto : number;
    private valorimposto       : number;
    private valornf            : number;
    private naotributavel      : number; 

    constructor(){}

    public get _basecalculoimposto() : number {
        return this.basecalculoimposto;
    }
    
    public set _basecalculoimposto(v : number){
        this.basecalculoimposto = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }
   
    public get _valorimposto() : number {
        return this.valorimposto;
    }
    
    public set _valorimposto(v : number){
        this.valorimposto = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }

    public get _valornf() : number {
        return this.valornf;
    }
    
    public set _valornf(v : number){
        this.valornf = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }

    public get _naotributavel() : number {
        return this.naotributavel;
    }
    
    public set _naotributavel(v : number){
        this.naotributavel = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }
}  

export class Resumo {
    conta        : string;
    centrocusto  : string;
    descservico  : string;
    private valorservico : number;

    constructor(){}

    public get _valorservico() : number {
        return this.valorservico;
    }
    
    public set _valorservico(v : number){
        this.valorservico = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }
}

export class Fatura {
   conta        : string;
   centrocusto  : string;
   descricao    : string;
   private valordespesa : number;

   constructor(){}

    public get _valordespesa() : number {
        return this.valordespesa;
    }
    
    public set _valordespesa(v : number){
        this.valordespesa = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }

}

export class Demonstrativo3 {
    conta          : string;
    centrocusto    : string;
    celular        : string;
    secaochamada   : string;
    mesanoref      : string;
    descchamada    : string;
    datachamada    : string;
    horachamada    : string;
    tipochamada    : string;
    cidadeorigem   : string;
    uforigem       : string;
    cidadedestino  : string;
    ufdestino      : string;
    nchamada       : string;
    tarifa         : string;
    duracao        : string;
    quantidade     : number;
    contratados    : number;
    utilizados     : number;
    excedentes     : number;
    unidade        : string;
    atransporte    : string;
    private valor          : number;

    constructor(){}
    
    public get _valor() : number {
        return this.valor;
    }
    
    public set _valor (v : number){
        this.valor = (v != undefined) ?  Number(v.toString().replace('R$', '').replace(",", "").replace('(', '').replace(')', '').trim()) : v;
    }
}