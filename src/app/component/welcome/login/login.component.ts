// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
// export class LoginComponent {

// }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { BusinessDataService } from '../../../services/business-data.service';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userIDjoined = localStorage.getItem('Id');
  userId: string | undefined;
  LoginContinue: boolean = false;
  loginForm!: FormGroup;
  constructor(
    public route: Router,
    public authService: AuthService,
    public busServ: BusinessDataService,
    private websocketService: WebsocketService
  ) {}
  ngOnInit(): void {
    this.LoginContinue = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.userIDjoined !== null) {
      const tokenParts = this.userIDjoined.split(' ');
      this.userId = tokenParts[1]; // Assign value to wordAfterSpace property
    }
    this.LoginContinue = true;
    this.busServ.isChecking = true;
    this.authService
      .onLogin(this.loginForm.value)
      .then(() => {
        // Upon successful login, establish WebSocket connection
        this.websocketService.connect(this.userId);
        // Log WebSocket connection status
        console.log('WebSocket connection established');
        // Handle successful login
        this.LoginContinue = false; // Enable the login button after successful login
        this.busServ.isChecking = false;
      })
      .catch((error: any) => {
        // Handle error response
        this.LoginContinue = false; // Enable the login button after error
        this.busServ.isChecking = false;
      });
  }
}
