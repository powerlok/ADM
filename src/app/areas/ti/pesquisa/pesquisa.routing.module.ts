import { PesquisaComponent } from './pesquisa.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";


const routes = [
    {
        path: '',
        component: PesquisaComponent
      }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PesquisaRoutingModule { }