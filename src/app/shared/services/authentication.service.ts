import { Injectable, Component, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, of, Subscribable, Subscription } from 'rxjs';
import { ConsultAPIService } from './consultapi.service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { TokenStorage } from './token-storage.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Login, Usuario } from '../models/Usuario';

@Injectable()
export class AuthenticationService implements OnDestroy {
    loginRoute: any[];
    defaultUrl: string;
    private _login: Login;
    private _user: Usuario;
    private _subscriptions: Array<Subscription> = [];

    constructor(private router: Router, private alertService: AlertService, private tokenStorage: TokenStorage, private consultAPIService: ConsultAPIService, private loadingBar: LoadingBarService) {

    }

    login(chapa, senha, url) {
        this.loadingBar.start();
        this._user = new Usuario();
        this._user.senha = senha;
        this._user.chapa = chapa;
        this._user.sequnidade = "0";
        this._login = new Login();
        this._login.registraLogin = "N";
        this._login.usuario = this._user;
        //let isSubmitted: boolean = false;
        //console.log(JSON.stringify(this._login));
        this._subscriptions.push(this.consultAPIService.post(JSON.stringify(this._login), 3)
            .subscribe((user: Usuario) => {
                 this._user = user as Usuario;
              
                if (this._user.sequsuario > 0 && this._user.seqpessoa > 0) {
                    this.tokenStorage.setAccessToken(JSON.stringify(this._user));
                  
                    if (url != "/") {
                        this.router.navigate([decodeURI(url)]);
                    } else {
                        this.router.navigate(["admin"]);
                    }
                } else {
                    this.alertService.alert("Chapa ou Senha inválida.");
                }
                this.loadingBar.complete();
            }));

        //return isSubmitted;
    };

    logout() {
        localStorage.removeItem('ObaUser');
    }

    getUserInfo(): Observable<string> {
        return this.tokenStorage.getAccessToken();
    }

    redirectLogin() {
        this.router.navigate(["login"]);
    }

    ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this._subscriptions.forEach(x => {
		x.unsubscribe();
		});
    }
}
