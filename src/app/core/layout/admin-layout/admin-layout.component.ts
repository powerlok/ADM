import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';


import { Usuario } from '../../../shared/models/Usuario';
import { Modulo } from '../../../shared/models/Modulo';
import { UserService } from '../../../shared/services/user.service';
import { AlertService } from '../../../shared/services/alert.service';
import { fadeAnimation } from '../../../areas/app/app.animation';
import { GoogleAnalyticsEventsService } from '../../../shared/services/google-analytics-events.service';
import { NavigationEnd, Router } from '@angular/router';
import { Network } from '@ngx-pwa/offline';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  animations: [fadeAnimation]
})
export class AdminLayoutComponent implements OnInit {
  mobileQuery: MediaQueryList;
  _user: Usuario;
  chapa: string;
  nome: string;
  funcao: string;
  modulo: Modulo[];
  src: string;
  // mostrarMenu: boolean = false;

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  private _mobileQueryListener: () => void;

  fillerNav = Array(50).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private userService: UserService, public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService, protected network: Network, private alertService: AlertService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.modulo = new Array<Modulo>();

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this._user = this.userService.getUserModels();
    this.chapa = this._user.chapa;
    this.nome = this._user.nome;
    this.funcao = this._user.funcao;
    this.src = (this._user.foto != null && this._user.foto != '') ? 'data:image/jpg;base64,' + this._user.foto : "/assets/img/user.jpg";

    this.googleAnalyticsEventsService.emitEvent("Usuário Logado", this.nome, "Ativo", 1);

    this.modulo = this._user.modulosPermitidos.filter(x => x.mostraradm === 'S').filter(app => app.appsPermitidas.filter(a => a.mostrar == 'W'));
  }

  logout() {
    this.userService.logout();
  }
  
  closeAlert() {
    this.alertService.closeAlert();
  }

}

