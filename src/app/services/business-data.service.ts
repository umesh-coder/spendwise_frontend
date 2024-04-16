import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class BusinessDataService {

  isLogging: boolean = false;
  isChecking: boolean = false;
  hashmap: any = {};
  public pieDialogRef: any;
  pieLabels: any = [];
  piedata: any = [];
  chartType: any;
  expensesLogged: any = 0;
  latestLoginDate: any = '';
  firstLoginDate: any = ''
  keywords: any;
  data: any;
  apiUrl = environment.apiUrl;
  userid: any;
  appVersion: any;
  constructor(private route: Router, public http: HttpClient) {
  }

  onHome() {
    this.route.navigate(['home']);
  }
  onNavigate(url: any) {
    this.route.navigate([url]);
  }

  onGetAllExpense(id: any) {
    this.userid = id;
    console.log("user id:-" + this.userid);


    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // console.log("signup local token:-" + token);


    return this.http.get('http://localhost:2000/expense/getallexpense/' + this.userid, { headers });
  }

  onCreateExpense(values: any, date: any) {
    let id = sessionStorage.getItem('Id')?.split(' ')[1];
    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let body = {
      name: values.name,
      amount: values.amount,
      expense_date: (date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3]).toString(),
      expense_category: values.expense_category,
      payment: values.payment,
      comment: values.comment,
      userid: id,
    }

    // console.log("expense user id:" + id);


    // console.log("expense body:-" + body.expense_category);

    return this.http.post('http://localhost:2000/expense/createexpense', body, { headers });
  }


  onImportExpense(values: any) {

    let id = sessionStorage.getItem('Id')?.split(' ')[1];
    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let date = values.expense_date.split('/');
    date = (new Date(date[2], date[1] - 1, date[0])).toString();
    date = date.split(' ');
    let body = {
      name: values.expense_name,
      amount: values.amount,
      expense_date: (date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3]),
      expense_category: values.expense_category,
      payment: values.payment_type,
      comment: values.comment,
      userid: id,
    }

    // console.log("inside import CSV");

    return this.http.post('http://localhost:2000/expense/createexpense', body, { headers });
  }


  onCreateCategory(body: any) {
    console.log("body Category:-" + body);
    const data = {
      "categories": [body]
    }


    // console.log("yes=" + data);



    return this.http.post('http://localhost:2000/expense/savecategory/' + this.userid, data);

  }

  onDeleteExpense(id: string) {

    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });


    return this.http.delete('http://localhost:2000/expense/deleteexepense/' + this.userid + '/' + id, { headers });
  }

  onGetSingleExpense(id: string) {
    // return this.http.get(this.apiUrl + 'GET_SINGLE_EXPENSE/' + this.userid + '/' + id);
    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('http://localhost:2000/expense/getsingleexpense/' + this.userid + '/' + id, { headers });

  }

  onUpdateExpense(id: string, values: any) {

    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log("expense id : " + this.userid);

    let str = values.expense_date.toString();
    let date = str.split(' ');
    let body = {
      name: values.name,
      amount: values.amount,
      expense_date: (date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3]),
      expense_category: values.expense_category,
      payment: values.payment,
      comment: values.comment,
      creater: this.userid,
    }

    return this.http.patch('http://localhost:2000/expense/updateexpense/' + this.userid + '/' + id, body, { headers });
  }

  onGetAllCategory() {
    this.userid = sessionStorage.getItem('Id')?.split(' ')[1];
    console.log("category user id " + this.userid);

    return this.http.get('http://localhost:2000/expense/getcategory/' + this.userid);
  }

  onGithub() {
    const link = document.createElement('a');
    link.href = "https://github.com/umesh-coder";
    link.click();
  }
  onLinkedin() {
    const link = document.createElement('a');
    link.href = "https://www.linkedin.com/in/umeshs09/";
    link.click();
  }

  onGetAppVersion() {
    return this.http.get(this.apiUrl + 'USER/APP_VERSION/');
  }
}
