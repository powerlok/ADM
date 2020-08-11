
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ImportaNfseComponent } from "./importa-nfse.component";

const routes = [
    {
        path: '',
        component: ImportaNfseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportaNfseRoutingModule { }