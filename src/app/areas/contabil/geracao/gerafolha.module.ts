
import { CommonModule } from '@angular/common';
import { GeraFolhaRoutingModule } from './gerafolha.routing.module';
import { GeraFolhaComponent } from './gerafolha.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { GeraFolhaService } from './gerafolha.service';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { DateAdapter } from '@angular/material/core';

@NgModule({
    declarations: [
        GeraFolhaComponent
    ],
    imports: [
        CommonModule,
        GeraFolhaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [GeraFolhaService]
})
export class GeraFolhaModule {

    constructor(private dateAdapter:DateAdapter<Date>) {
		this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
	}
 }
