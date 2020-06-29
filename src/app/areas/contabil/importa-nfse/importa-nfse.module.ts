import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportaNfseRoutingModule } from './importa-nfse.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from "../../../material.module";
import { ImportaNfseService } from './importa-nfse.service';
import { ProdutoService } from '../../../shared/services/produto/produto.service';
import { ImportaNfseComponent } from './importa-nfse.component';
import { ImportaNFseServiceJson } from './importa-nfse.service.json';
import { EstoquePorLoteService } from '../../comercial/estoqueporlote/estoqueporlote.service';
import { AppSharedModule } from '../../../shared';
import { DialogUploadComponent } from '../../../shared/components/dialog/dialog-upload/dialog-upload.component';
import { UploadModule } from '../../../shared/components/upload/upload.module';
import { UploadService } from '../../../shared/services/upload.service';

@NgModule({
  declarations: [ImportaNfseComponent],
  imports: [
    CommonModule,
    ImportaNfseRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  providers: [
    ImportaNfseService,
    ProdutoService,
    EstoquePorLoteService,
    ImportaNFseServiceJson,
    UploadService
  ]
})
export class ImportaNfseModule { }
