
import { CommonModule } from '@angular/common';
import { CadastroCaixariaRoutingModule } from './cadastro.routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';
import { CadastroCaixariaService } from './cadastro.service';
import { CadastroCaixariaComponent } from './cadastro.component';

@NgModule({    
    declarations: [
        CadastroCaixariaComponent
    ],
    imports: [
        CommonModule,
        CadastroCaixariaRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule        
    ],
    exports: [],
    providers: [CadastroCaixariaService],
})
export class CadastroCaixariaModule { }
