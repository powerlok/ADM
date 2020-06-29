import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RegistroDevolucaoPDFComponent } from "./registrodevolucao-pdf.component";

const routes = [
    {
        path: ':id/:tipo',
        component: RegistroDevolucaoPDFComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistroDevolucaoPDFRoutingModule { }