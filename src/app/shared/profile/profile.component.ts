
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { BusinessDataService } from '../../services/business-data.service';
import { AlertBoxComponent } from '../alert-box/alert-box.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  user_name: any = '';
  editable: boolean = false;
  isProcess: boolean = true;
  name: any = '';
  lines: any = [];
  isEdit: boolean = false;
  newName: any;
  newUsername: any;
  constructor(public authService: AuthService, public businessData: BusinessDataService, public snackBar: MatSnackBar, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.isProcess = true;
    this.authService.getAllSaveData().subscribe((res: any) => {

      // console.log("updateid" + res.data._id);

      const updatenameid = res.data._id
      sessionStorage.setItem('updateid', updatenameid);

      setTimeout(() => {
        this.isProcess = false;
        this.editable = true;
      }, 1000);
      let firstDate = (res.data.firstlogindate).toString().split('T')[0];
      let lastLogin = (res.data.lastlogindate).toString().split('T')[0];
      this.lines = [
        { content: 'User Since', text: firstDate },
        // { content: 'Expense Logged', text: res.data.expenselogged },
        { content: 'Last Login', text: lastLogin },
      ];
      this.name = res.data.name;
      this.user_name = res.data.username;
      this.newName = res.data.name;
      this.newUsername = res.data.username;
    })
  }
  editField() {
    this.isEdit = !this.isEdit;
  }
  saveData() {
    let body = {
      username: this.newUsername,
      name: this.newName,
    }
    this.authService.updateProfile(body).subscribe((res: any) => {
      if (res) {
        this.authService.updateWholeInfo(body).subscribe((result) => {
          console.log(result);
        });
        this.snackBar.open('Profile Updated', '', { duration: 2000 });
      }
    }, error => {
      this.snackBar.open('Server Error', '', { duration: 2000 });
    });
  }
  onDeleteAccount() {
    // console.log("delete");
    // this.authService.onLogout();
    this.dialog.open(AlertBoxComponent, {
      data: { type: 'delete' }
    });
  }
}

