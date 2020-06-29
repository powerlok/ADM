import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportaDDAItauRoutingModule } from './importa-dda-itau.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { ImportaDDAItauService } from './importa-dda-itau.service';
import { ImportaDDAItauComponent } from './importa-dda-itau.component';
import { ImportaDDAItauServiceJson } from './importa-dda-itau.service.json.js';
import { AppSharedModule } from '../../../shared';
import { DialogUploadComponent } from '../../../shared/components/dialog/dialog-upload/dialog-upload.component';
import { UploadModule } from '../../../shared/components/upload/upload.module';
import { UploadService } from '../../../shared/services/upload.service';

@NgModule({
  declarations: [ImportaDDAItauComponent],
  imports: [
    CommonModule,
    ImportaDDAItauRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  providers: [
    ImportaDDAItauService,
    ImportaDDAItauServiceJson,
    UploadService
  ]
})
export class ImportaDDAItauModule { }
