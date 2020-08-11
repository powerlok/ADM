import { ApontamentoProdutivoComponent } from './apontamentoprodutivo.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ApontamentoProdutivoListaComponent } from './lista/apontamentoprodutivo-lista.component';
import { ApontamentoProdutivoFormComponent } from './cadastro/apontamentoprodutivo-form.component';
import { AuthGuard } from '../../../core/guard/auth.guard';

const Routes = [
    {
        path: '', component: ApontamentoProdutivoComponent, children: [{
                                                                path: '', redirectTo: 'lista', pathMatch: 'full'
                                                            },
                                                            {
                                                                path: 'lista',
                                                                component: ApontamentoProdutivoListaComponent,
                                                                canActivate: [AuthGuard],

                                                            },
                                                            {
                                                                path: 'lista/:nrocd/:data',
                                                                component: ApontamentoProdutivoListaComponent,
                                                                canActivate: [AuthGuard],

                                                            },
                                                            {
                                                                path: 'novo/:nrocd/:data',
                                                                component: ApontamentoProdutivoFormComponent,
                                                                canActivate: [AuthGuard]
                                                            },
                                                            {
                                                                path: 'editar/:id/:nroempresa/:nrocd/:data',
                                                                component: ApontamentoProdutivoFormComponent,
                                                                canActivate: [AuthGuard]
                                                            }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
})
export class ApontamentoProdutivoRoutingModule { }
