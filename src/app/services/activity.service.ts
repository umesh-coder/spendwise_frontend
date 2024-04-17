import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../enviroments/environment"
@Injectable({
  providedIn: 'root'
})
export class ActivityService {



  private apiUrl = environment.apiUrl + '/group/groupbyid';

  constructor(private http: HttpClient) { }

  getAllGroupsByEmail(email: string): Observable<any> {





    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log("get group data by email local token:-" + token);



    return this.http.get(this.apiUrl + `/group/groupbyid?groupId=${email}`, { headers });

  }

  getEmail(userId: any): Observable<any> {
    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.apiUrl + `/groupExpense/getemail/${userId}`, { headers });
  }

};