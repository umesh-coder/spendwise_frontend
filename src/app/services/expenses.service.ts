import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  public baseUrl = 'http://localhost:2000/groupExpense';
  constructor(private http: HttpClient) { }


  createExpense(groupId: string, expenseData: any): Observable<any> {
    const url = `${this.baseUrl}/createExpense/?groupId=${groupId}`;
    const token = sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(url, expenseData, { headers });
  }


  getExpenses(groupId: string): Observable<any> {
    const token = sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl} / getExpenses /? groupId = ${groupId}`, { headers });
  }

  getMemberExpenses(): Observable<any> {
    const token = sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl} / memberExpense`, { headers });
  }

  updateExpenseStatus(expenseId: string): Observable<any> {
    const token = sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl} / updateExpenseStatus ? expenseId = ${expenseId}`, null, { headers });
  }
  getMembers(groupId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl} / getMembers ? groupId = ${groupId}`);
  }



}