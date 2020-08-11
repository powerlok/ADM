
import { CommonModule } from '@angular/common';
import { ContabilizaFolhaRoutingModule } from './contabilizafolha.routing.module';
import { ContabilizaFolhaComponent } from './contabilizafolha.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { ContabilizacaoService } from './contabilizafolha.service';

@NgModule({    
    declarations: [
        ContabilizaFolhaComponent
    ],
    imports: [
        CommonModule,
        ContabilizaFolhaRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule
    ],
    exports: [],
    providers: [ContabilizacaoService],
})
export class ContabilizaFolhaModule { }
