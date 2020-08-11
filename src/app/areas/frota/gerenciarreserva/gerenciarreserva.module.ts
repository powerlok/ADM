
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { NgxMaskModule } from 'ngx-mask'
import { NgxCurrencyModule } from 'ngx-currency';
import { OrdenaArray } from '../../../shared/util/ordena-array';
import { SmdFabSpeedDialActions, SmdFabSpeedDialComponent, SmdFabSpeedDialTrigger } from '../../../shared/components/speeddial/fab-speed-dial';
<<<<<<< HEAD
import { DateAdapter } from '@angular/material';
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
import { CadastroFrotaService } from '../cadastro/cadastro.service';
import { CadastroFrotaServiceJson } from '../cadastro/cadastro.service.json';
import { DateFormat } from '../../../shared/util/date-format';
import { GerenciarReservaFrotaComponent } from './gerenciarreserva.component';
import { AlertRodizioComponent } from '../reserva/popup/alert-rodizio.component';
import { ReservaFrotaService } from '../reserva/reserva.service';
import { GerenciarReservaFrotaRoutingModule } from './gerenciarreserva.routing.module';
import { GerenciarReservaFormFrotaComponent } from './gerenciarreserva-form.component';
import { ReservaFrotaServiceJson } from '../reserva/reserva.service.json';
import { GerenciarReservaListaFrotaComponent } from './gerenciarreserva-lista.component';
import { ReservaFrotaModule } from '../reserva/reserva.module';
import { GerenciarReservaFrotaServiceJson } from './gerenciarreserva.service.json';
import { GerenciareservaFrotaService } from './gerenciarreserva.service';
<<<<<<< HEAD
=======
import { DateAdapter } from '@angular/material/core';
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

@NgModule({
    entryComponents: [AlertRodizioComponent],
    declarations: [
        GerenciarReservaFrotaComponent,
        GerenciarReservaListaFrotaComponent,
<<<<<<< HEAD
        GerenciarReservaFormFrotaComponent        
=======
        GerenciarReservaFormFrotaComponent
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    ],
    imports: [
        CommonModule,
        GerenciarReservaFrotaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule,
        ReservaFrotaModule
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ReservaFrotaService, ReservaFrotaServiceJson, OrdenaArray, CadastroFrotaServiceJson, CadastroFrotaService, DateFormat, GerenciarReservaFrotaServiceJson, GerenciareservaFrotaService],
})
export class GerenciarReservaFrotaModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('pt-br'); // DD/MM/YYYY
    }

}
