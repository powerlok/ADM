import { Modulo, Setor } from "./Modulo";
import { Empresa } from "./Empresa";

export class Login {
    public usuario: Usuario;
    public registraLogin: string;
    public IdDispositivo: string;
    public identificador: String = "ObaApi.Service.LoginService";
    public LoginService() {
        this.usuario = new Usuario();
    }
}

export class Usuario {
    public token : string;
    public sequsuario: number;
    public seqpessoa: number;
    public nome: string;
    public email: string;
    public senha: string;
    public seqsituacao: string;
    public situacao: string;
    public seqconta: string;
    public indresponsaveltarefa: string;
    public usuario: string;
    public sequnidade: string;
    public chapa: string;
    public senhamobile: string;
    public separador: string;
    public indusaestoquecentralizado: string;
    public indacessaferias: string;
    public nroEmpresa: number;
    public codfilial: string;
    public sessao: string;
    public codsecao: string;
    public funcao_cod: string;
    public funcao: string;
    public coligada: string;
    public codcoligada: string;
    public codequipe: string;
    public cpfcnpjEmpRh: string;
    public foto: string;

    public logado: Boolean;
    public modulosPermitidos: Modulo[];
    public empresasPermitidas: Empresa[];
    public setoresPermitidos: Setor[];
    
    public Usuario() {
        this.logado = false;
    }

}

