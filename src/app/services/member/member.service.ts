import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {


  private apiUrl = 'http://localhost:3000/api/member/add';
  private Url = 'http://localhost:3000/api/member';


  constructor(private http: HttpClient) { }


  submitMemberRequest(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }


  getMembers(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/member-list');
  }
}
