import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserInfoService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Method to get user information by user_ref_emp
  getUserInfo(userRefEmp: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-info/${userRefEmp}`);
  }

  // Method to get account count by month
  getAccountCountByMonth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/account-count-by-month`);
  }
}
