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
<<<<<<< HEAD
import { DateAdapter } from '@angular/material';
=======
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { DateFormat } from '../../../shared/util/date-format';
import { UploadService } from '../../../shared/services/upload.service';
<<<<<<< HEAD
@NgModule({    
=======
import { DateAdapter } from '@angular/material/core';
@NgModule({
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    declarations: [
        MicrosoftComponent,
        MicrosoftFormComponent,
        MicrosoftListaComponent
    ],
    imports: [
        CommonModule,
        MicrosoftRoutingModule,
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
    providers: [MicrosoftService, ExcelService, DateFormat, UploadService],
})
export class MicrosoftModule {
    constructor(private dateAdapter:DateAdapter<Date>) {
		this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
	}
 }
