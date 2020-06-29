
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';
import { CadastroFormFrotaComponent } from './cadastro-form.component';
import { CadastroFrotaRoutingModule } from './cadastro.routing.module';
import { CadastroFrotaService } from './cadastro.service';
import { CadastroFrotaServiceJson } from './cadastro.service.json';
import { OrdenaArray } from '../../../shared/util/ordena-array';
import { CadastroListaFrotaComponent } from './cadastro-lista.component';
import { CadastroFrotaComponent } from './cadastro.component';
import { CadastroPopupRodizioFrotaComponent } from './cadastro-popup-rodizio-form.component';

@NgModule({   
    entryComponents: [CadastroPopupRodizioFrotaComponent], 
    declarations: [
        CadastroListaFrotaComponent,
        CadastroFormFrotaComponent,
        CadastroFrotaComponent,
        CadastroPopupRodizioFrotaComponent
    ],
    imports: [
        CommonModule,
        CadastroFrotaRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule        
    ],
    exports: [],
    providers: [CadastroFrotaService, CadastroFrotaServiceJson, OrdenaArray],
})
export class CadastroFrotaModule { }
