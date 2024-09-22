import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  private apiUrl = 'http://localhost:3000/api/release/add';
  private Url = 'http://localhost:3000/api/release';


  constructor(private http: HttpClient) { }

  // Method to submit the release form
  submitReleaseForm(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getReleases(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/release-list');
  }
}
