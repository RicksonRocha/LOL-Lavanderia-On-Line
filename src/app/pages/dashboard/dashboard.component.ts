import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  constructor() {
    const script = document.createElement('script');
    script.src = './dashboard.component.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }
  
}