
import { CommonModule } from '@angular/common';
import { RelatorioCaixaRoutingModule } from './relatorio.routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';
import { RelatorioCaixaComponent } from './relatorio.component';
import { DateAdapter } from '@angular/material';
import { RelatorioCaixaService } from './relatorio.service';
import { CurrencyFormat } from '../../../shared/util/moeda';
import { EntradaSaidaCaixaService } from '../entrada_saida/entradasaida.service';
import { ExcelService } from '../../../shared/util/excel-service';

@NgModule({
    declarations: [
        RelatorioCaixaComponent
    ],
    imports: [
        CommonModule,
        RelatorioCaixaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [RelatorioCaixaService, CurrencyFormat, EntradaSaidaCaixaService, ExcelService],
})
export class RelatorioCaixaModule {
    constructor(private dateAdapter:DateAdapter<Date>) {
		this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
	}

}
