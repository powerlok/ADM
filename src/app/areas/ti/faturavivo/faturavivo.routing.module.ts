import { FaturaVivoComponent } from './faturavivo.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";


const routes = [
    {
        path: '',
        component: FaturaVivoComponent
      }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FaturaVivoRoutingModule { }