import { Injectable } from '@angular/core';
import { AlertConfirmComponent } from '../components/dialog/alert-confirm/alert-confirm.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) { }

  dialogConfirm(titulo : string, descricao : string, width: string) : any{
     let dialogRef = this.dialog.open(AlertConfirmComponent, {
          width: width,
          data: { titulo : titulo, descricao: descricao }
      });

      return dialogRef
  }

}
