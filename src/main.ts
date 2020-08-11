import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, LOCALE_ID } from '@angular/core';
import { environment } from 'environments/environment';
import { AppModule } from 'app/app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{provide: LOCALE_ID, useValue: 'pt' }]
});
/*
platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
    if ('serviceWorker' in navigator && environment.production) {
        navigator.serviceWorker.register('/ngsw-worker.js');
    }
}).catch(err => console.log(err));*/
