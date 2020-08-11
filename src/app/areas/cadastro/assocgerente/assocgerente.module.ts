
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';
import { AssocGerenteComponent } from './assocgerente.component';
import { AssocGerenteRoutingModule } from './assocgerente.routing.module';
import { AssocGerenteService } from './assocgerente.service';
import { AssocGerenteServiceJson } from './assocgerente.service.json';

@NgModule({    
    declarations: [
        AssocGerenteComponent
    ],
    imports: [
        CommonModule,
        AssocGerenteRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule        
    ],
    exports: [],
    providers: [AssocGerenteService, AssocGerenteServiceJson],
})
export class AssocGerenteModule { }
