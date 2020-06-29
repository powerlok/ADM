
import { CommonModule } from '@angular/common';
import { ConvenioFuncComponent } from './convenio-func.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { ConvenioFuncRoutingModule } from './convenio-func.routing.module';
import { ConvenioFuncService } from './convenio-func.service';

@NgModule({    
    declarations: [
        ConvenioFuncComponent
    ],
    imports: [
        CommonModule,
        ConvenioFuncRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule                
    ],
    exports: [],
    providers: [ConvenioFuncService],
})
export class ConvenioFuncModule { }
