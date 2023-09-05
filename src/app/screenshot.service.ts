import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {

  constructor(private http: HttpClient) { }

  takeScreenshot(url: string): Observable<{ path: string, pdf_path:string }> {
    return this.http.post<{ path: string,pdf_path:string }>('http://localhost:3000/screenshot', { url });
  }
}
