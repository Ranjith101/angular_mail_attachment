import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:3000'; // Update with your server URL

  constructor(private http: HttpClient) {}

  sendEmail(
    to: string,
    subject: string,
    message: string,
    screenshotData: string
  ): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({
      to,
      subject,
      message,
      screenshotData,
    });

    return this.http.post<string>(`${this.apiUrl}/send-email`, body, {
      headers,
    });
  }
}
