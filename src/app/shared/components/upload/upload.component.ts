import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogUploadComponent } from '../dialog/dialog-upload/dialog-upload.component';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  constructor(public dialog: MatDialog, public uploadService: UploadService) {}

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogUploadComponent, { width: '50%', height: '50%' });
  } 
}