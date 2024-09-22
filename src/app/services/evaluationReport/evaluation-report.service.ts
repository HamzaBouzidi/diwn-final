import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationReportService {
  private apiUrl = 'http://localhost:3000/api/evaluation-report/add';
  private Url = 'http://localhost:3000/api/evaluation-report';


  constructor(private http: HttpClient) { }

  submitReport(reportData: any): Observable<any> {
    return this.http.post(this.apiUrl, reportData);
  }

  getEvaluationReports(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + '/eval-list');
  }
}
