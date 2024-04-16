import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertBoxComponent } from '../../../shared/alert-box/alert-box.component';
import { SettleUpComponent } from '../settle-up/settle-up.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { ActivityComponent } from '../activity/activity.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-expense-screen',
  templateUrl: './group-expense-screen.component.html',
  styleUrl: './group-expense-screen.component.scss',
})
export class GroupExpenseScreenComponent implements OnInit {
  userID = localStorage.getItem('Id');
  token: string | null = localStorage.getItem('LEAD_ID');
  wordAfterSpace: string | undefined;
  groupMembers: string[] = [];
  groupID: string = '';

  showDialog: boolean = false;

  createdbyid: string='';
  auid:any='';
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dataService: SharedDataService,
    public authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.groupID = params['id'];
    });

    this.getGroupDetails();

    const token = sessionStorage.getItem('LEAD_ID');
    this.authService.authAfterReferesh(true, token);
  }

  sendData(): void {
  

    const dataToSend = this.groupID;
    const groupMembers = this.groupMembers
    const groupName = this.groupName

    this.dataService.setData(dataToSend, groupMembers, groupName);
  }

  openactivity() {
    this.router.navigate(['/activity'], {
      queryParams: { id: this.groupID },
    });
  }

  openGroupDashboard() {
    this.router.navigate(['group-dashboard'], {
      queryParams: { id: this.groupID },
    });
  }

  getGroupDetails(): void {
    if (this.userID !== null) {
      const tokenParts = this.userID.split(' ');
      this.wordAfterSpace = tokenParts[1]; // Assign value to wordAfterSpace property
    }



    this.http
      .get<any>(
        `http://localhost:2000/group/groupbyid?groupId=${this.groupID}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          }),
        }
      )
      .subscribe({
        next: (response) => {
          console.log('ioaonafnokanoifaonfanoi' + JSON.stringify(response));

          this.groupName = response.group.name;
          this.createdbyid = response.group.groupcreatedby
          // Initialize amounts to 0
          let amountOwedToYou = 0;
          let amountOwed = 0;

          
          console.log("cretd by "+this.createdbyid);
          
          

          this.auid=this.userID?.split(' ')[1]

          const aauid=this.auid[1]

          console.log("creted by id" + this.auid);
         

          // Iterate over expenses
          for (const expense of response.group.expenses) {
            // Check if the current user is the one who posted the expense
            if (expense.userid == this.wordAfterSpace) {
              amountOwedToYou += expense.amount;
              // Check if the current user is present in the split members
              for (const splitMember of expense.split_members) {
                if (splitMember.member_id == this.wordAfterSpace) {
                  amountOwedToYou -= splitMember.shareamount;
                }
              }
            } else {
              // Check if the current user is present in the split members
              for (const splitMember of expense.split_members) {
                if (splitMember.member_id == this.wordAfterSpace) {
                  amountOwed += splitMember.shareamount;
                }
              }
            }
          }

          // Assign the calculated amounts to component properties
          this.amountOwedToYou = amountOwedToYou;
          this.amountOwed = amountOwed;
          // Calculate totalAmount
          this.totalAmount = amountOwedToYou - amountOwed;

          this.groupMembers = response.group.members;

          this.sendData();
        },
        error: (error) => {
          console.error('Error fetching group details:', error);
          // Handle error as needed
        },
      });

  }

  onLogout() {
    this.dialog.open(AlertBoxComponent, {
      data: { type: 'alert' },
    });
  }

  groupName: String = '';
  totalAmount: Number = 5000;
  amountOwed: Number = 1000;
  amountOwedToYou: Number = 20;

  openAddExpenseDialog(): void {
    this.dialog.open(AddExpenseComponent, {
      width: '400px',
    });
  }

  openActivity(): void { }


  deleteGroup(): void {
    if (!this.groupID) {
      console.error('No group ID provided to delete.');
      return;
    }

    this.http.delete<any>(
      `http://localhost:2000/group/deletegroup?groupId=${this.groupID}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        }),
      }
    )
      .subscribe({
        next: (response) => {
          console.log('Group deleted successfully:', response);
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
            document.location.reload()
          });
          
        

  
        },
        error: (error) => {
          console.error('Error deleting group:', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error deleting group",
            showConfirmButton: false,
          });

          document.location.reload()
          // Handle error as needed
        },
      });

    
  }


}
