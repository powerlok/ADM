import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-rodizio',
  templateUrl: './alert-rodizio.component.html',
  styleUrls: ['./alert-rodizio.component.scss']
})
export class AlertRodizioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertRodizioComponent>,
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
