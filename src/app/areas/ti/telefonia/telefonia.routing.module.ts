import { TelefoniaComponent } from './telefonia.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TelefoniaListaComponent } from './telefonia-lista.component';
import { TelefoneFormComponent } from './telefonia-form.component';
import { AuthGuard } from '../../../core/guard/auth.guard';

const Routes = [
    {
        path: '', component: TelefoniaComponent, children: [{
                                                                path: '', redirectTo: 'lista', pathMatch: 'full'
                                                            },
                                                            {
                                                                path: 'lista',
                                                                component: TelefoniaListaComponent,
                                                                canActivate: [AuthGuard],

                                                            },
                                                            {
                                                                path: 'lista/:un/:auditar/:demitido',
                                                                component: TelefoniaListaComponent,
                                                                canActivate: [AuthGuard],

                                                            },
                                                            {
                                                                path: 'novo',
                                                                component: TelefoneFormComponent,
                                                                canActivate: [AuthGuard]
                                                            },
                                                            {
                                                                path: 'editar/:id/:auditar/:demitido',
                                                                component: TelefoneFormComponent,
                                                                canActivate: [AuthGuard]
                                                            }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
})
export class TelefoniaRoutingModule { }