
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../material.module";

<<<<<<< HEAD
@NgModule({    
=======
@NgModule({
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
<<<<<<< HEAD
        FormsModule, 
=======
        FormsModule,
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
        ReactiveFormsModule,
        CustomMaterialModule
    ],
    exports: [],
    providers: [],
})
export class LoginModule { }
