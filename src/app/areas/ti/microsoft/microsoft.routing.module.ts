import { MicrosoftComponent } from './microsoft.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MicrosoftListaComponent } from './microsoft-lista.component';
import { MicrosoftFormComponent } from './microsoft-form.component';
import { AuthGuard } from '../../../core/guard/auth.guard';

const Routes = [
    {
        path: '', component: MicrosoftComponent, children: [{
                                                                path: '', redirectTo: 'lista', pathMatch: 'full'
                                                            },
                                                            {
                                                                path: 'lista',
                                                                component: MicrosoftListaComponent,
                                                                canActivate: [AuthGuard],

                                                            },
                                                            {
                                                                path: 'lista/:un/:auditar/:demitido',
                                                                component: MicrosoftListaComponent,
                                                                canActivate: [AuthGuard],

                                                            },
                                                            {
                                                                path: 'novo',
                                                                component: MicrosoftFormComponent,
                                                                canActivate: [AuthGuard]
                                                            },
                                                            {
                                                                path: 'editar/:id/:auditar/:demitido',
                                                                component: MicrosoftFormComponent,
                                                                canActivate: [AuthGuard]
                                                            }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
})
export class MicrosoftRoutingModule { }