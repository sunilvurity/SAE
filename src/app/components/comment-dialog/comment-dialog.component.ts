import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    content: string;
    id: string;
}


@Component({
selector: 'comment-dialog',
templateUrl: 'comment-dialog.component.html',
})
export class CommentDialog {

    constructor(
        public dialogRef: MatDialogRef<CommentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}