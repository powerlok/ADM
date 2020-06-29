import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationErrorService {
    private _alertService: AlertService;
    errors: string[] = [];
    controls: {
        [key: string]: AbstractControl;
    }

    constructor(alertService: AlertService) {
        this._alertService = alertService;
    }

    showError(form: FormGroup) {
        
        Object.keys(form.controls).forEach(key => {
            this.errors = [];
            let control = form.controls[key];
            let errors = control.errors;
            if (errors === null || errors.count === 0) {
                return;
            }

            if (errors.message) {               
                this.errors.push(errors.message);                
            }

            if (errors.required) {               
                this.errors.push(`${key} é obrigatório`);                
            }

            if (errors.minlength) {
                this.errors.push(`${key} deve ter no mínimo ${errors.minlength.requiredLength}.`);
            }
            if (errors.maxlength) {
                this.errors.push(`${key} deve ter no máximo ${errors.maxlength.requiredLength}.`);
            }
            if (this.errors != null) {

                Object.keys(this.errors).forEach(keyError => {
                    //console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', this.errors[keyError]);                    
                    this._alertService.alertValid(this.errors[keyError]);
                });
            }
        });

        
    }
}
