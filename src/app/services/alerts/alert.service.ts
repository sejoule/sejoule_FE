import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class AlertService {

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  alert(message: string): void {
    this.snackBar.open(message, '', { duration: 3000 });
  }

}
