import { TelefoniaListaComponent } from './telefonia-lista.component';
import { NgModule } from '@angular/core';
import { TelefoniaRoutingModule } from './telefonia.routing.module';
import { TelefoniaComponent } from './telefonia.component';
import { TelefoneFormComponent } from './telefonia-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { TelefoniaService } from './telefonia.service';
import { ExcelService } from '../../../shared/util/excel-service';
import { DateAdapter } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { DateFormat } from '../../../shared/util/date-format';
import { UploadService } from '../../../shared/services/upload.service';
@NgModule({
    declarations: [
        TelefoniaComponent,
        TelefoneFormComponent,
        TelefoniaListaComponent
    ],
    imports: [
        CommonModule,
        TelefoniaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [TelefoniaService, ExcelService, DateFormat, UploadService],
})
export class TelefoniaModule {
    constructor(private dateAdapter:DateAdapter<Date>) {
		this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
	}
 }
