import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppInfoService } from "./app-info.service";
import { AlertConfirmComponent } from './components/dialog/alert-confirm/alert-confirm.component';
import { CustomMaterialModule } from "../material.module";
import { ProdutoService } from "./services/produto/produto.service";
import { ProdutoJson } from "./services/produto/produto.json";

@NgModule({
  entryComponents: [
    AlertConfirmComponent  
  ],
  exports:[],
  providers: [
      AppInfoService, 
      ProdutoService,
      ProdutoJson     
    ],
  declarations: [
    AlertConfirmComponent
  ],
  imports: [CustomMaterialModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSharedModule {

}
