
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ImportaDDAItauComponent } from "./importa-dda-itau.component";

const routes = [
    {
        path: '',
        component: ImportaDDAItauComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportaDDAItauRoutingModule { }