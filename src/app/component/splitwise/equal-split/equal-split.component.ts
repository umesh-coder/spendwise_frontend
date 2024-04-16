import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-equal-split',
  templateUrl: './equal-split.component.html',
  styleUrl: './equal-split.component.scss'
})
export class EqualSplitComponent {
   participants: { name: string, amount: number, selected: boolean }[] = [
    { name: 'User 1', amount: 0, selected: false },
    { name: 'User 2', amount: 0, selected: false },
    // Add more participants as needed
  ];

  constructor(public dialogRef: MatDialogRef<EqualSplitComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Implement save logic here
    this.dialogRef.close();
  }
}
