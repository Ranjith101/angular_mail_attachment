import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent {
  recipientEmail: string = '';
  subject: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const emailData = {
      to: this.recipientEmail,
      subject: this.subject,
      message: this.message,
    };

    this.http.post('http://localhost:3000/send-email', emailData).subscribe(
      (response) => {
        console.log('Email sent successfully');
        // Handle success (e.g., display a success message)
      },
      (error) => {
        console.error('Error sending email', error);
        // Handle error (e.g., display an error message)
      }
    );
  }
}
