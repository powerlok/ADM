import { map, catchError, shareReplay } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  Parametro,
  DbConsultModel,
  DbConsult,
  ErrorMessage,
} from "../../../shared/models/Service";
import { ConsultAPIService } from "../../../shared/services/consultapi.service";
import {
  AppontamentoProdutivo,
  Separador,
  AppontamentoProdutivoForm,
} from "./models/ApontamentoProdutivoList.models";
import { AlertService } from "../../../shared/services/alert.service";
import { Observable, throwError } from "rxjs";
import { SpinnerVisibilityService } from "ng-http-loader";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ApontamentoProdutivoServiceJson } from "./apontamentoprodutivo.service.json";
import { Utils } from "app/shared/util/utils";
import ApiConfig from "../../../../config/api";

@Injectable({
  providedIn: 'root',
 })
export class ApontamentoProdutivoService {
  private _alertService: AlertService;
  private _apontamento: AppontamentoProdutivo[];

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private consult: ConsultAPIService,
    private spinner: SpinnerVisibilityService,
    private apontamentoProdutivoServiceJson: ApontamentoProdutivoServiceJson,
    private util: Utils
  ) {
    this._alertService = alertService;
    this._apontamento = new Array<AppontamentoProdutivo>();
  }

  //Salva / Edita
  salvar(tel: AppontamentoProdutivoForm): Observable<boolean> {
    this.spinner.show();

    return this.http
      .post(
        ApiConfig.baseUrl,
        this.apontamentoProdutivoServiceJson.setJsonCadastro(tel),
        {
          headers: ApiConfig.headers,
        }
      )
      .pipe(
        map((res: DbConsult) => {
          if (res.error.errorMasseger != null) {
            this._alertService.alertInfinit(res.error.errorMasseger);
          }

          let response = res.obj.json;

          let ret: boolean = false;

          if (response != null) {
            let error = new ErrorMessage();
            error.message = response[0]["MESSAGE"];
            error.statuscode = response[0]["STATUSCODE"];
            error.error = response[0]["ERROR"];

            if (error.statuscode == 200) {
              this._alertService.alert(error.message);
              ret = true;
            } else {
              this._alertService.alertInfinit(error.error);
              ret = false;
            }
          }
          this.spinner.hide();
          return ret;
        })
      );
  }

  getBuscaSeparador(cd: number): Observable<Array<Separador>> {
    return this.http
      .post(
        ApiConfig.baseUrl,
        this.apontamentoProdutivoServiceJson.setJsonBuscaSeparador(cd),
        {
          headers: ApiConfig.headers,
        }
      )
      .pipe(
        map((res: DbConsult) => {
          if (res.error.errorMasseger != null) {
            this._alertService.alertInfinit(res.error.errorMasseger);
          }

          let separadores = res.obj.json as Separador[];

          return separadores;
        }),
        shareReplay(1)
      );
  }

  buscaApontamentoProdutivo(
    nrocd: number,
   // nroempresa: number,
    data: string
  ): Observable<AppontamentoProdutivo[]> {
    return this.http
      .post(
        ApiConfig.baseUrl,
        this.apontamentoProdutivoServiceJson.setJsonApontamentoProdutivo(
          nrocd,
         //nroempresa,
          data
        ),
        {
          headers: ApiConfig.headers,
        }
      )
      .pipe(
        map((res: DbConsult) => {
          if (res.error.errorMasseger != null) {
            this._alertService.alertInfinit(res.error.errorMasseger);
          } else {
            this._apontamento = res.obj.json as AppontamentoProdutivo[];
          }

          return this._apontamento;
        }),
        shareReplay(1),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  getApontamentoProdutivoId(seqapontamento): Observable<AppontamentoProdutivo> {
    return this.http
      .post(
        ApiConfig.baseUrl,
        this.apontamentoProdutivoServiceJson.setJsonApontamentoProdutivoId(
          seqapontamento
        ),
        {
          headers: ApiConfig.headers,
        }
      )
      .pipe(
        map((res: DbConsult) => {
          if (res.error.errorMasseger != null) {
            this._alertService.alertInfinit(res.error.errorMasseger);
          } else {
            return res.obj.json[0] as AppontamentoProdutivo;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  getApontamentoProdutivoSeparadorId(seqapontamento): Observable<Separador[]> {
    return this.http
      .post(
        ApiConfig.baseUrl,
        this.apontamentoProdutivoServiceJson.setJsonApontamentoProdutivoSepId(
          seqapontamento
        ),
        {
          headers: ApiConfig.headers,
        }
      )
      .pipe(
        map((res: DbConsult) => {
          if (res.error.errorMasseger != null) {
            this._alertService.alertInfinit(res.error.errorMasseger);
          } else {
            return res.obj.json as Separador[];
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deletar(id): any {
    this.spinner.show();
    return this.consult
      .post(this.apontamentoProdutivoServiceJson.setJsonDeletar(id), 0)
      .pipe(
        map((res: DbConsult) => {
          let ret: boolean = false;

          if (res.error.errorMasseger != null) {
            this._alertService.alert(res.error.errorMasseger);
          } else {
            if (res.obj.json.toString() != "") {
              let response = res.obj.json;

              if (response != null) {
                let error = new ErrorMessage();
                error.message = response[0]["MESSAGE"];
                error.statuscode = response[0]["STATUSCODE"];
                error.error = response[0]["ERROR"];

                if (error.statuscode == 200) {
                  this._alertService.alert(error.message);
                  ret = true;
                } else {
                  this._alertService.alertInfinit(error.error);
                  ret = false;
                }
              }
            }
          }
          this.spinner.hide();

          return ret;
        })
      );
  }
}
