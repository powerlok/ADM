import { Unidade } from '../models/Unidade';
import { Usuario } from "../models/Usuario";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";
import { Empresa } from "../models/Empresa";
const unid = [{ id: 5, desc: 'Brasília' }, { id: 6, desc: 'São Paulo' }, { id: 7, desc: 'Pizza Hut' }, { id: 9, desc: 'Sevla' }];

@Injectable()
export class UserService {
    _auth: AuthenticationService;
    _user: Usuario;
    

    constructor(auth: AuthenticationService) {
        this._auth = auth;
        this._user = this.getUserModels();
    }

    getUserModels(): Usuario {
        this._user = null;
        this._auth.getUserInfo().subscribe((user: string) => {
            this._user = JSON.parse(user) as Usuario;
        });
        return this._user;
    }

    getUnidadePerm() : Array<Unidade>{
        let unidades = new Array<Unidade>();
        let unids: number[] = [];
       
        unids = this._user.empresasPermitidas.sort().reduce((init, current) => {
            if (init.length === 0 || init[init.length - 1] !== current.sequnidade) {
                init.push(current.sequnidade);
            }
            return init;
        }, []);

       unidades = [];

       if(unids.length > 0)
       {
            let equal = unid.filter(item => unids.indexOf(item.id) >= -1);
            
            
            equal.map(x => {
                    let u = new Unidade();
                    u.SeqUnidade = x.id;
                    u.Unidade = x.desc;
                   if(u.SeqUnidade == 6) unidades.push(u);
                });    
        }
        
        return unidades;

    }

    getEmpresaPerm() : Array<Empresa> {
        let empresa = new Array<Empresa>();
        
        return this._user.empresasPermitidas.sort().filter(x =>  empresa.push(x));
    }

    getEmpresaPermUnid(sequnidade : number) : Array<Empresa> {
        let empresa = new Array<Empresa>();
        
        this._user.empresasPermitidas.sort().filter(e => e.sequnidade == sequnidade).map(x => empresa.push(x) );

       return empresa;
    }

    logout() {
        this._auth.logout();
        this._auth.redirectLogin();
    }
}