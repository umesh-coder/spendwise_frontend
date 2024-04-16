import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private isAuth: boolean = false;
  private token!: any;
  private expireTokenTime: any;
  private userid: any;
  constructor(
    public http: HttpClient,
    public _snackBar: MatSnackBar,
    public route: Router
  ) { }

  authAfterReferesh(isAuth: boolean, token: any) {
    this.isAuth = isAuth;
    this.token = token;
  }
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }
  getUSerId() {
    return this.userid;
  }

  onSignUp(values: any): Promise<boolean> {
    console.log(values);
    return new Promise<boolean>((resolve, reject) => {

      const date = new Date()

      const strdate = (date.toString()).substring(0, 16)

      // console.log("date:-" + strdate);

      // console.log("date type " + typeof (strdate));

      let body = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        // userfirstsignup: new Date(),
        userfirstsignupdate: strdate,
        category: ['Transportation', 'Groceries'],
      };

      console.log("body" + body.userfirstsignupdate);

      this.http.post('http://localhost:2000/auth/signup', body).subscribe(
        (res: any) => {
          if (res) {
            this._snackBar.open(
              'Spend wise Account Created SuccessFully',
              '',
              { duration: 4000 }
            );
            this.token = res.data.token;
            this.userid = res.data.userid;
            // console.log("new id" + this.userid);
            let body = {
              firstlogindate: res.data.UserSince,
              username: res.data.username,
              name: res.data.name,
              lastlogindate: res.data.UserSince,
              userid: res.data.userid,
              expenselogged: 0,
            };

            this.saveAllData(body);
            // this.expireTokenTime = setTimeout(() => {
            //   this.onLogout();
            // }, res.data.expiredToken * 1000);
            // this.isAuth = true;
            // this.saveAuthDataonLocalStorage(res.data.expiredToken, res.data.userid);
            // this.route.navigate(['dashboard']);
            resolve(true);
          }
        },
        (error) => {
          // console.log(error);
          this._snackBar.open('Email Already Exist! Login Please', '', {
            duration: 5000,
          });
          this.isAuth = false;
          reject(error);
        }
      );
    });
  }

  onLogin(body: any): Promise<boolean> {
    console.log("body:" + body.email);

    return new Promise<boolean>((resolve, reject) => {
      this.http.post('http://localhost:2000/auth/login', body).subscribe(
        (res: any) => {
          this._snackBar.open(res.message, '', { duration: 3000 });
          this.token = res.data.token;
          this.isAuth = true;
          console.log("store token:-" + this.token);
          this.expireTokenTime = setTimeout(() => {
            this.onLogout();
          }, res.data.expiredToken * 1000);
          this.saveAuthDataonLocalStorage(res.data.expiredToken, res.data.userid);

          let updateData = {

            lastlogindate: res.data.latestLoginDate,
          }
          // console.log("last lastlogin date-" + updateData.lastlogindate);
          this.updateUserData(res.data.userid, updateData);
          this.route.navigate(['dashboard']);
          resolve(true);
        },
        (error) => {
          this._snackBar.open(error.error.message, '', { duration: 3000 });
          this.isAuth = false;
          reject(error);
        });
    });
  }

  onLogout() {
    this.token = null;
    this.isAuth = false;
    this.route.navigate(['welcome']);
    clearTimeout(this.expireTokenTime);
    sessionStorage.removeItem('LEAD_ID');
    sessionStorage.removeItem('Id');
    localStorage.removeItem('LEAD_ID');
    localStorage.removeItem('Id');
  }

  private saveAuthDataonLocalStorage(time: any, userid: any) {
    userid = "954854384ubbbfhf9489r34r34fnnn " + userid;
    sessionStorage.setItem('LEAD_ID', this.token);
    sessionStorage.setItem('Id', userid);
    localStorage.setItem('LEAD_ID', this.token);
    localStorage.setItem('Id', userid);
    setTimeout(() => {
      this.onLogout();
    }, time * 1000);
  }

  saveAllData(body: any) {

    console.log("sav data token :- " + this.token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post('http://localhost:2000/expense/savedata', body, { headers }).subscribe((res: any) => {
      this._snackBar.open('Spend Wise Account Created SuccessFully', '', { duration: 125000 });
    })

  }

  getAllSaveData() {
    const userId = localStorage.getItem('Id')?.split(' ')[1];
    return this.http.get('http://localhost:2000/expense/getsavedata/' + userId);
  }

  updateUserData(id: string, body: any) {
    // let userid=localStorage.getItem('Id')?.split(' ')[1];
    console.log("body:-" + body);

    this.http.post('http://localhost:2000/expense/updatesavedata/' + id, body).subscribe((result) => {
      console.log(result);
    })
  }

  updateProfile(body: any) {
    let id = sessionStorage.getItem('updateid')
    console.log("profile id" + id);



    return this.http.post('http://localhost:2000/expense/updateuserdataprofile/' + id, body);
  }

  updateWholeInfo(body: any) {
    let id = sessionStorage.getItem('Id')?.split(' ')[1];

    return this.http.post('http://localhost:2000/expense/updatename/' + id, body);
  }

  deleteUserAccount() {
    let id = sessionStorage.getItem('Id')?.split(' ')[1];


    console.log("sav data token :- " + this.token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    console.log("delete id" + id);

    return this.http.delete('http://localhost:2000/auth/delete/' + id, { headers });
  }

}
