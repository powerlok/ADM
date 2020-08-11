import { NgModule } from '@angular/core';
import { FaturaVivoComponent } from './faturavivo.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../material.module';
import { FaturaVivoService } from './faturavivo.service';
import { FaturaVivoRoutingModule } from './faturavivo.routing.module';
//import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({    
    declarations: [
        FaturaVivoComponent
    ],
    imports: [
        CommonModule,
        FaturaVivoRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule
       // MatFileUploadModule        
    ],
    exports: [],
    providers: [FaturaVivoService],
})
export class FaturaVivoModule { }
