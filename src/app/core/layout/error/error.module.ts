
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { ErrorRoutingModule } from './error.routing.module';
import { ErrorsHandler } from './error-handler/error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErrorsInterceptor } from './error-interceptor/error-interceptor';

@NgModule({    
    declarations: [
        ErrorComponent
    ],
    imports: [
        CommonModule,
        ErrorRoutingModule,
        FormsModule, 
        ReactiveFormsModule,
        CustomMaterialModule,
    ],
    exports: [],
    providers: [
        {
          provide: ErrorHandler,
          useClass: ErrorsHandler,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ServerErrorsInterceptor,
          multi: true,
        },],
})
export class ErrorModule { }
