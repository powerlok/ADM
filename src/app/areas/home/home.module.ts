
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../material.module";

@NgModule({    
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
    ],
    exports: [],
    providers: [],
})
export class HomeModule { }
