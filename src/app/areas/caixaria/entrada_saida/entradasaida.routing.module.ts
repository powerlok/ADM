import { EntradaSaidaCaixaComponent } from './entradasaida.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes = [
    {
        path: '',
        component: EntradaSaidaCaixaComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntradaSaidaCaixaRoutingModule { }