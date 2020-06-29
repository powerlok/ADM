import { Injectable, EventEmitter, Output, OnDestroy, Input } from "@angular/core";
import { DbConsult, Parametro, DbConsultModel } from "../../../shared/models/Service";
import { Demonstrativo1, FaturaVivo, Demonstrativo2, Demonstrativo3, DemonstrativoServicos, Servicos, Fatura, Impostos, Resumo, DetalhesNF, CelularesFatura, Delete } from "../../../shared/models/FaturaVivo";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AlertService } from "../../../shared/services/alert.service";
import { forkJoin, Subject } from "rxjs";

@Injectable()
export class FaturaVivoService  {
    private _dbConsult: DbConsultModel;

    constructor(private consult : ConsultAPIService, private spinner: SpinnerVisibilityService, private alertService: AlertService) {
        this._dbConsult = new DbConsultModel();
    }

    executar(obj : object, objeto : string) : Observable<any> {
        return this.consult.post(this.getJsonExec(obj, objeto),0);
    }

    executar2(obj : object, objeto : string) : Observable<string> {

        return this.consult.post(this.getJsonExec(obj, objeto),0).pipe(map((res: DbConsult) => {
                    let resp : object = res.obj.json as object;
                    let retorno : string = null;
                    if(res.error.errorMasseger != null){
                    this.alertService.alertInfinit(res.error.errorMasseger);   
                     
                        retorno = res.error.errorMasseger;

                    }else{
                        retorno = res.error.errorMasseger;
                    }
                    return retorno;                
                }));    
           // return this.ret;
    }

    getJsonExec(obj: object, objeto : string): string {

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = objeto;
        this._dbConsult.model.package = "pkg_api_faturavivo";
        this._dbConsult.model.tiporetorno = "105";
        this._dbConsult.model.retorno = "p_erro";

        this._dbConsult.model.parameters = new Array<Parametro>();
        let json = JSON.parse(JSON.stringify(obj), (key, value) => {
            if(key != ""){
                let parametro = new Parametro();
                parametro.nome = key;
                parametro.valor = value;
                this._dbConsult.model.parameters.push(parametro);
            }
        });

        return JSON.stringify(this._dbConsult);
    }

    delete(conta : string) {
        
        let d1 = new Delete();  
        if (typeof conta !== "undefined") {  
             d1.conta  = conta;          
        }
             
        return d1;
    }

    getDemo1(json : object) : Demonstrativo1[] {
        let demo1 = new Array<Demonstrativo1>();
    
        let data = JSON.parse(JSON.stringify(json));
      
        for (let k of data) {            
            let d1 = new Demonstrativo1();            
            
            for(var p in JSON.parse(JSON.stringify(k))){    
                //console.log(k);
                if (typeof p !== "undefined") {  
                    let key = p;                     

                    d1.conta             = (key === "Conta")                 ? k[p] : d1.conta;
                    d1.centrocusto       = (key === "Centro de Custo")       ? k[p] : d1.centrocusto;
                    d1._celular           = (key === "Celular")               ? k[p] : d1._celular;
                    d1.secaochamada      = (key === "Seção da Chamada")      ? k[p] : d1.secaochamada;
                    d1.mesanoref         = (key === "Mês/Ano de Referência") ? k[p] : d1.mesanoref;
                    d1.descchamada       = (key === "Descrição da Chamada")  ? k[p] : d1.descchamada;
                    d1.datachamada       = (key === "Data da Chamada")       ? k[p] : d1.datachamada;
                    d1.horachamada       = (key === "Hora da Chamada")       ? k[p] : d1.horachamada;
                    d1.tipochamada       = (key === "Tipo da Chamada")       ? k[p] : d1.tipochamada;
                    d1.cidadeorigem      = (key === "Cidade de Origem")      ? k[p] : d1.cidadeorigem;
                    d1.uforigem          = (key === "UF de Origem")          ? k[p] : d1.uforigem;
                    d1.cidadedestino     = (key === "Cidade de Destino")     ? k[p] : d1.cidadedestino;
                    d1.ufdestino         = (key === "UF de Destino")         ? k[p] : d1.ufdestino;
                    d1.nchamada          = (key === "Nº Chamado")            ? k[p] : d1.nchamada;
                    d1.tarifa            = (key === "Tarifa")                ? k[p] : d1.tarifa;
                    d1.duracao           = (key === "Duração")               ? k[p] : d1.duracao;
                    d1.quantidade        = (key === "Quantidade")            ? k[p] : d1.quantidade;
                    d1.contratados       = (key === "Contratados")           ? k[p] : d1.contratados;
                    d1.utilizados        = (key === "Utilizados")            ? k[p] : d1.utilizados;
                    d1.excedentes        = (key === "Excedentes")            ? k[p] : d1.excedentes;
                    d1.unidade           = (key === "Unidade")               ? k[p] : d1.unidade;
                    d1.atransporte       = (key === "A transportar")         ? k[p] : d1.atransporte;
                    d1._valor            = (key === "Valor")                 ? k[p] : d1._valor;

                }

            }             
            demo1.push(d1);
        }
          
        return demo1;
    }

    getDemo2(json : object) : Demonstrativo2[] {
        let demo1 : Demonstrativo2[]  = new Array<Demonstrativo2>();
        let data = JSON.parse(JSON.stringify(json));
      
        for (let k of data) {            
            let d1 = new Demonstrativo2();
            for(var p in JSON.parse(JSON.stringify(k))){ 
                
                if (typeof p !== "undefined") {  
                let key = p;   
                
              
                    d1.conta             = (key === "Conta")                 ? k[p] : d1.conta;
                    d1.centrocusto       = (key === "Centro de Custo")       ? k[p] : d1.centrocusto;
                    d1._celular           = (key === "Celular")               ? k[p] : d1._celular;
                    d1.secaochamada      = (key === "Seção da Chamada")      ? k[p] : d1.secaochamada;
                    d1.mesanoref         = (key === "Mês/Ano de Referência") ? k[p] : d1.mesanoref;
                    d1.descchamada       = (key === "Descrição da Chamada")  ? k[p] : d1.descchamada;
                    d1.datachamada       = (key === "Data da Chamada")       ? k[p] : d1.datachamada;
                    d1.horachamada       = (key === "Hora da Chamada")       ? k[p] : d1.horachamada;
                    d1.tipochamada       = (key === "Tipo da Chamada")       ? k[p] : d1.tipochamada;
                    d1.cidadeorigem      = (key === "Cidade de Origem")      ? k[p] : d1.cidadeorigem;
                    d1.uforigem          = (key === "UF de Origem")          ? k[p] : d1.uforigem;
                    d1.cidadedestino     = (key === "Cidade de Destino")     ? k[p] : d1.cidadedestino;
                    d1.ufdestino         = (key === "UF de Destino")         ? k[p] : d1.ufdestino;
                    d1.nchamada          = (key === "Nº Chamado")            ? k[p] : d1.nchamada;
                    d1.tarifa            = (key === "Tarifa")                ? k[p] : d1.tarifa;
                    d1.duracao           = (key === "Duração")               ? k[p] : d1.duracao;
                    d1.quantidade        = (key === "Quantidade")            ? k[p] : d1.quantidade;
                    d1.contratados       = (key === "Contratados")           ? k[p] : d1.contratados;
                    d1.utilizados        = (key === "Utilizados")            ? k[p] : d1.utilizados;
                    d1.excedentes        = (key === "Excedentes")            ? k[p] : d1.excedentes;
                    d1.unidade           = (key === "Unidade")               ? k[p] : d1.unidade;
                    d1.atransporte       = (key === "A transportar")         ? k[p] : d1.atransporte;
                    d1._valor            = (key === "Valor")                 ? k[p] : d1._valor;

                }

            }             
            demo1.push(d1);
        }
          //console.log(demo1);
        return demo1;
    }

    getDemoServ(json : object) : DemonstrativoServicos[] {
        let demo1  = new Array<DemonstrativoServicos>();
        let data = JSON.parse(JSON.stringify(json));
      
        for (let k of data) {            
            let d1 = new DemonstrativoServicos();
            for(var p in JSON.parse(JSON.stringify(k))){ 
               
                if (typeof p !== "undefined") {  
                    let key = p;   
    
                    d1.conta             = (key === "Conta")                 ? k[p] : d1.conta;
                    d1.centrocusto       = (key === "Centro de Custo")       ? k[p] : d1.centrocusto;
                    d1._celular           = (key === "Celular")               ? k[p] : d1._celular;
                    d1.tiposervico       = (key === "Tipo do Serviço")       ? k[p] : d1.tiposervico;
                    d1.desccservico      = (key === "Descrição do Serviço")  ? k[p] : d1.desccservico;
                    d1.mesanoref         = (key === "Mês/Ano de Referência") ? k[p] : d1.mesanoref;
                    d1.subsecaoservico   = (key === "Subseção do Serviço")   ? k[p] : d1.subsecaoservico;
                    d1.dataredebito      = (key === "Data do redébito")      ? k[p] : d1.dataredebito;
                    d1.datachamada       = (key === "Data da chamada")       ? k[p] : d1.datachamada;
                    d1.datainicial       = (key === "Data Inicial")          ? k[p] : d1.datainicial;
                    d1.datafinal         = (key === "Data Final")            ? k[p] : d1.datafinal;     
                    d1.tipochamada       = (key === "Tipo da chamada")       ? k[p] : d1.tipochamada;     
                    d1.cidadeorigem      = (key === "Cidade de origem")      ? k[p] : d1.cidadeorigem;      
                    d1.uforigem          = (key === "UF de origem")          ? k[p] : d1.uforigem;
                    d1.cidadedestino     = (key === "Cidade de destino")     ? k[p] : d1.cidadedestino;
                    d1.ufdestino         = (key === "UF de destino")         ? k[p] : d1.ufdestino;
                    d1.numerochamado     = (key === "Número chamado")        ? k[p] : d1.numerochamado;
                    d1.tipotarifa        = (key === "Tipo da tarifa")        ? k[p] : d1.tipotarifa;
                    d1.duracao           = (key === "Duração")               ? k[p] : d1.duracao;
                    d1._valorreais       = (key === "Valor em reais")        ? k[p] : d1._valorreais;
                }
            }             
            demo1.push(d1);
        }
          //console.log(demo1);
        return demo1;
    }

    getServicos(json : object) : Servicos[] {
        let demo1  = new Array<Servicos>();
        let data = JSON.parse(JSON.stringify(json));
      
        for (let k of data) {            
            let d1 = new Servicos();
            for(var p in JSON.parse(JSON.stringify(k))){     
                
                if (typeof p !== "undefined") {  
                    let key = p;   
    
                    d1.conta                 = (key === "Conta")                           ? k[p] : d1.conta;
                    d1.centrocusto           = (key === "Centro de Custo")                 ? k[p] : d1.centrocusto;
                    d1.tiposervico           = (key === "Tipo do Serviço")                 ? k[p] : d1.tiposervico;
                    d1.descservico           = (key === "Descrição do Serviço")            ? k[p] : d1.descservico;
                    d1.celular               = (key === "Celular")                         ? k[p] : d1.celular;
                    d1.mesanoref             = (key === "Mês/Ano de Referência")           ? k[p] : d1.mesanoref;
                    d1.nomecompartilhamento  = (key === "Nome do compartilhamento")        ? k[p] : d1.nomecompartilhamento;
                    d1.contratados           = (key === "Contratados")                     ? k[p] : d1.contratados;
                    d1.utilizados            = (key === "Utilizados")                      ? k[p] : d1.utilizados;
                    d1.parcela               = (key === "Parcela")                         ? k[p] : d1.parcela;     
                    d1._valor                = (key === "Valor")                           ? k[p] : d1._valor;     
                }
            }             
            demo1.push(d1);
        }
          
        return demo1;
    }

    getCelularesFatura(json : object) : CelularesFatura[] {
        let demo1  = new Array<CelularesFatura>();
        let data = JSON.parse(JSON.stringify(json));
      
        for (let k of data) {            
            let d1 = new CelularesFatura();
            for(var p in JSON.parse(JSON.stringify(k))){    
                
                if (typeof p !== "undefined") {  
                    let key = p;   
    
                    d1.conta                  = (key === "Conta")                           ? k[p] : d1.conta;
                    d1.centrocusto            = (key === "Centro de Custo")                 ? k[p] : d1.centrocusto;
                    d1._numerocelular          = (key === "Número do celular")               ? k[p] : d1._numerocelular;
                    d1._valorcelular          = (key === "Valor do celular")                ? k[p] : d1._valorcelular;
                    d1.departamento           = (key === "Departamento")                    ? k[p] : d1.departamento;  
                } 
            }             
            demo1.push(d1);
        }
          
        return demo1;
    }

    getDetalhesNF(json : object) : DetalhesNF[] {
        let demo1  = new Array<DetalhesNF>();
        let data = JSON.parse(JSON.stringify(json));
    
        for (let k of data) {            
            let d1 = new DetalhesNF();
            for(var p in JSON.parse(JSON.stringify(k))){      
                if (typeof p !== "undefined") {  
                    let key = p;   
    
                    d1.conta             = (key === "Conta")                 ? k[p] : d1.conta;
                    d1.centrocusto       = (key === "Centro de Custo")       ? k[p] : d1.centrocusto;
                    d1.operadora         = (key === "Operadora")             ? k[p] : d1.operadora;
                    d1.notafiscal        = (key === "Nota Fiscal")           ? k[p] : d1.notafiscal;
                    d1.sequencia         = (key === "Sequência")             ? k[p] : d1.sequencia;
                    d1.codservico        = (key === "Cód. Serviço")          ? k[p] : d1.codservico;
                    d1.secao             = (key === "Seção")                 ? k[p] : d1.secao;
                    d1.descricao         = (key === "Descrição")             ? k[p] : d1.descricao;
                    d1.referencia        = (key === "Referência")            ? k[p] : d1.referencia;
                    d1._quantidade       = (key === "Quantidade")            ? k[p] : d1._quantidade;
                    d1._valor            = (key === "Valor")                 ? k[p] : d1._valor;     
                    d1.icms              = (key === "ICMS %")                ? k[p] : d1.icms;     
                    d1._totalnf          = (key === "Total da Nota Fiscal")  ? k[p] : d1._totalnf;      
                }
            }             
            demo1.push(d1);
        }
          
        return demo1;
    }

    getImpostos(json : object) : Impostos[] {
        let demo1  = new Array<Impostos>();
        let data = JSON.parse(JSON.stringify(json));
      
        for (let k of data) {            
            let d1 = new Impostos();
            for(var p in JSON.parse(JSON.stringify(k))){    
                if (typeof p !== "undefined") {    
                    let key = p;   
    
                    d1.conta                = (key === "Conta")                         ? k[p] : d1.conta;
                    d1.centrocusto          = (key === "Centro de Custo")               ? k[p] : d1.centrocusto;
                    d1.operadora            = (key === "Operadora")                     ? k[p] : d1.operadora;
                    d1.endereco1            = (key === "Endereço 1")                    ? k[p] : d1.endereco1;
                    d1.endereco2            = (key === "Endereço 2")                    ? k[p] : d1.endereco2;
                    d1.cep                  = (key === "CEP")                           ? k[p] : d1.cep;
                    d1.cnpj                 = (key === "CNPJ")                          ? k[p] : d1.cnpj;
                    d1.notafiscal           = (key === "Nota Fiscal")                   ? k[p] : d1.notafiscal;
                    d1.descimposto          = (key === "Descrição do Imposto")          ? k[p] : d1.descimposto;
                    d1.aliquota             = (key === "Alíquota")                      ? k[p] : d1.aliquota;
                    d1._basecalculoimposto  = (key === "Base de Cálculo do Imposto")    ? k[p] : d1._basecalculoimposto;     
                    d1._valorimposto        = (key === "Valor do Imposto")              ? k[p] : d1._valorimposto;     
                    d1._valornf             = (key === "Valor da Nota Fiscal")          ? k[p] : d1._valornf;     
                    d1._naotributavel       = (key === "Não Tributável")                ? k[p] : d1._naotributavel;   
                }   
            }             
            demo1.push(d1);
        }
          
        return demo1;
    }

    getResumo(json : object) : Resumo[] {
        let demo1  = new Array<Resumo>();
        let data = JSON.parse(JSON.stringify(json));
      
        for (let k of data) {            
            let d1 = new Resumo();
            for(var p in JSON.parse(JSON.stringify(k))){   
                if (typeof p !== "undefined") {     
                    let key = p;   
    
                    d1.conta             = (key === "Conta")                  ? k[p] : d1.conta;
                    d1.centrocusto       = (key === "Centro de Custo")        ? k[p] : d1.centrocusto;
                    d1.descservico       = (key === "Descrição do Serviço")   ? k[p] : d1.descservico;
                    d1._valorservico     = (key === "Valor do Serviço")       ? k[p] : d1._valorservico;    
                } 
            }             
            demo1.push(d1);
        }
          
        return demo1;
    }

    getFatura(json : object) : Fatura[] {
        let demo1  = new Array<Fatura>();
        let data = JSON.parse(JSON.stringify(json));
      
        for (let k of data) {            
            let d1 = new Fatura();
            for(var p in JSON.parse(JSON.stringify(k))){
                if (typeof p !== "undefined") {        
                    let key = p;   
    
                    d1.conta             = (key === "CONTA")                  ? k[p] : d1.conta;
                    d1.centrocusto       = (key === "CENTRO DE CUSTO")        ? k[p] : d1.centrocusto;
                    d1.descricao         = (key === "DESCRIÇÃO")              ? k[p] : d1.descricao;
                    d1._valordespesa     = (key === "VALOR DA DESPESA")       ? k[p] : d1._valordespesa;        
                }  
            }             
            demo1.push(d1);
        }
          
        return demo1;
    }
    
    getDemo3(json : object) : Demonstrativo3[] {
        let demo1  = new Array<Demonstrativo3>();
        let data = JSON.parse(JSON.stringify(json));
      
        for (let k of data) {            
            let d1 = new Demonstrativo3();
            for(var p in JSON.parse(JSON.stringify(k))){    
                if (typeof p !== "undefined") {    
                    let key = p;                  
                
                    d1.conta             = (key === "Conta")                 ? k[p] : d1.conta;
                    d1.centrocusto       = (key === "Centro de Custo")       ? k[p] : d1.centrocusto;
                    d1.celular           = (key === "Celular")               ? k[p] : d1.celular;
                    d1.secaochamada      = (key === "Seção da Chamada")      ? k[p] : d1.secaochamada;
                    d1.mesanoref         = (key === "Mês/Ano de Referência") ? k[p] : d1.mesanoref;
                    d1.descchamada       = (key === "Descrição da Chamada")  ? k[p] : d1.descchamada;
                    d1.datachamada       = (key === "Data da Chamada")       ? k[p] : d1.datachamada;
                    d1.horachamada       = (key === "Hora da Chamada")       ? k[p] : d1.horachamada;
                    d1.tipochamada       = (key === "Tipo da Chamada")       ? k[p] : d1.tipochamada;
                    d1.cidadeorigem      = (key === "Cidade de Origem")      ? k[p] : d1.cidadeorigem;
                    d1.uforigem          = (key === "UF de Origem")          ? k[p] : d1.uforigem;
                    d1.cidadedestino     = (key === "Cidade de Destino")     ? k[p] : d1.cidadedestino;
                    d1.ufdestino         = (key === "UF de Destino")         ? k[p] : d1.ufdestino;
                    d1.nchamada          = (key === "Nº Chamado")            ? k[p] : d1.nchamada;
                    d1.tarifa            = (key === "Tarifa")                ? k[p] : d1.tarifa;
                    d1.duracao           = (key === "Duração")               ? k[p] : d1.duracao;
                    d1.quantidade        = (key === "Quantidade")            ? k[p] : d1.quantidade;
                    d1.contratados       = (key === "Contratados")           ? k[p] : d1.contratados;
                    d1.utilizados        = (key === "Utilizados")            ? k[p] : d1.utilizados;
                    d1.excedentes        = (key === "Excedentes")            ? k[p] : d1.excedentes;
                    d1.unidade           = (key === "Unidade")               ? k[p] : d1.unidade;
                    d1.atransporte       = (key === "A transportar")         ? k[p] : d1.atransporte;
                    d1._valor            = (key === "Valor")                 ? k[p] : d1._valor;
                }

            }             
            demo1.push(d1);
        }
          
        return demo1;
    }

    salvar(faturaVivo : FaturaVivo){
        //this.spinner.show();        
            this.executar2(this.delete(faturaVivo.demonstrativo1[0].conta), "p_delete").subscribe((x : string) => {

            if(x == null)
            {   
                let requets = [];        
      
                faturaVivo.demonstrativo1.forEach(i => { 
                    requets.push(this.executar(i, 'p_salvar_demonstrativo1'));
                }); 
                //this.execFork(requets);

                //requets = [];
                faturaVivo.demonstrativo2.forEach(i => {
                    requets.push(this.executar(i, 'p_salvar_demonstrativo2'));
                });
                //this.execFork(requets);

                //requets = [];
                faturaVivo.demonstrativoServico.forEach(i => {
                    requets.push(this.executar(i, 'p_salvar_demoservico'));		
                });
                //this.execFork(requets);

                //requets = [];
                faturaVivo.servicos.forEach(i => {
                    requets.push(this.executar(i, 'p_salvar_servico'));			
                });
                //this.execFork(requets);
                
                //requets = [];
                faturaVivo.celularesFatura.forEach(i => {
                    requets.push(this.executar(i, 'p_salvar_celfatura'));	
                }); 
                //this.execFork(requets);               

                //requets = [];
                faturaVivo.detalhesNF.forEach(i => { 
                    requets.push(this.executar(i, 'p_salvar_detalhenf'));		
                });
                //this.execFork(requets);
                
                //requets = [];
                faturaVivo.impostos.forEach(i => { 
                    requets.push(this.executar(i, 'p_salvar_imposto'));					
                });
                //this.execFork(requets);
                
                //requets = [];
                faturaVivo.resumo.forEach(i => { 
                    requets.push(this.executar(i, 'p_salvar_resumo'));			
                });    
                //this.execFork(requets);            

                //requets = [];
                faturaVivo.fatura.forEach(i => {
                    requets.push(this.executar(i, 'p_salvar_fatura'));					
                });
                //this.execFork(requets);
                
                //requets = [];
                faturaVivo.demonstrativo3.forEach(i => {
                    requets.push(this.executar(i, 'p_salvar_demonstrativo3'));		
                });	
                //console.log(requets);
                this.execFork(requets);

                requets = [];
                faturaVivo = null;
                this.alertService.alert("Registros importados com sucesso.");  
               // this.spinner.hide();
            }	
        });
    }

    execFork(requests) {
        let sub = forkJoin(requests).subscribe(results => {
            this.getRequest(results);         
        }); 

        sub.unsubscribe();
    }

    private getRequest(requests) {      
        for(let res of requests) {
            let r = res as DbConsult;
            //console.log(r);
            let resp : object = r.obj.json as object;                    

            if(res.error.errorMasseger != null){
                this.alertService.alertInfinit('Erro ao tentar carregar o campo. Motivo: ' + res.error.errorMasseger); 
                break;  
                                                  
            }else{
                  
                continue;                   
            } 
        } 
    }

}
