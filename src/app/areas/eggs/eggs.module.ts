
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask'
import {NgxCurrencyModule} from 'ngx-currency';
import { EggsComponent } from './eggs.component';
import { EggsRoutingModule } from './eggs.routing,module';

@NgModule({    
    declarations: [
        EggsComponent
    ],
    imports: [
        CommonModule,
        EggsRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    exports: [],
    providers: [],
})
export class EggsModule { }
