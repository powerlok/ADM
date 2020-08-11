import { Component, OnInit, Inject } from '@angular/core';
<<<<<<< HEAD
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
=======
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d

@Component({
  selector: 'app-alert-rodizio',
  templateUrl: './alert-rodizio.component.html',
  styleUrls: ['./alert-rodizio.component.scss']
})
export class AlertRodizioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertRodizioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
<<<<<<< HEAD
      
=======

>>>>>>> 10ea516aba4d097f0a07b6037dc067fcf347cc8d
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }

}
