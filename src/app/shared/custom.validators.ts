import { FormArray, FormControl, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';

export class CustomValidators {

  static checkboxValidator(control: AbstractControl): ValidationErrors {
     let valor : any = null;

      valor = control.value;

      const message = {
       
        'message': 'Marque pelo menos 1 empresa'
       
      };
      
      return (valor.length > 0) ? null : message; 
  }

  static uniqueName(c: FormControl): Promise<ValidationErrors> {
    const message = {
      'uniqueName': {
        'message': 'The name is not unique'
      }
    };

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(c.value === 'Existing' ? message : null);
      }, 1000);
    });
  }

  static telephoneNumber(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^\d{3,3}-\d{3,3}-\d{3,3}$/.test(c.value);
    const message = {
      'telephoneNumber': {
        'message': 'The phone number must be valid (XXX-XXX-XXX, where X is a digit)'
      }
    };
    return isValidPhoneNumber ? null : message;
  }

  static telephoneNumbers(form: FormGroup): ValidationErrors {

    const message = {
      'telephoneNumbers': {
        'message': 'At least one telephone number must be entered'
      }
    };

    const phoneNumbers = <FormArray>form.get('phoneNumbers');
    const hasPhoneNumbers = phoneNumbers && Object.keys(phoneNumbers.controls).length > 0;

    return hasPhoneNumbers ? null : message;
  }

  static validafloat(control: AbstractControl): ValidationErrors {
    let group = <FormGroup>control.parent;

    if (!group) {
      return null;
    }

    let name: string;

    Object.keys(group.controls).forEach(key => {
      let childControl = group.get(key);

      if (childControl !== control) {
        return;
      }

      name = key;
    });
   
    const isValid = Number(control.value);
    const message = {
        'message': 'O campo ' + name + ' não está no formato correto. Exemplo: 1.52'
    };
    return isValid ? null : message;
  }
  
  
  static validaNumberPoint(c: FormControl): ValidationErrors { //console.log(c.value);
    const isValid = (c.value != '' && c.value != null && c.value != "") ? /^[\d.]+$/.test(c.value) : true;
    const message = {
    
        'message': 'O campo só aceita numero e ponto.'
     
    };
    return isValid ? null : message;
  }

  static validaHoraIniFim(control: AbstractControl): ValidationErrors { 
   
    const f = control.parent as FormGroup;
     
    const message = {
    
      'message': 'A Hora inicial deve ser menor do que a final.'
   
    };
    
    if(moment(f.get("horainicial").value, "HH:mm") != null && moment(f.get("horafinal").value, "HH:mm") != null){
      return Observable.of((moment(f.get("horainicial").value, "HH:mm") > moment(f.get("horafinal").value, "HH:mm"))).pipe(
        map(result => result ? message :null)
      ); 
    }else{
      Observable.of(false).pipe(
        map(result => result ? message :null)
      );
    }

  }

}