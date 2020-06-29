
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';

import { OrdenaArray } from '../../../shared/util/ordena-array';
import { ListaCheckinFrotaComponent } from './lista-checkin.component';
import { ListaCheckinFrotaRoutingModule } from './lista-checkin.routing.module';
import { ListaCheckinFrotaServiceJson } from './lista-checkin.service.json';
import { ListaCheckinFrotaService } from './lista-checkin.service';
@NgModule({
    entryComponents: [],
    declarations: [
        ListaCheckinFrotaComponent
    ],
    imports: [
        CommonModule,
        ListaCheckinFrotaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule,
    ],
    exports: [],
    providers: [ListaCheckinFrotaService, ListaCheckinFrotaServiceJson, OrdenaArray],
})
export class ListaCheckinFrotaModule { }
