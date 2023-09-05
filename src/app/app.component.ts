import { Component } from '@angular/core';
import { ScreenshotService } from './screenshot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  screenshotPath: string | undefined;
  constructor(private screenshotService: ScreenshotService) { }

  captureScreenshot() {
    const url = 'http://52.172.33.39:4200/#/PerformanceReportScreenshot?VesselId=105&enginedetailid=131&engineperformanceid=811';
    this.screenshotService.takeScreenshot(url).subscribe(response => {
      this.screenshotPath = response.path;
      console.log('Screenshot saved at:', response.path);
    });
  }
}
