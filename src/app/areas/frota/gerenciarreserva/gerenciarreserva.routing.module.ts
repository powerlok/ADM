import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../../../core/guard/auth.guard";
import { GerenciarReservaFrotaComponent } from "./gerenciarreserva.component";
import { GerenciarReservaFormFrotaComponent } from "./gerenciarreserva-form.component";
import { GerenciarReservaListaFrotaComponent } from "./gerenciarreserva-lista.component";

const routes = [
    {
        path: '',
        component: GerenciarReservaFrotaComponent,
        children: [{
            path: '', redirectTo: 'lista', pathMatch: 'full'
        },
        {
            path: 'lista',
            component: GerenciarReservaListaFrotaComponent,
            canActivate: [AuthGuard]

        },
        {
            path: 'lista/:id',
            component: GerenciarReservaListaFrotaComponent,
            canActivate: [AuthGuard]

        }/*,
        {
            path: 'novo',
            component: GerenciarReservaFormFrotaComponent,
            canActivate: [AuthGuard]

        }*/,
        {
            path: 'editar/:id',
            component: GerenciarReservaFormFrotaComponent,
            canActivate: [AuthGuard]
        }]
        
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GerenciarReservaFrotaRoutingModule { }