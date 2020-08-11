import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CadastroFormFrotaComponent } from "./cadastro-form.component";
import { CadastroListaFrotaComponent } from "./cadastro-lista.component";
import { AuthGuard } from "../../../core/guard/auth.guard";
import { CadastroFrotaComponent } from "./cadastro.component";

const routes = [
    {
        path: '',
        component: CadastroFrotaComponent,
        children: [{
            path: '', redirectTo: 'lista', pathMatch: 'full'
        },
        {
            path: 'lista',
            component: CadastroListaFrotaComponent,
            canActivate: [AuthGuard]

        },
        {
            path: 'novo',
            component: CadastroFormFrotaComponent,
            canActivate: [AuthGuard]

        },
        {
            path: 'editar/:id/:un',
            component: CadastroFormFrotaComponent,
            canActivate: [AuthGuard]
        }]
        
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastroFrotaRoutingModule { }