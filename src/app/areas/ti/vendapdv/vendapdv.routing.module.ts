import { VendaPdvComponent } from './vendapdv.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const Routes = [
    {
        path: '', component: VendaPdvComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
})
export class VendaPdvRoutingModule { }