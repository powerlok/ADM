export class Empresa {
    public seqempresa: number;
    public nomerazao: string;
    public fantasia: string;
    public sequnidade: number;
    public seqpessoa: number;
    public situacao: number;
    public refexterno: number;
    public datainauguracao: number;
    public seqregiao: number;
    public seqtipoempresa: number;
    public tipoempresa: string;
    public rfexternomatriz: number;
    public sigla: string;
    public ordernacao: number;
    public reftotvsfilial: number;
    public reftotvscoligada: number;
    public seqempresamc: number;
    public nroEmpresa: number;
    public nomeReduzido: string;
    public status: string;
    public tipo: string;
    public checked: boolean = false;
}

export class EmpresaDW {
    UNIDADE      : string;
    NROEMPRESA   : number;
    NOMEREDUZIDO : string;
    SEQPESSOA    : number;
    RAZAOSOCIAL  : string;
    ENDERECO     : string;
    BAIRRO       : string;
    CIDADE       : string;
    CNPJ         : string;
    INSCRESTADUAL: string;
    LATITUDE     : string;
    LONGITUDE    : string;
    TIPO         : string;
    ABERTA       : string;
    REGIAO       : string;
    checked      : boolean = false;
}