import { ApontamentoProdutivoListaComponent } from './lista/apontamentoprodutivo-lista.component';
import { NgModule } from '@angular/core';
import { ApontamentoProdutivoRoutingModule } from './apontamentoprodutivo.routing.module';
import { ApontamentoProdutivoComponent } from './apontamentoprodutivo.component';
import { ApontamentoProdutivoFormComponent } from './cadastro/apontamentoprodutivo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { ApontamentoProdutivoService } from './apontamentoprodutivo.service';
import { ExcelService } from '../../../shared/util/excel-service';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { DateFormat } from '../../../shared/util/date-format';
import { UploadService } from '../../../shared/services/upload.service';
import { DateAdapter } from '@angular/material/core';
import { ApontamentoProdutivoServiceJson } from './apontamentoprodutivo.service.json';
import { Utils } from 'app/shared/util/utils';
@NgModule({
    declarations: [
        ApontamentoProdutivoComponent,
        ApontamentoProdutivoFormComponent,
        ApontamentoProdutivoListaComponent
    ],
    imports: [
        CommonModule,
        ApontamentoProdutivoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [ApontamentoProdutivoService, ApontamentoProdutivoService, ApontamentoProdutivoServiceJson, ExcelService, DateFormat, Utils],
})
export class ApontamentoProdutivoModule {
    constructor(private dateAdapter:DateAdapter<Date>) {
		this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
	}
 }
