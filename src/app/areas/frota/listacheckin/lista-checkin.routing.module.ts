import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListaCheckinFrotaComponent } from "./lista-checkin.component";

const routes = [
    {
        path: '',
        component: ListaCheckinFrotaComponent
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaCheckinFrotaRoutingModule { }