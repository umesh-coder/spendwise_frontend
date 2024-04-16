import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivityService } from '../../../services/activity.service';
import { Customer, Representative } from '../domain/activity';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../../services/websocket.service';
import { SettleUpComponent } from '../settle-up/settle-up.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent implements OnInit {
  groups: any[] = [];
  expenses: any[] = [];
  userid: any;
  groupname: any;
  customers!: Customer[];
  expenseId: any[] = [];
  representatives!: Representative[];
  member: any[] = []

  statuses: any[] = [];



  loading: boolean = true;

  activityValues: number[] = [0, 100];
  groupID: any;
  userIDD: any;
  groupdata: any;
  status: any;
  test: any[] = []

  useremail: string = ''

  constructor(
    private customerService: ActivityService,
    private route: ActivatedRoute,
    private websocketService: WebsocketService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.groupID = params['id'];
    });

    this.customerService.getAllGroupsByEmail(this.groupID).subscribe(
      (data) => {
        this.groupname = data.group.name;
        this.groupdata = data.group;
        this.expenses = data.group.expenses;


        console.log("split " + this.member);

        const currentuserid = localStorage.getItem('Id') || sessionStorage.getItem('Id');

        console.log("currentuserid"+currentuserid);
        
        

        this.customerService.getEmail(currentuserid?.split(' ')[1]).subscribe((data) => {
          this.useremail = data;
          console.log("email", data);

        });



        console.log("email" + this.useremail);




        for (const st of this.expenses) {
          console.log(st);

          for (const member of st.split_members) {
            this.statuses.push(member.status)

            // this.test = member.member_id

            this.member.push(member)

            this.test.push(member.member_id)

            console.log("member email:--" + this.test);

            console.log("Status Array new :-" + member.status);

          }
        }
        console.log("status array :-" + this.statuses);

        for (const email of this.test) {

          console.log("ye hai test" + email);
        }

        for (const member_data of this.member) {
          console.log("member data" + member_data.member_id);

        }
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );

    // Fetch initial group data
    this.fetchGroupData();

    // Subscribe to WebSocket messages for activity updates
    this.websocketService.on('activityUpdate').subscribe((expense) => {
      // Update activity with new expense data
      // You might need to filter expenses based on group ID or other criteria
      this.updateActivity(expense);
    });

  }

  getSeverity(status: string) {
    switch (status) {
      case 'Pending':
        return 'danger';

      case 'Received':
        return 'success';

      default:
        return 'success'; // Handle other statuses
    }
  }

  fetchGroupData() {
    this.customerService.getAllGroupsByEmail(this.groupID).subscribe(
      (data) => {
        this.groupname = data.group.name
        this.groupdata = data.group
        this.expenses = data.group.expenses;
        this.status = data.group.expenses.split_members;
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }


  openSettleUpDialog(expenseId: any): void {
    const dialogRef = this.dialog.open(SettleUpComponent, {
      width: '400px',
    });
    dialogRef.componentInstance.expenseId = expenseId; // Pass expenseId to the SettleUpComponent

  }

  updateActivity(expense: any) {
    // Update activity with new expense data
    // You might need to filter expenses based on group ID or other criteria
    this.expenses.push(expense);
    // Also update other properties or perform any necessary actions
  }
}
