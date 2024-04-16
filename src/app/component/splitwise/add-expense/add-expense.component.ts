import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EqualSplitComponent } from '../equal-split/equal-split.component';
import { AutoFocus } from 'primeng/autofocus';
import { UnequalSplitComponent } from '../unequal-split/unequal-split.component';
import { ExpensesService } from '../../../services/expenses.service';
import { WebsocketService } from '../../../services/websocket.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { BusinessDataService } from '../../../services/business-data.service';
import { SharedDataService } from '../shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent implements OnInit {
  split_type!: string;
  expenseForm!: FormGroup;
  @Input() tags: any = [];
  keywords: any = [];
  maxDate: any = new Date();
  date: any;
  receivedData: any;

  splitMembers :any= [];

  
  constructor(
    public dialogRef: MatDialogRef<AddExpenseComponent>,
    private dialog: MatDialog,
    public expenseservice: ExpensesService,
    public businessData: BusinessDataService,
    public formBuilder: FormBuilder,
    private dataService: SharedDataService,
    private websocketService: WebsocketService
  ) {}

  
  ngOnInit(): void {
    this.expenseForm = this.formBuilder.group({
      expense_name: [''],
      price: [''],
      paid_by: [''],
      split_type: ['equally'], // Default split type
      expense_category: [''],
      expense_date: [''],
    });

    this.businessData.onGetAllCategory().subscribe((res: any) => {
      this.keywords = res.data;
    });
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  

  onSave(): void {

    for (const member of this.dataService.GM) {
      console.log(member)
      // Push a new object to splitMembers array for each group member
      this.splitMembers.push({
        member_id: member, // Assuming member object has an id property
        shareamount: this.calculateExpensePerPerson(), // Initialize shareamount to 0 or any default value as needed
        status: 'Pending' // Assuming status needs to be set to 'Pending' initially
      });
    }

    const date = this.expenseForm.value.expense_date.toString();

    console.log('tarikh ' + this.expenseForm.value.expense_category);

    const groupId = this.dataService.groupID; 
    const expenseData = {
      name: this.expenseForm.value.expense_name,
      amount: this.expenseForm.value.price,
      expense_date: date.substring(0, 15),
      expense_category: this.expenseForm.value.expense_category,
      payment: 'Done By the User',
      comment: 'Done By the User',
      split_members: this.splitMembers
    };

    this.expenseservice.createExpense(groupId, expenseData).subscribe(
      (response) => {
        console.log('Expense created successfully:', response);
        Swal.fire({
          title: "Expend Added Sucessfully",
          icon: "success",
          showConfirmButton: false,
        });
        document.location.reload()
        // this.websocketService.emit('expenseCreated', expenseData);
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter Expense Details",
          showConfirmButton: false,
        });
        console.error('Error creating expense:', error);
        document.location.reload()
      }
    );

    // Implement save logic here
    this.dialogRef.close();
  }

  dialogRefs: any;

  openEquallySplitDialog(): void {
    this.dialogRefs = this.dialog.open(EqualSplitComponent, {
      width: '400px',
      position: { right: '20px', top: '20px' }, // Adjust position as needed
    });
  }

  openUnEquallySplitDialog(): void {
    this.dialogRefs = this.dialog.open(UnequalSplitComponent, {
      width: '500px',
      position: { right: '20px', top: '20px' }, // Adjust position as needed
    });
  }

  calculateExpensePerPerson(): number {
    // const totalPrice = this.expenseForm.get('price').value || 0;4
    const totalPrice = this.expenseForm.value.price;
    const numberOfParticipants = this.dataService.GM.length // You need to get the actual number of participants from your data
    return totalPrice / numberOfParticipants;
  }

  addEvent(event: any) {
    let str = event.value.toString();
    this.date = str.split(' ');
  }
}
