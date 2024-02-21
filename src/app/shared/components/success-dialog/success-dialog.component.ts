import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: String,
              public dialogRef: MatDialogRef<SuccessDialogComponent>) {
  }

  closeDialogAndReload(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
