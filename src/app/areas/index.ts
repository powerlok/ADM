import { Routes, RouterModule } from "@angular/router";
import { UserService } from "../shared/services/user.service";
import { AuthenticationService } from "../shared/services/authentication.service";
import { ConsultAPIService } from "../shared/services/consultapi.service";
import { ValidationErrorService } from "../shared/services/validation-error.service";
import { AlertService } from "../shared/services/alert.service";
import { AuthGuard } from "../core/guard/auth.guard";
import { DateOracle } from "../shared/util/date-format";
import { GoogleAnalyticsEventsService } from "../shared/services/google-analytics-events.service";
import { ErrorsHandler } from "../core/layout/error/error-handler/error-handler";
import { NotificationService } from "../shared/services/notification.service";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { NotConnectionComponent } from "../core/layout/not-connection/not-connection.component";
import { AlertSimpleSnackComponent } from "../shared/components/snack/alert-simple/alert-simple.component";
import { ModuleWithProviders } from '@angular/compiler/src/core';

export const router: Routes = [
	{ path: 'admin', loadChildren: () => import('../../app/core/layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule), canActivate: [AuthGuard] },
	{ path: '', loadChildren: () => import('../../app/areas/login/login.module').then(m => m.LoginModule), pathMatch: 'full' },
	{ path: "login", loadChildren: () => import('../../app/areas/login/login.module').then(m => m.LoginModule) },
	{ path: "**", loadChildren: () => import('../../app/core/layout/not-found/not-found.module').then(m => m.NotFoundModule) },
	//
	{path: '**', redirectTo: ''}
];

export const AREAS_ROUTES: ModuleWithProviders = RouterModule.forRoot(router, { useHash: true});

export const AREAS_COMPONENTS = [NotConnectionComponent, AlertSimpleSnackComponent];

export const AREAS_ENTRY = [NotConnectionComponent, AlertSimpleSnackComponent];

export const AREAS_SERVICES = [
	UserService,
	AuthenticationService,
	ConsultAPIService,
	ValidationErrorService,
	AlertService,
	DateOracle,
	GoogleAnalyticsEventsService,
	NotificationService,
	ErrorsHandler,
	LoadingBarService,
];
