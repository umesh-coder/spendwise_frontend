import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../enviroments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class groupService {
  private baseUrl = environment.apiUrl + '/group';

  constructor(private http: HttpClient) { }

  createGroup(data: any): Observable<any> {
    // Retrieve the token from local storage
    const token = sessionStorage.getItem('LEAD_ID');

    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Token : == ' + token);

    // Send the HTTP request with the token in the headers
    return this.http.post<any>(`${this.baseUrl}/creategroup`, data, {
      headers,
    });
  }


  getAllGroupsByUserId(): Observable<any> {
    const token = sessionStorage.getItem('LEAD_ID');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/getallgroups`, { headers });
  }

  private groupNameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  setGroupName(groupName: string): void {
    this.groupNameSubject.next(groupName);
  }

  getGroupName(): Observable<string> {
    return this.groupNameSubject.asObservable();
  }



  SuggestionsByGemini(data: string): Observable<any> {
    // Construct the request body
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: data
            }
          ]
        }
      ]
    };

    // Send the HTTP request with the data in the body
    return this.http.post<any>('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDlcEEhXCJANNpHsm3nkkLpC98rml6-oRo', requestBody);
  }
}
