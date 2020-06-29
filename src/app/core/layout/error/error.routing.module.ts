import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ErrorComponent } from './error.component';

const routes = [
    {
        path: '',
        component: ErrorComponent
      }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorRoutingModule { }