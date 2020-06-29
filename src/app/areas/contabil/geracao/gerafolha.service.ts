import { Injectable } from "@angular/core";
import { DbConsultModel, DbConsult, Parametro } from "../../../shared/models/Service";
import { AlertService } from "../../../shared/services/alert.service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import { SpinnerVisibilityService } from "ng-http-loader";
import { Observable, observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { Retorno, Inconsistencia } from "../../../../app/shared/models/GeraFolha";

@Injectable()
export class GeraFolhaService {
    private _dbConsult: DbConsultModel;

    constructor(private alertService: AlertService, private consult: ConsultAPIService, private spinner: SpinnerVisibilityService) {
        this._dbConsult = new DbConsultModel();
    }



    montaJsonPrincipal(tipogeracao : string, sequnidade: number, ano: number, mes: number, cpf: string, dtamov: string, dtavenc: string, dtapagtode: string, dtapagtoate: string, matriz : number, banco : string) : Observable<Retorno>{

        let parametro, parametro1, parametro2, parametro3, parametro4, parametro5, parametro6 = new Parametro();

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = tipogeracao;
        this._dbConsult.model.package = "cralpkg_api_integrac5rm";


        switch(tipogeracao)
        {
            case 'p_rm_gerafolha':
                    this._dbConsult.model.parameters = new Array<Parametro>();
                    this._dbConsult.model.tiporetorno = "113";
                    this._dbConsult.model.retorno = "r_result";
                    this._dbConsult.model.dbLink = "C5SPConnection";

                   /* parametro = new Parametro();
                    parametro.nome = "pr_sequnidade";
                    parametro.valor = sequnidade.toString();
                    this._dbConsult.model.parameters.push(parametro);*/

                    parametro1 = new Parametro();
                    parametro1.nome = "prAno";
                    parametro1.valor = ano.toString();
                    this._dbConsult.model.parameters.push(parametro1);

                    parametro2 = new Parametro();
                    parametro2.nome = "prMes";
                    parametro2.valor = mes.toString();
                    this._dbConsult.model.parameters.push(parametro2);

                    parametro3 = new Parametro();
                    parametro3.nome = "prDataVencimento";
                    parametro3.valor = dtavenc.toString();
                    this._dbConsult.model.parameters.push(parametro3);

                    parametro4 = new Parametro();
                    parametro4.nome = "prDataMovimento";
                    parametro4.valor = dtamov.toString();
                    this._dbConsult.model.parameters.push(parametro4);

                    parametro5 = new Parametro();
                    parametro5.nome = "prMatriz";
                    parametro5.valor = matriz.toString();
                    this._dbConsult.model.parameters.push(parametro5);

                    parametro6 = new Parametro();
                    parametro6.nome = "prNumBanco";
                    parametro6.valor = banco.toString();
                    this._dbConsult.model.parameters.push(parametro6);

            break;
            case 'p_rm_gerafolha_13':
                    this._dbConsult.model.parameters = new Array<Parametro>();
                    this._dbConsult.model.tiporetorno = "113";
                    this._dbConsult.model.retorno = "r_result";
                    this._dbConsult.model.dbLink = "C5SPConnection";

                   /* parametro = new Parametro();
                    parametro.nome = "pr_sequnidade";
                    parametro.valor = sequnidade.toString();
                    this._dbConsult.model.parameters.push(parametro);*/

                    parametro1 = new Parametro();
                    parametro1.nome = "prAno";
                    parametro1.valor = ano.toString();
                    this._dbConsult.model.parameters.push(parametro1);

                    parametro2 = new Parametro();
                    parametro2.nome = "prMes";
                    parametro2.valor = mes.toString();
                    this._dbConsult.model.parameters.push(parametro2);

                    parametro3 = new Parametro();
                    parametro3.nome = "prDataVencimento";
                    parametro3.valor = dtavenc.toString();
                    this._dbConsult.model.parameters.push(parametro3);

                    parametro4 = new Parametro();
                    parametro4.nome = "prDataMovimento";
                    parametro4.valor = dtamov.toString();
                    this._dbConsult.model.parameters.push(parametro4);

                    parametro5 = new Parametro();
                    parametro5.nome = "prMatriz";
                    parametro5.valor = matriz.toString();
                    this._dbConsult.model.parameters.push(parametro5);

                    parametro6 = new Parametro();
                    parametro6.nome = "prNumBanco";
                    parametro6.valor = banco.toString();
                    this._dbConsult.model.parameters.push(parametro6);

            break;
            case 'p_rm_gerafolha_adto':
                    this._dbConsult.model.parameters = new Array<Parametro>();
                    this._dbConsult.model.tiporetorno = "113";
                    this._dbConsult.model.retorno = "r_result";
                    this._dbConsult.model.dbLink = "C5SPConnection";

                    /*parametro = new Parametro();
                    parametro.nome = "pr_sequnidade";
                    parametro.valor = sequnidade.toString();
                    this._dbConsult.model.parameters.push(parametro);*/

                    parametro1 = new Parametro();
                    parametro1.nome = "prAno";
                    parametro1.valor = ano.toString();
                    this._dbConsult.model.parameters.push(parametro1);

                     parametro2 = new Parametro();
                    parametro2.nome = "prMes";
                    parametro2.valor = mes.toString();
                    this._dbConsult.model.parameters.push(parametro2);

                     parametro3 = new Parametro();
                    parametro3.nome = "prDataVencimento";
                    parametro3.valor = dtavenc.toString();
                    this._dbConsult.model.parameters.push(parametro3);

                     parametro4 = new Parametro();
                    parametro4.nome = "prDataMovimento";
                    parametro4.valor = dtamov.toString();
                    this._dbConsult.model.parameters.push(parametro4);

                    parametro5 = new Parametro();
                    parametro5.nome = "prMatriz";
                    parametro5.valor = matriz.toString();
                    this._dbConsult.model.parameters.push(parametro5);

                    parametro6 = new Parametro();
                    parametro6.nome = "prNumBanco";
                    parametro6.valor = banco.toString();
                    this._dbConsult.model.parameters.push(parametro6);

            break;
            case 'p_rm_gerafolha_compl':

                    this._dbConsult.model.parameters = new Array<Parametro>();
                    this._dbConsult.model.tiporetorno = "113";
                    this._dbConsult.model.retorno = "r_result";
                    this._dbConsult.model.dbLink = "C5SPConnection";

                   /* parametro = new Parametro();
                    parametro.nome = "pr_sequnidade";
                    parametro.valor = sequnidade.toString();
                    this._dbConsult.model.parameters.push(parametro);*/

                    parametro1 = new Parametro();
                    parametro1.nome = "prAno";
                    parametro1.valor = ano.toString();
                    this._dbConsult.model.parameters.push(parametro1);

                    parametro2 = new Parametro();
                    parametro2.nome = "prMes";
                    parametro2.valor = mes.toString();
                    this._dbConsult.model.parameters.push(parametro2);

                    parametro3 = new Parametro();
                    parametro3.nome = "prDataVencimento";
                    parametro3.valor = dtavenc.toString();
                    this._dbConsult.model.parameters.push(parametro3);

                    parametro4 = new Parametro();
                    parametro4.nome = "prDataMovimento";
                    parametro4.valor = dtamov.toString();
                    this._dbConsult.model.parameters.push(parametro4);

                    parametro5 = new Parametro();
                    parametro5.nome = "prMatriz";
                    parametro5.valor = matriz.toString();
                    this._dbConsult.model.parameters.push(parametro5);

                    parametro6 = new Parametro();
                    parametro6.nome = "prNumBanco";
                    parametro6.valor = banco.toString();
                    this._dbConsult.model.parameters.push(parametro6);

            break;
            case 'p_rm_gerafolha_diferenca':

                    this._dbConsult.model.parameters = new Array<Parametro>();
                    this._dbConsult.model.tiporetorno = "113";
                    this._dbConsult.model.retorno = "r_result";
                    this._dbConsult.model.dbLink = "C5SPConnection";

                    /*parametro = new Parametro();
                    parametro.nome = "pr_sequnidade";
                    parametro.valor = sequnidade.toString();
                    this._dbConsult.model.parameters.push(parametro);*/

                    parametro1 = new Parametro();
                    parametro1.nome = "prAno";
                    parametro1.valor = ano.toString();
                    this._dbConsult.model.parameters.push(parametro1);

                    parametro2 = new Parametro();
                    parametro2.nome = "prMes";
                    parametro2.valor = mes.toString();
                    this._dbConsult.model.parameters.push(parametro2);

                    parametro3 = new Parametro();
                    parametro3.nome = "prDataVencimento";
                    parametro3.valor = dtavenc.toString();
                    this._dbConsult.model.parameters.push(parametro3);

                    parametro4 = new Parametro();
                    parametro4.nome = "prDataMovimento";
                    parametro4.valor = dtamov.toString();
                    this._dbConsult.model.parameters.push(parametro4);

                    parametro5 = new Parametro();
                    parametro5.nome = "prMatriz";
                    parametro5.valor = matriz.toString();
                    this._dbConsult.model.parameters.push(parametro5);

                    parametro6 = new Parametro();
                    parametro6.nome = "prNumBanco";
                    parametro6.valor = banco.toString();
                    this._dbConsult.model.parameters.push(parametro6);

            break;
            case 'p_rm_gerafolha_ferias':

                    this._dbConsult.model.parameters = new Array<Parametro>();
                    this._dbConsult.model.tiporetorno = "113";
                    this._dbConsult.model.retorno = "r_result";
                    this._dbConsult.model.dbLink = "C5SPConnection";

                    /*parametro = new Parametro();
                    parametro.nome = "pr_sequnidade";
                    parametro.valor = sequnidade.toString();
                    this._dbConsult.model.parameters.push(parametro);*/

                    parametro1 = new Parametro();
                    parametro1.nome = "prDataPagamentode";
                    parametro1.valor = dtapagtode.toString();
                    this._dbConsult.model.parameters.push(parametro1);

                     parametro2 = new Parametro();
                    parametro2.nome = "prDataPagamentoate";
                    parametro2.valor = dtapagtoate.toString();
                    this._dbConsult.model.parameters.push(parametro2);

                    parametro3 = new Parametro();
                    parametro3.nome = "prMatriz";
                    parametro3.valor = matriz.toString();
                    this._dbConsult.model.parameters.push(parametro3);

                    parametro4 = new Parametro();
                    parametro4.nome = "prNumBanco";
                    parametro4.valor = banco.toString();
                    this._dbConsult.model.parameters.push(parametro4);

            break;
            case 'p_rm_gerafolha_rescisao':
                    this._dbConsult.model.parameters = new Array<Parametro>();
                    this._dbConsult.model.tiporetorno = "113";
                    this._dbConsult.model.retorno = "r_result";
                    this._dbConsult.model.dbLink = "C5SPConnection";

                  /*  parametro = new Parametro();
                    parametro.nome = "pr_sequnidade";
                    parametro.valor = sequnidade.toString();
                    this._dbConsult.model.parameters.push(parametro);*/

                    parametro1 = new Parametro();
                    parametro1.nome = "prDataPagamentode";
                    parametro1.valor = dtapagtode.toString();
                    this._dbConsult.model.parameters.push(parametro1);

                     parametro2 = new Parametro();
                    parametro2.nome = "prDataPagamentoate";
                    parametro2.valor = dtapagtoate.toString();
                    this._dbConsult.model.parameters.push(parametro2);

                    parametro3 = new Parametro();
                    parametro3.nome = "prMatriz";
                    parametro3.valor = matriz.toString();
                    this._dbConsult.model.parameters.push(parametro3);

                    parametro6 = new Parametro();
                    parametro6.nome = "prNumBanco";
                    parametro6.valor = banco.toString();
                    this._dbConsult.model.parameters.push(parametro6);

            break;
            case 'p_rm_gerafolha_pensao':
                this._dbConsult.model.parameters = new Array<Parametro>();
                this._dbConsult.model.tiporetorno = "113";
                this._dbConsult.model.retorno = "r_result";
                this._dbConsult.model.dbLink = "C5SPConnection";

              /*  parametro = new Parametro();
                parametro.nome = "pr_sequnidade";
                parametro.valor = sequnidade.toString();
                this._dbConsult.model.parameters.push(parametro);*/

                parametro1 = new Parametro();
                parametro1.nome = "prAno";
                parametro1.valor = ano.toString();
                this._dbConsult.model.parameters.push(parametro1);

                parametro2 = new Parametro();
                parametro2.nome = "prMes";
                parametro2.valor = mes.toString();
                this._dbConsult.model.parameters.push(parametro2);

                parametro3 = new Parametro();
                parametro3.nome = "prDataVencimento";
                parametro3.valor = dtavenc.toString();
                this._dbConsult.model.parameters.push(parametro3);

                parametro4 = new Parametro();
                parametro4.nome = "prDataMovimento";
                parametro4.valor = dtamov.toString();
                this._dbConsult.model.parameters.push(parametro4);

                parametro5 = new Parametro();
                parametro5.nome = "prMatriz";
                parametro5.valor = matriz.toString();
                this._dbConsult.model.parameters.push(parametro5);

                //parametro6 = new Parametro();
              //  parametro6.nome = "prNumBanco";
                //parametro6.valor = banco.toString();
                //this._dbConsult.model.parameters.push(parametro6);

            break;
            case 'p_CadPessoaPensao':
                this._dbConsult.model.parameters = new Array<Parametro>();
                this._dbConsult.model.tiporetorno = "113";
                this._dbConsult.model.retorno = "v_seqpessoa";
                this._dbConsult.model.dbLink = "C5SPConnection";

                /*parametro = new Parametro();
                parametro.nome = "pr_sequnidade";
                parametro.valor = sequnidade.toString();
                this._dbConsult.model.parameters.push(parametro);*/

                parametro1 = new Parametro();
                parametro1.nome = "pr_cpf";
                parametro1.valor = cpf.toString();
                this._dbConsult.model.parameters.push(parametro1);


            break;

            case 'p_rm_gerafolha_transp':
              this._dbConsult.model.parameters = new Array<Parametro>();
              this._dbConsult.model.tiporetorno = "113";
              this._dbConsult.model.retorno = "r_result";
              this._dbConsult.model.dbLink = "C5SPConnection";

              parametro1 = new Parametro();
              parametro1.nome = "prAno";
              parametro1.valor = ano.toString();
              this._dbConsult.model.parameters.push(parametro1);

              parametro2 = new Parametro();
              parametro2.nome = "prMes";
              parametro2.valor = mes.toString();
              this._dbConsult.model.parameters.push(parametro2);

              parametro3 = new Parametro();
              parametro3.nome = "prDataVencimento";
              parametro3.valor = dtavenc.toString();
              this._dbConsult.model.parameters.push(parametro3);

              parametro4 = new Parametro();
              parametro4.nome = "prDataMovimento";
              parametro4.valor = dtamov.toString();
              this._dbConsult.model.parameters.push(parametro4);

              parametro5 = new Parametro();
              parametro5.nome = "prMatriz";
              parametro5.valor = matriz.toString();
              this._dbConsult.model.parameters.push(parametro5);

              parametro6 = new Parametro();
              parametro6.nome = "prNumBanco";
              parametro6.valor = banco.toString();
              this._dbConsult.model.parameters.push(parametro6);

          break;
        }

        return this.call(JSON.stringify(this._dbConsult));
    }

    montaJsonCadFuncionario() : Observable<Retorno>{

        this._dbConsult.model = new DbConsult();
        this._dbConsult.model.objeto = "p_rm_cadfuncionario";
        this._dbConsult.model.package = "cralpkg_api_integrac5rm";

        this._dbConsult.model.parameters = new Array<Parametro>();
        this._dbConsult.model.tiporetorno = "113";
        this._dbConsult.model.retorno = "r_result";
        this._dbConsult.model.dbLink = "C5SPConnection";

        return this.call(JSON.stringify(this._dbConsult));
    }

    montaJsonContaBancaria() : Observable<Retorno>{

      this._dbConsult.model = new DbConsult();
      this._dbConsult.model.objeto = "p_rm_contabancaria";
      this._dbConsult.model.package = "cralpkg_api_integrac5rm";

      this._dbConsult.model.parameters = new Array<Parametro>();
      this._dbConsult.model.tiporetorno = "113";
      this._dbConsult.model.retorno = "r_result";
      this._dbConsult.model.dbLink = "C5SPConnection";

      return this.call(JSON.stringify(this._dbConsult));
  }

    montaJsonIntegracao() : Observable<Retorno> {

      this._dbConsult.model = new DbConsult();
      this._dbConsult.model.objeto = "p_rm_integrar";
      this._dbConsult.model.package = "cralpkg_api_integrac5rm";

      this._dbConsult.model.parameters = new Array<Parametro>();
      this._dbConsult.model.tiporetorno = "113";
      this._dbConsult.model.retorno = "r_result";
      this._dbConsult.model.dbLink = "C5SPConnection";

      return this.call(JSON.stringify(this._dbConsult));
    }

    montaJsonComplTitulo(codespecie: string) : Observable<Retorno> {

      let parametro = new Parametro();

      this._dbConsult.model = new DbConsult();
      this._dbConsult.model.objeto = "p_rm_compltituloccpadrao";
      this._dbConsult.model.package = "cralpkg_api_integrac5rm";

      this._dbConsult.model.parameters = new Array<Parametro>();
      this._dbConsult.model.tiporetorno = "113";
      this._dbConsult.model.retorno = "r_result";
      this._dbConsult.model.dbLink = "C5SPConnection";

      parametro = new Parametro();
      parametro.nome = "pr_codespecie";
      parametro.valor = codespecie;
      this._dbConsult.model.parameters.push(parametro);

      return this.call(JSON.stringify(this._dbConsult));
    }

    montaJsonInconsistencia(codespecie: string) : Observable<Retorno> {
      let parametro = new Parametro();

      this._dbConsult.model = new DbConsult();
      this._dbConsult.model.objeto = "p_buscainconsistencia";
      this._dbConsult.model.package = "cralpkg_api_integrac5rm";

      this._dbConsult.model.parameters = new Array<Parametro>();
      this._dbConsult.model.tiporetorno = "121";
      this._dbConsult.model.retorno = "r_result";
      this._dbConsult.model.dbLink = "C5SPConnection";

      parametro = new Parametro();
      parametro.nome = "pr_especie";
      parametro.valor = codespecie;
      this._dbConsult.model.parameters.push(parametro);

      return this.call(JSON.stringify(this._dbConsult));
    }

    call(json : string) : Observable<Retorno> {
      //console.log(json);
      var ret = new Retorno();
      return this.consult.post(json, 0).pipe(
        map((res: DbConsult) => {
            if (res.error.errorMasseger != null) {
              this.alertService.alertInfinit(res.error.errorMasseger);
            }else{
              if((res.obj.json).toString() != "0"){
                ret.inconsistencia = res.obj.json as Inconsistencia[];

              }else{
                ret.value = (res.obj.json).toString();
              }
            }
            return ret;
        })
      );
    }

    geraPrincipal(tipogeracao : string, sequnidade: number, ano: number, mes: number, cpf: string, dtamov: string, dtavenc: string, dtapagtode: string, dtapagtoate: string, matriz : number, banco: string) : Observable<Retorno>{
        this.spinner.show();

          var ret = this.montaJsonPrincipal(tipogeracao, sequnidade, ano, mes, cpf, dtamov, dtavenc, dtapagtode, dtapagtoate, matriz, banco);


          this.montaJsonPrincipal(tipogeracao, sequnidade, ano, mes, cpf, dtamov, dtavenc, dtapagtode, dtapagtoate, matriz, banco).subscribe((a : Retorno) =>{

             if(a.value == "0") {
                 this.alertService.alertInfinit("Importação realizada com sucesso.");
             }
             this.spinner.hide();
          });

          return ret;
    }

    validaCampos(sequnidade: number, form : FormGroup) {
        let valid : boolean = true;

        switch(form.get("tipogeracao").value) {
            case 'p_rm_gerafolha':
                  if(sequnidade == 7) {

                    if(form.get("ano").value == "" || form.get("mes").value == "" || form.get("dtavencimento").value == "")
                    {
                      valid = false;
                    }

                  }else{

                   if(form.get("ano").value == "" || form.get("mes").value == "" || form.get("dtamovimento").value == "" || form.get("dtavencimento").value == "" || form.get("matriz").value == "")
                   {
                     valid = false;
                   }
                }
            break;
            case 'p_rm_gerafolha_13':

            if(form.get("ano").value == "" || form.get("mes").value == "" || form.get("dtamovimento").value == "" || form.get("dtavencimento").value == "" || form.get("matriz").value == "")
            {
              valid = false;
            }

            break;
            case 'p_rm_gerafolha_adto':

            if(form.get("ano").value == "" || form.get("mes").value == "" || form.get("dtamovimento").value == "" || form.get("dtavencimento").value == "" || form.get("matriz").value == "")
            {
              valid = false;
            }

            break;
            case 'p_rm_gerafolha_compl':


            if(form.get("ano").value == "" || form.get("mes").value == "" || form.get("dtamovimento").value == "" || form.get("dtavencimento").value == "" || form.get("matriz").value == "")
            {
              valid = false;
            }

            break;
            case 'p_rm_gerafolha_diferenca':


            if(form.get("ano").value == "" || form.get("mes").value == "" || form.get("dtamovimento").value == "" || form.get("dtavencimento").value == "" || form.get("matriz").value == "")
            {
              valid = false;
            }

            break;
            case 'p_rm_gerafolha_ferias':


            if(form.get("dtapagamentode").value == "" || form.get("dtapagamentoate").value == "" || form.get("matriz").value == "")
            {
              valid = false;
            }

            break;
            case 'p_rm_gerafolha_rescisao':

            if(form.get("dtapagamentode").value == "" || form.get("dtapagamentoate").value == "" || form.get("matriz").value == "")
            {
              valid = false;
            }

            break;
            case 'p_rm_gerafolha_pensao':

            if(form.get("ano").value == "" || form.get("mes").value == "" || form.get("dtamovimento").value == "" || form.get("dtavencimento").value == "" || form.get("matriz").value == "")
            {
              valid = false;
            }

            break;
            case 'p_CadPessoaPensao':

             valid = false;

            break;
            case 'p_rm_gerafolha_transp':

            if(form.get("ano").value == "" || form.get("mes").value == "" || form.get("dtamovimento").value == "" || form.get("dtavencimento").value == "" || form.get("matriz").value == "")
            {
              valid = false;
            }

            break;
        }

        if(form.get("tipogeracao").value != "p_rm_gerafolha_rescisao" && form.get("tipogeracao").value != "p_rm_gerafolha_ferias") {

          if(form.get("ano").value < new Date('YYYY')){
            valid = false;
          }

          if(form.get("mes").value < 1 || form.get("mes").value > 12){
            valid = false;
          }
        }

        if(valid == false) this.alertService.alert("Preencha todos os campos ou verifique se as informações estão corretas.");

        return valid;
    }

}

/*interface Inconsistencia {

}*/
