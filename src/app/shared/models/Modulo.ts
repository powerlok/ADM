export class Modulo {
    public seqModulo: number;
    public modulo: string
    public situacao: string;
    public mostraradm : string;
    public appsPermitidas: Aplicacao[];    
    public Modulo()
    {
        this.appsPermitidas = new Array<Aplicacao>();
    }
}

export class Aplicacao {
    public seqmodulo : number;
    public seqaplicacao : number;
    public aplicacao : string;
    public seqaplicacaopai : number;
    public controlapermissao : string;
    public nivel : number; 
    public appFilhos : Aplicacao[];
    public metodosPermitidos : Metodo[];
    public mostrar : string;
    public icon  : string;
    public Aplicacao()
    {
        this.appFilhos = new Array<Aplicacao>();
    }
}

export class Metodo {
    public seqpermissao: number;
    public tipopermissao: string
    public seqcontrole: number;
    public seqcontrole2: number;
    public seqaplicacao: number;
    public seqmodulo: number;
}

export class Setor {
    public seqsetor: number;
    public tipopermissao: string;
    public setor: string;
    public sequnidade: number;
    public status: string;
    public indusatarefa: string;
    public indreplicado: string;
    public seqcontrole: number;
    public seqcontrole2: number;
}