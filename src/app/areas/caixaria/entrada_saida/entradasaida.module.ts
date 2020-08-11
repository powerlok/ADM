
import { CommonModule } from '@angular/common';
import { EntradaSaidaCaixaRoutingModule } from './entradasaida.routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';
import { EntradaSaidaCaixaService } from './entradasaida.service';
import { EntradaSaidaCaixaComponent } from './entradasaida.component';
import { CadastroCaixariaService } from '../cadastro/cadastro.service';

@NgModule({    
    declarations: [
        EntradaSaidaCaixaComponent        
    ],
    imports: [
        CommonModule,
        EntradaSaidaCaixaRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [EntradaSaidaCaixaService, CadastroCaixariaService]
})
export class EntradaSaidaCaixaModule { }
