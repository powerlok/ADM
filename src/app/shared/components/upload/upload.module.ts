import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UploadComponent } from './upload.component';
import { UploadService } from '../../services/upload.service';
import { DialogUploadComponent } from '../dialog/dialog-upload/dialog-upload.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        FlexLayoutModule,
        HttpClientModule,
    ],
    declarations: [UploadComponent, DialogUploadComponent],
    exports: [UploadComponent],
    entryComponents: [DialogUploadComponent], // Add the DialogComponent as entry component
    providers: [UploadService],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UploadModule { }