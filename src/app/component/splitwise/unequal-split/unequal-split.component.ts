import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unequal-split',
  templateUrl: './unequal-split.component.html',
  styleUrl: './unequal-split.component.scss'
})
export class UnequalSplitComponent {
  participants: { name: string, amount: number, selected: boolean }[] = [
    { name: 'User 1', amount: 0, selected: false },
    { name: 'User 2', amount: 0, selected: false },
    // Add more participants as needed
  ];

  constructor(public dialogRef: MatDialogRef<UnequalSplitComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Implement save logic here
    this.dialogRef.close();
  }
 
}
