import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CinService {

  private apiUrl = 'http://localhost:3000/api/cin/add';

  constructor(private http: HttpClient) { }

  // Function to add a exit autorisation request
  submitCinRequest(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }
}
