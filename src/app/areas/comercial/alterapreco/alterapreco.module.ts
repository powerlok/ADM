
import { CommonModule } from '@angular/common';
import { AlteraPrecoRoutingModule } from './alterapreco.routing.module';
import { AlteraPrecoComponent } from './alterapreco.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { AlteraPrecoService } from './alterapreco.service';
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';
import { ExcelService } from '../../../../app/shared/util/excel-service';
import { CurrencyFormat } from '../../../../app/shared/util/moeda';
import { DateFormat } from '../../../../app/shared/util/date-format';

@NgModule({
    declarations: [
        AlteraPrecoComponent
    ],
    imports: [
        CommonModule,
        AlteraPrecoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [AlteraPrecoService, ExcelService, CurrencyFormat, DateFormat],
})
export class AlteraPrecoModule { }
