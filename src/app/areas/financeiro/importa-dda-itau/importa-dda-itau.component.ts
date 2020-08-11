import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { Params } from '@angular/router';
import { RodarJson } from '../../../shared/models/RodarJson';
import { ImportaDDAItauService } from './importa-dda-itau.service';
import { ValidationErrorService } from '../../../shared/services/validation-error.service';
import { UploadService } from '../../../shared/services/upload.service';
import { AlertService } from '../../../../app/shared/services/alert.service';

@Component({
  selector: 'app-importa-dda-itau',
  templateUrl: './importa-dda-itau.component.html',
  styleUrls: ['./importa-dda-itau.component.scss']
})
export class ImportaDDAItauComponent implements OnInit, OnDestroy {

  form : FormGroup;

  _subscriptions        : Array<Subscription> = [];
  selectedFile          : File;
  progress;

  @ViewChild('file') file;
    public files: Set<File>;

  constructor(private fb                  : FormBuilder,
              private ImportaDDAItauService : ImportaDDAItauService,
              private validError          : ValidationErrorService,
              private alertService: AlertService,
              public uploadService: UploadService) {


    this.form = this.fb.group({
      arquivo		      : new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
		});
  }


  ngOnInit() {


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

  submit() {
      if(this.form.valid) {

         this.files.forEach(file => {
            let r1 = new RodarJson();
              r1 = {
                obj  : [{
                  file       : file.name
                }],
                json : null,
                tipo : "EXECJSON"
              }


            this.progress = this.uploadService.upload(this.files, "c:\\Arquivos_DDA\\", 'N');

            let allProgressObservables = [];
            for (let key in this.progress) {
                allProgressObservables.push(this.progress[key].progress);
            }

            this._subscriptions.push(forkJoin(allProgressObservables).subscribe(end => {
              if(end[0] == 100) {
                this.ImportaDDAItauService.execJson(r1).subscribe((x : string[]) => {
                  this.alertService.alertInfinit("Geração realizada com sucesso.");
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
