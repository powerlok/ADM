import { PesqConcorrenteComponent } from './pesqconcorrente.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes = [
    {
        path: '',
        component: PesqConcorrenteComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PesqConcorrenteRoutingModule { }