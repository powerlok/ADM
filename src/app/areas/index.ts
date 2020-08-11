import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
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

export const router: Routes = [
	{ path: 'admin', loadChildren: 'app/core/layout/admin-layout/admin-layout.module#AdminLayoutModule', canActivate: [AuthGuard] },
	{ path: '', loadChildren: 'app/areas/login/login.module#LoginModule', pathMatch: 'full' },
	{ path: "login", loadChildren: 'app/areas/login/login.module#LoginModule' },
	{ path: "**", loadChildren: 'app/core/layout/not-found/not-found.module#NotFoundModule' },
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
