
import { CommonModule } from '@angular/common';
import { EstoquePorLoteRoutingModule } from './estoqueporlote.routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';
import { Utils } from '../../../shared/util/utils';
import { AlteraPrecoService } from '../alterapreco/alterapreco.service';
import { EstoquePorLoteService } from './estoqueporlote.service';
import { EstoquePorLoteComponent } from './estoqueporlote.component';
import { CurrencyFormat } from '../../../../app/shared/util/moeda';

@NgModule({
    declarations: [
        EstoquePorLoteComponent
    ],
    imports: [
        CommonModule,
        EstoquePorLoteRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [EstoquePorLoteService, AlteraPrecoService, Utils, CurrencyFormat],
})
export class EstoquePorLoteModule { }
