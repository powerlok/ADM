export class Lista {
    verificaCadastro: string;
    verificaContas: string;
    gerandoTitulos: string;
    integracaoTitulos: string;
    gerandoComplemento: string;

}

export class Retorno {
    value: string;
    inconsistencia: Inconsistencia[];
}

export class Inconsistencia {
    nrotitulo : number;
    codpessoa : number;
    fantasia  : number;
    motivo    : string;
}

export interface ITipo {
    0 : "p_rm_gerafolha",
    1 : "p_rm_gerafolha_13",
    2 : "p_rm_gerafolha_adto",
    3 : "p_rm_gerafolha_compl",
    4 : "p_rm_gerafolha_diferenca",
    5 : "p_rm_gerafolha_ferias",
    6 : "p_rm_gerafolha_rescisao",
    7 : "p_rm_gerafolha_pensao",
    8 : "p_CadPessoaPensao"
}
