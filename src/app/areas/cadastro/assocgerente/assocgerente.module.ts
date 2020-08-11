
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

<<<<<<< HEAD
@NgModule({    
=======
@NgModule({
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    declarations: [
        AssocGerenteComponent
    ],
    imports: [
        CommonModule,
        AssocGerenteRoutingModule,
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
    providers: [AssocGerenteService, AssocGerenteServiceJson],
})
export class AssocGerenteModule { }
