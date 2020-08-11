import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { Spinkit } from 'ng-http-loader';
import { fadeAnimation } from './app.animation';
import { Network } from '@ngx-pwa/offline';
import { NotConnectionComponent } from '../../core/layout/not-connection/not-connection.component';
import { AlertService } from '../../shared/services/alert.service';
import { GoogleAnalyticsEventsService } from '../../shared/services/google-analytics-events.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Subscription } from 'rxjs';
import { AlertSimpleSnackComponent } from '../../shared/components/snack/alert-simple/alert-simple.component';
<<<<<<< HEAD
=======
//declare let ga: any;
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnDestroy{
<<<<<<< HEAD
  public spinkit = Spinkit; 
=======
  public spinkit = Spinkit;
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
  navigationSubscription : Array<Subscription> = [];

  constructor(public router: Router, private alertService: AlertService, protected network: Network, private notificationService: NotificationService, public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }

    this.navigationSubscription.push(this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    }));

    this.navigationSubscription.push(
      this.notificationService
      .notification$
      .subscribe(message => {
        if (message != null) {
          if (message == "NET") {
            this.alertService.alertComponent(NotConnectionComponent);
          } else {
            this.alertService.alertCustomComponent(AlertSimpleSnackComponent, message, 30000);
          }
        }
      }));

    //verifica conexao internet
    this.navigationSubscription.push(this.network.onlineChanges.subscribe(x => {  //console.log('tesete : ' + x);
      if (!x) {
        this.alertService.alertComponent(NotConnectionComponent);
      } else {
        this.alertService.closeAlert();
      }
    }));


    //Google Analytics
<<<<<<< HEAD
    this.router.events.subscribe(event => {
=======
  /*  this.router.events.subscribe(event => {
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
<<<<<<< HEAD
    });

  }
  
  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }  
  

  ngOnDestroy() {
    this.navigationSubscription.forEach(x => {
      if (x) {  
        x.unsubscribe();
      }
    });
    
  }

}   
=======
    });*/

  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }


  ngOnDestroy() {
    this.navigationSubscription.forEach(x => {
      if (x) {
        x.unsubscribe();
      }
    });

  }

}
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
