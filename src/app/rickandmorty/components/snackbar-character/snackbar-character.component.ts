import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-character',
  standalone: false,
  
  templateUrl: './snackbar-character.component.html',
  styleUrl: './snackbar-character.component.scss'
})
export class SnackbarCharacterComponent {
  public readonly snackBarRef = inject(MatSnackBarRef<SnackbarCharacterComponent>);
  public readonly data: any = inject<any>(MAT_SNACK_BAR_DATA);
  
  constructor() {}
}
