import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class AlertService {

    constructor(public snackBar: MatSnackBar) {

    }

    alertValid(message: string) {
        this.snackBar.open(message, "Fechar", {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            //extraClasses: ['error-message', 'mdl-shadow--6dp', 'bold'],

        })/*.afterOpened().first().subscribe(this.setOnTop);*/;
    }

    alert(message: string) {
        this.snackBar.open(message, "Fechar", {
            duration: 10000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
            //extraClasses: ['error-message', 'mdl-shadow--6dp', 'bold'],

        })/*.afterOpened().first().subscribe(this.setOnTop);*/;
    }

    alertInfinit(message: string) {
        this.snackBar.open(message, "Fechar", {
            duration: 99999999,
            verticalPosition: 'top',
            horizontalPosition: 'center',   
            //extraClasses: ['error-message', 'mdl-shadow--6dp', 'bold'],

        });
    }

    alertComponent(component){
        this.snackBar.openFromComponent(component, {
            duration: 99999999
            //extraClasses: ['error-message', 'mdl-shadow--6dp', 'bold'],

        });  
    }

    alertCustomComponent(component, message, time){
        const config = new MatSnackBarConfig();
        config.duration = time;
        config.data = {message: message};
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        

        let snackbar = this.snackBar.openFromComponent(component, config);  
    }

    closeAlert(){
        this.snackBar.dismiss();
    }
}