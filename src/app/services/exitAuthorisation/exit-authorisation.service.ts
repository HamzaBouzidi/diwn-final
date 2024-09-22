import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExitAuthorisationService {

  private apiUrl = 'http://localhost:3000/api/authorisation/add-exit';
  private Url = 'http://localhost:3000/api/authorisation';


  constructor(private http: HttpClient) { }

  // Function to add a exit autorisation request
  submitExitAuthorization(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }

  // Get all exits from the API
  getExits(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list-exit');
  }

  getExitCounts(): Observable<any> {
    return this.http.get(this.Url + '/counts');
  }
}
