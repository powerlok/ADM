import { NgModule } from '@angular/core';
import { PesquisaComponent } from './pesquisa.component';
import { PesquisaRoutingModule } from './pesquisa.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../material.module';
import { PesquisaService } from './pesquisa.service';
import { CurrencyFormatPipe } from '../../../shared/pipes/moeda.component';
import { CurrencyFormat } from '../../../shared/util/moeda';

@NgModule({    
    declarations: [
        PesquisaComponent,
        CurrencyFormatPipe
    ],
    imports: [
        CommonModule,
        PesquisaRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule        
    ],
    exports: [],
    providers: [PesquisaService, CurrencyFormat],
})
export class PesquisaModule { }
