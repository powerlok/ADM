export class ProdMonitorado
{
    SEQALTERACAO    : number;
    SEQPRODUTO      : number;
    DESCCOMPLETA    : string;
    STATUS          : string;
    QTDEEMBALAGEM   : number;
    DTAALTERACAO    : string;
    PRECONOVO       : number;
    SEQFAMILIA      : number;
    CATEGORIA_1     : string;
    CATEGORIA_3     : string;
    NOMEREDUZIDO    : string;
    CUSTO           : number;
    DATAHORAAGEND  : string;    
    CHECKED         : boolean = false;
    COMPRADOR       : string;
    ESTOQUECD       : string;
    NROEMPRESA      : number;
}

export class Embalagem 
{
   QTDEEMBALAGEM : number;
   SELECTED: boolean;
}

export class Custo 
{
   CUSTO : number;
}

export class Motivo {
    SEQMOTIVO : number;
    MOTIVO    : string;
}

export class Lote {
    SEQLOTE      : number;
    SALDO        : number;
    DESCCOMPLETA : string;
    SEQPESSOA    : number;
    FANTASIA     : string;
    DTAENTRADA   : string;
    EMBLOTE      : string;
    COMPRADOR    : string;
    SEQPRODUTO   : number;
    EMBALAGEM    : number;
}