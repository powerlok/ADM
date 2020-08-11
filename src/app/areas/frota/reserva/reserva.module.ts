
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { NgxMaskModule } from 'ngx-mask'
import { NgxCurrencyModule } from 'ngx-currency';
import { ReservaFrotaService } from './reserva.service';
import { OrdenaArray } from '../../../shared/util/ordena-array';
import { ReservaFrotaComponent } from './reserva.component';
import { ReservaFrotaRoutingModule } from './reserva.routing.module';
import { ReservaListaFrotaComponent } from './reserva-lista.component';
import { ReservaFrotaServiceJson } from './reserva.service.json';
import { SmdFabSpeedDialActions, SmdFabSpeedDialComponent, SmdFabSpeedDialTrigger } from '../../../shared/components/speeddial/fab-speed-dial';
import { ReservaFormFrotaComponent } from './reserva-form.component';
import { DateAdapter } from '@angular/material';
import { CadastroFrotaService } from '../cadastro/cadastro.service';
import { CadastroFrotaServiceJson } from '../cadastro/cadastro.service.json';
import { DateFormat } from '../../../shared/util/date-format';
import { AlertRodizioComponent } from './popup/alert-rodizio.component';
import { AppSharedModule } from '../../../shared';

@NgModule({
    entryComponents: [AlertRodizioComponent],
    declarations: [
        ReservaFrotaComponent,
        ReservaListaFrotaComponent,
        ReservaFormFrotaComponent,
        AlertRodizioComponent,
        SmdFabSpeedDialTrigger,
        SmdFabSpeedDialActions,
        SmdFabSpeedDialComponent
    ],
    imports: [
        CommonModule,
        ReservaFrotaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule,
        AppSharedModule
    ],
    exports: [
        SmdFabSpeedDialTrigger,
        SmdFabSpeedDialActions,
        SmdFabSpeedDialComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ReservaFrotaService, ReservaFrotaServiceJson, OrdenaArray, CadastroFrotaServiceJson, CadastroFrotaService, DateFormat],
})
export class ReservaFrotaModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
    }

}
