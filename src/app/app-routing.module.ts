import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AREAS_ROUTES } from "./areas";



@NgModule({
	imports: [AREAS_ROUTES],
	exports: [RouterModule],
})
export class AppRoutingModule {

	
}
