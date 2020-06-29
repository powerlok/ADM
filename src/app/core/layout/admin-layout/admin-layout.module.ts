import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { AdminLayoutRoutingModule } from './admin-layout.routing.module';

@NgModule({        
    declarations: [
        AdminLayoutComponent                
    ],        
    imports: [
        CommonModule,
        AdminLayoutRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule               
    ],
    exports: [],
    providers: []
})
export class AdminLayoutModule { }
