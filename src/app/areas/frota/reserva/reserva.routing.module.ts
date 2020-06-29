import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../../../core/guard/auth.guard";
import { ReservaFrotaComponent } from "./reserva.component";
import { ReservaListaFrotaComponent } from "./reserva-lista.component";
import { ReservaFormFrotaComponent } from "./reserva-form.component";

const routes = [
    {
        path: '',
        component: ReservaFrotaComponent,
        children: [{
            path: '', redirectTo: 'lista', pathMatch: 'full'
        },
        {
            path: 'lista',
            component: ReservaListaFrotaComponent,
            canActivate: [AuthGuard]

        },
        {
            path: 'novo',
            component: ReservaFormFrotaComponent,
            canActivate: [AuthGuard]

        },
        {
            path: 'editar/:id',
            component: ReservaFormFrotaComponent,
            canActivate: [AuthGuard]
        }]
        
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReservaFrotaRoutingModule { }