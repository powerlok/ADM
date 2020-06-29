
import { CommonModule } from '@angular/common';
import { PesqConcorrenteRoutingModule } from './pesqconcorrente.routing.module';
import { PesqConcorrenteComponent } from './pesqconcorrente.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { PesqConcorrenteService } from './pesqconcorrente.services';
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';

@NgModule({    
    declarations: [
        PesqConcorrenteComponent
    ],
    imports: [
        CommonModule,
        PesqConcorrenteRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [PesqConcorrenteService],
})
export class PesqConcorrenteModule { }
