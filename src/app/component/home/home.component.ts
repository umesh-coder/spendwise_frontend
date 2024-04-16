import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { BusinessDataService } from '../../services/business-data.service';
import { AlertBoxComponent } from '../../shared/alert-box/alert-box.component';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { CreateGroupDialogComponent } from '../splitwise/create-group-dialog/create-group-dialog.component';
import { groupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogging: any;
  app_version: any;
  groups: any[] = [];
  groupID: any;

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public businessData: BusinessDataService,
    public groupService: groupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem('LEAD_ID');
    this.authService.authAfterReferesh(true, token);
    this.app_version = sessionStorage.getItem('Version');
    console.log(this.groups);
    this.fetchGroups();
    
  }

  onGroupClick(groupId: string): void {
    this.groupID  = groupId;
    this.router.navigate(['dashboard/group-expense'], {
      queryParams: { id: groupId },
    });
  }

  fetchGroups(): void {
    this.groupService.getAllGroupsByUserId().subscribe({
      next: (response) => {
        console.log('Groups retrieved successfully:', response);
        this.groups = response.groups;
        console.log(this.groups);
      },
      error: (error) => {
        console.error('Error retrieving groups:', error);
        // Handle error, if needed
      },
    });
  }

  refreshGroups(): void {
    this.fetchGroups();
    
  }

  onAdd() {
    this.businessData.onNavigate('home');
  }
  Profile() {
    this.openDialog();
  }
  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '600px',
    });
  }
  onLogout() {
    this.dialog.open(AlertBoxComponent, {
      data: { type: 'alert' },
    });
  }

  groupdetails(): void {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.componentInstance.groupCreated.subscribe((group: any) => {
      console.log('Group created', group);
      this.groups.push(group);
    });
  }
}
