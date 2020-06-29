import { NgModule } from "@angular/core";
import { RegistroDevolucaoPDFComponent } from "./registrodevolucao-pdf.component";
import { CommonModule } from "@angular/common";
import { RegistroDevolucaoPDFRoutingModule } from "./registrodevolucao-pdf.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomMaterialModule } from "../../../../material.module";
import { NgxMaskModule } from "ngx-mask";
import { NgxCurrencyModule } from "ngx-currency";
import { EntradaSaidaCaixaService } from "../entradasaida.service";
import { PDFService } from "../../../../shared/util/pdf-service";
import { CadastroCaixariaService } from "../../cadastro/cadastro.service";


@NgModule({    
    declarations: [
        RegistroDevolucaoPDFComponent
    ],
    imports: [
        CommonModule,
        RegistroDevolucaoPDFRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule        
    ],
    exports: [],
    providers: [EntradaSaidaCaixaService, PDFService, CadastroCaixariaService],
})
export class RegistroDevolucaoPDFModule { }
