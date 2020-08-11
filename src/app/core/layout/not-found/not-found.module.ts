
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { NotFoundRoutingModule } from './not-found.routing.module';

@NgModule({    
    declarations: [
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        NotFoundRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
    ],
    exports: [],
    providers: [],
})
export class NotFoundModule { }
