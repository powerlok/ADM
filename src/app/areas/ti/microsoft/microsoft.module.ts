import { MicrosoftListaComponent } from './microsoft-lista.component';
import { NgModule } from '@angular/core';
import { MicrosoftRoutingModule } from './microsoft.routing.module';
import { MicrosoftComponent } from './microsoft.component';
import { MicrosoftFormComponent } from './microsoft-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { MicrosoftService } from './microsoft.service';
import { ExcelService } from '../../../shared/util/excel-service';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { DateFormat } from '../../../shared/util/date-format';
import { UploadService } from '../../../shared/services/upload.service';
import { DateAdapter } from '@angular/material/core';
@NgModule({
    declarations: [
        MicrosoftComponent,
        MicrosoftFormComponent,
        MicrosoftListaComponent
    ],
    imports: [
        CommonModule,
        MicrosoftRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [MicrosoftService, ExcelService, DateFormat, UploadService],
})
export class MicrosoftModule {
    constructor(private dateAdapter:DateAdapter<Date>) {
		this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
	}
 }
