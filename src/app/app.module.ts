
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { environment } from 'environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from "./material.module";
import { AppSharedModule } from "./shared";
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TokenStorage } from './shared/services/token-storage.service';
import { AppComponent } from './areas/app/app.component';
import { PIPES_COMPONENTS } from './shared/pipes/pipes.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AREAS_ENTRY, AREAS_COMPONENTS, AREAS_SERVICES } from './areas';
import { DateAdapter, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localePt, 'pt');

import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { AuthGuard } from './core/guard/auth.guard';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DateFormat } from './shared/util/date-format';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ErrorModule } from './core/layout/error/error.module';

@NgModule({
  declarations: [
    AppComponent,

    ...AREAS_COMPONENTS,
    ...PIPES_COMPONENTS
  ],
  entryComponents: [...AREAS_ENTRY],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpModule,
    CustomMaterialModule,
    AppRoutingModule,
    AppSharedModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgProgressModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgHttpLoaderModule,
    LoadingBarModule.forRoot(),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ErrorModule
  ],
  providers: [
    TokenStorage,
    ...AREAS_SERVICES,
    MomentDateAdapter,
    AuthGuard,
    { provide: DateAdapter, useClass: DateFormat },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    {
      provide: MAT_DATE_LOCALE,
      useValue: "pt-BR"
    },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    // { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}

