import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-character',
  standalone: false,
  
  templateUrl: './snackbar-character.component.html',
  styleUrl: './snackbar-character.component.scss'
})
export class SnackbarCharacterComponent {
  snackBarRef = inject(MatSnackBarRef);
}
