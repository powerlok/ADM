import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { Empresa } from '../../../shared/models/Empresa';
import { Unidade } from '../../../shared/models/Unidade';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { Params } from '@angular/router';
import { RodarJson } from '../../../shared/models/RodarJson';
import { ImportaNfseService } from './importa-nfse.service';
import { ProdMonitorado } from '../../../shared/models/Produto';
import { Select } from '../../../shared/models/Components';
import { EstoquePorLoteService } from '../../comercial/estoqueporlote/estoqueporlote.service';
import { ValidationErrorService } from '../../../shared/services/validation-error.service';
import { UploadService } from '../../../shared/services/upload.service';

@Component({
  selector: 'app-importa-nfse',
  templateUrl: './importa-nfse.component.html',
  styleUrls: ['./importa-nfse.component.scss']
})
export class ImportaNfseComponent implements OnInit, OnDestroy {

  form : FormGroup;
  empresas              : Array<Empresa> = [];
  unidades              : Array<Unidade> = [];
  _subscriptions        : Array<Subscription> = [];
  produtoOpt            : ProdMonitorado[];
  selectedFile          : File;
  cgoLista              : Array<Select>  = [];
  progress;
  lista                 : Array<string>;
  sequnidade            : number = 6;

  @ViewChild('file') file;
    public files: Set<File>;

  constructor(private fb                  : FormBuilder,
              private user                : UserService,
              private importaNFSeService  : ImportaNfseService,
              private estoquePorLoteServ  : EstoquePorLoteService,
              private validError          : ValidationErrorService,
              public uploadService: UploadService) {

    this.unidades = this.user.getUnidadePerm();


    this.form = this.fb.group({

      arquivo		      : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
      cgo   		      : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
      descricao			  : new FormControl({disabled: true, value: ''}, [Validators.nullValidator/*, Validators.minLength(3)*/]),
      codigo    		  : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
      nroempresa	      : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
     // sequnidade		  : new FormControl('', [Validators.nullValidator/*, Validators.minLength(3)*/]),
		});
  }


  ngOnInit() {

    this._subscriptions.push(this.form.get("codigo").valueChanges
                 .switchMap((params : Params) => this.filterGroup(this.sequnidade, 0, params))
                 .subscribe(
                        val => {
                            this.produtoOpt = val;
                        }
                 ));

    this.aoSelecionarCarregaEmpresa(this.sequnidade);
  }

  filterGroup(sequnidade: number, seqproduto: number, desc: Params): Observable<ProdMonitorado[]> {
    let obs = new Observable<any>();
    let r   = new RodarJson();

    if(desc != null) {
      if(desc.length == 0)  this.form.get("descricao").setValue(null);
        if(Number(desc)){

            r = {
                obj: [{ sequnidade : sequnidade, desc : null, seqproduto : Number(desc) }],
                tipo : "BUSCAPRODUTO",
                json : null
            };

            if(desc.length > 2) obs = this.importaNFSeService.getProduto(r);
        }else{
            r = {
                obj  : [{ sequnidade : sequnidade, desc : (desc != undefined) ? desc.toLowerCase() : null, seqproduto : 0 }],
                tipo : "BUSCAPRODUTO",
                json : null
            };

            if(desc.length > 4) obs = this.importaNFSeService.getProduto(r);
        }
    }

    this.importaNFSeService.hideSpinner();

    return obs;
}


  aoSelecionarProduto(event, descricao){
      this.form.get("descricao").setValue(descricao);
  }

  aoSelecionarCarregaEmpresa(id) {
      this.form.patchValue({"nroempresa": "0" });
      this.empresas = this.user.getEmpresaPermUnid(id);
  }

  onFileChanged() {
      this.files = new Set();

      const files: { [key: string]: File } = this.file.nativeElement.files;
      for (let key in files) {
          if (!isNaN(parseInt(key))) {
              this.files.add(files[key]);
          }
      }

  }

  aoSelecionarCarregaCGO(id) {

    this.cgoLista = [];
    this.form.patchValue({"cgo": "0" });

    if(id > 0) {
      this._subscriptions.push(this.estoquePorLoteServ.execJson(0, this.sequnidade, id, "null", "CGO", "S", "E", "CGO")
                              .subscribe((cgo : object) => {
                                          for(let i of cgo as Array<object>){
                                              let l = new Select();
                                              l.id   = i["CODGERALOPER"];
                                              l.text = i["DESCRICAO"];

                                              this.cgoLista.push(l);
                                          }
                              }));
      }
  }

  submit() {
      if(this.form.valid) {

         this.files.forEach(file => {
            let r1 = new RodarJson();
              r1 = {
                obj  : [{
                  sequnidade : this.sequnidade,
                  seqproduto : this.form.get('codigo').value,
                  nroempresa : this.form.get('nroempresa').value,
                  cgo        : this.form.get('cgo').value,
                  file       : file.name
                }],
                json : null,
                tipo : "EXECJSON"
              }


            this.progress = this.uploadService.upload(this.files, "c:\\Arquivos_api\\", 'N');

            let allProgressObservables = [];
            for (let key in this.progress) {
                allProgressObservables.push(this.progress[key].progress);
            }

            this._subscriptions.push(forkJoin(allProgressObservables).subscribe(end => {
              if(end[0] == 100) {
                this.importaNFSeService.execJson(r1).subscribe((x : string[]) => {
                     this.lista = x;
                });
              }
            }));

        });

      }

       this.validError.showError(this.form);

  }

  ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
	   	this._subscriptions.forEach(x => {
		     x.unsubscribe();
	   	});
    }
}
