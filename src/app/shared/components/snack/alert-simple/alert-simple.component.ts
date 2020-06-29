import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'components-snack-alert-simple',
  templateUrl: './alert-simple.component.html',
  styleUrls: ['./alert-simple.component.scss']
})
export class AlertSimpleSnackComponent implements OnInit {
  panelOpenState = false;
  message : string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
   }

  ngOnInit() {

    this.message = this.data.message;
  }


}
