// // import { Component } from '@angular/core';
// // import { ScreenshotService } from './screenshot.service';

// // @Component({
// //   selector: 'app-root',
// //   templateUrl: './app.component.html',
// //   styleUrls: ['./app.component.scss']
// // })
// // export class AppComponent {
// //   screenshotPath: string | undefined;
// //   pdfPath: string | undefined
// //   constructor(private screenshotService: ScreenshotService) { }

// //   captureScreenshot() {
// //     const url = 'http://52.172.33.39:4200/#/PerformanceReportScreenshot?VesselId=105&enginedetailid=131&engineperformanceid=811';
// //     this.screenshotService.takeScreenshot(url).subscribe(response => {
      
// //       this.screenshotPath = response.path;
// //       console.log('Screenshot saved at:', response.path);
// //     });
// //   }
// // }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ScreenshotService {
//   private apiUrl = 'http://localhost:3000/screenshot'; // Update with your server's API URL

//   constructor(private http: HttpClient) { }

//   takeScreenshots(urls: string[]): Observable<any> {
//     // Send an array of URLs to the server
//     return this.http.post<any>(this.apiUrl, { urls });
//   }
// }

import { Component } from '@angular/core';
import { ScreenshotService } from './screenshot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  screenshotPaths: string | undefined;
  pdfPath: string | undefined;

  constructor(private screenshotService: ScreenshotService) { }

  captureScreenshots() {
    const urls = 
      'http://52.172.33.39:4200/#/PerformanceReportScreenshot?VesselId=105&enginedetailid=131&engineperformanceid=811'
      // Add more URLs as needed
    

    this.screenshotService.takeScreenshot(urls).subscribe(response => {
      // Capture the paths of the screenshots
      this.screenshotPaths = response.path;
      this.pdfPath = response.pdf_path;
      console.log('Screenshots saved at:', this.screenshotPaths);
    });
  }
}
