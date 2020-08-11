import { throwError as observableThrowError, Observable, of, pipe, throwError, Subject } from 'rxjs';

import { catchError, map, tap, switchMap, retry, shareReplay } from 'rxjs/operators';
import { Response } from "@angular/http";
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { ErrorsHandler } from '../../core/layout/error/error-handler/error-handler';
import "rxjs/add/operator/retry";
import { NotificationService } from './notification.service';
import { SpinnerVisibilityService } from '../../../../node_modules/ng-http-loader';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class ConsultAPIService {
    private body: any;
    public token: string;
    public retry: number;
    URLBASE = "http://adm.redeoba.com.br";

    APIURLBASE = "https://api.redeoba.com.br";
    //APIURLBASE = "http://localhost:56547";

    URL =  this.APIURLBASE +'/api/values';
    URLUpload = this.APIURLBASE + '/api/upload';

    APITeste = "http://localhost:56547/api/values";
    APIUploadTeste = "http://localhost:56547/api/upload";

    constructor(private http: HttpClient,
        private alertService: AlertService,
        protected notification: NotificationService,
        protected errorsHandler: ErrorsHandler,
        private spinner: SpinnerVisibilityService) {

    }

    post(jsonConsult: string, retry: number): Observable<object> {
        this.alertService.closeAlert();
        this.body = jsonConsult;
        return this.http.post(this.URL, this.body, httpOptions)
            .pipe(
                map((res: Response) => {
                    let json = res as object;
                    return json || {};
                }),
                shareReplay(1),/*,
                catchError(error => { console.log(error) return error;})*/
            );
    }

    getToken(Token: any, logout: any): Observable<any> {
        return this.http.post(this.URLBASE, { Token })
            .pipe(catchError(() => logout));
    }


    upload(files: Set<File>, caminho: string):  { [key: string]: Observable<number> } {

        const status = {};

        files.forEach(file => {

            const formdata: FormData = new FormData();
            formdata.append('file', file, file.name);
            // formdata.append('caminho', caminho, 'caminho');

            const req = new HttpRequest('POST', this.URLUpload, formdata, {
                reportProgress: true
            });

            const progress = new Subject<number>();

            this.http.request(req).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {

                    // calculate the progress percentage
                    const percentDone = Math.round(100 * event.loaded / event.total);

                } else if (event instanceof HttpResponse) {

                    // Close the progress-stream if we get an answer form the API
                    // The upload is complete
                    progress.complete();
                }


                status[file.name] = {
                    progress: progress.asObservable()
                };
            });

        });

        return status;

    }


    /* private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Serviço não localizado.';

        return observableThrowError(errMsg);
    }*/

    private handleError(error: Response | any) {
        this.spinner.hide();
        //let errMsg: string;
        //this.errorsHandler.handleError(error);
        //this.spinner.hide();

        /* if(error instanceof Response){
             const body = error.json() || '';
             const err = body.error || JSON.stringify(body);
             errMsg = `${error.status} - ${error.statusText || '' } ${err}`;
         }else{
             errMsg = error.message ? error.message : error.toString();
         }*/

        // Log the error anyway
        //  console.log(errMsg);
        return observableThrowError(null);
    }

}
