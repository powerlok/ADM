import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendaPdvComponent } from './vendapdv.component';
import { CustomMaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { VendaPdvRoutingModule } from './vendapdv.routing.module';
import { VendaPdvService } from './vendapdv.service';
import {NgxCurrencyModule} from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyFormat } from '../../../shared/util/moeda';
import { ExcelService } from '../../../shared/util/excel-service';
import { DateAdapter } from '@angular/material/core';

@NgModule({
    declarations: [
        VendaPdvComponent
    ],
    imports: [
        CommonModule,
        VendaPdvRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [
        CurrencyFormat,
        VendaPdvService,
        ExcelService
    ],
})
export class VendaPdvModule {

    constructor(private dateAdapter:DateAdapter<Date>) {
		this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
	}
}
