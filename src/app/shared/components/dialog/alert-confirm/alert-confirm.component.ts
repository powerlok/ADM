import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss']
})
export class AlertConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }

}
