import { EstoquePorLoteComponent } from './estoqueporlote.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes = [
    {
        path: '',
        component: EstoquePorLoteComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EstoquePorLoteRoutingModule { }