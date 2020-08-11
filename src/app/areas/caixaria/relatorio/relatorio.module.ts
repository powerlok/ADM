
import { CommonModule } from '@angular/common';
import { RelatorioCaixaRoutingModule } from './relatorio.routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';
import { RelatorioCaixaComponent } from './relatorio.component';
<<<<<<< HEAD
import { DateAdapter } from '@angular/material';
=======
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
import { RelatorioCaixaService } from './relatorio.service';
import { CurrencyFormat } from '../../../shared/util/moeda';
import { EntradaSaidaCaixaService } from '../entrada_saida/entradasaida.service';
import { ExcelService } from '../../../shared/util/excel-service';
<<<<<<< HEAD

@NgModule({    
    declarations: [
        RelatorioCaixaComponent        
=======
import { DateAdapter } from '@angular/material/core';

@NgModule({
    declarations: [
        RelatorioCaixaComponent
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    ],
    imports: [
        CommonModule,
        RelatorioCaixaRoutingModule,
<<<<<<< HEAD
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule  
=======
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    ],
    exports: [],
    providers: [RelatorioCaixaService, CurrencyFormat, EntradaSaidaCaixaService, ExcelService],
})
<<<<<<< HEAD
export class RelatorioCaixaModule { 
=======
export class RelatorioCaixaModule {
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    constructor(private dateAdapter:DateAdapter<Date>) {
		this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
	}

}
