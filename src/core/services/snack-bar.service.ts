import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackbarService : MatSnackBar) { }

  showSnackbar(msg : string, errorType : string = 'success') {
    this._snackbarService.open(msg, 'Close', {
      horizontalPosition : 'left',
      verticalPosition : 'top',
      duration : 3000,
      panelClass : [errorType]
    })
  }
}
