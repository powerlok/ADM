import { ContabilizaFolhaComponent } from './contabilizafolha.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes = [
    {
        path: '',
        component: ContabilizaFolhaComponent
      }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContabilizaFolhaRoutingModule { }