import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MorningAuthorisationService {


  private apiUrl = 'http://localhost:3000/api/morning-delay/add';
  private Url = 'http://localhost:3000/api/morning-delay';


  constructor(private http: HttpClient) { }

  // Function to add a exit autorisation request
  submitMorningAuthorization(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }


  getMorningDelays(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/list');
  }

  getMorningDelayCounts(): Observable<any> {
    return this.http.get(`${this.Url}/counts`);
  }

}
