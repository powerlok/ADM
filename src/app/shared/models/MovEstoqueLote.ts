export class MovEstoqueLote {
    id         : string;    
    seqs       : Seq;
    texts      : Text;
    qtdemov    : number;
    justificativa : string;
}

export class Seq {
    sequnidade    : number;
    nroempresa    : number;
    seqlocal      : number;
    seqcgo        : number;
    seqmotivo     : number;
    seqproduto    : number;
    seqlote       : number;
    seqembalagem  : number;
    seqgermov     : string;
}

export class Text {
   
    unidade    : string;
    fantasia   : string;
    local      : string;
    cgo        : string;
    motivo     : string;
    produto    : string;
    lote       : string;
    embalagem  : string;
    germov     : string;
}