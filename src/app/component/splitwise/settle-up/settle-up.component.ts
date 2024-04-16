import { Component,Input  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrl: './settle-up.component.scss',
})
export class SettleUpComponent {
  token: string | null = localStorage.getItem('LEAD_ID');
  selectedPaymentMethod!: string;
  paymentMethods: string[] = ['Credit Card', 'PayPal', 'Bank Transfer'];
  @Input() expenseId: any;

  constructor(public dialogRef: MatDialogRef<SettleUpComponent>,private http: HttpClient) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Make the API call to update expense status
    const expenseId = this.expenseId; // Replace 'your_expense_id' with the actual expense ID
    console.log("now the expense "+expenseId);
    
    this.http.put<any>(
      `http://localhost:2000/groupExpense/updateStatus?expenseId=${expenseId}`,
      null,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        }),
      }

    ).subscribe({
      next: (response: any) => {
        console.log('Expense status updated successfully:', response);
        Swal.fire({
          title: "Settle Up Successfully",
          icon: "success",
          showConfirmButton: false,
        });
        // Close the dialog
        this.dialogRef.close();
        document.location.reload()
      },
      error: (error: any) => {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "NOT Settle Yet",
          showConfirmButton: false,
        });

        console.error('Error updating expense status:', error);
        // Handle error as needed
        document.location.reload()
      }
    });
    console.log(this.token);
    
    this.dialogRef.close();
  }

 
}
