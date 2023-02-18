import { LoadingSpinnerComponent } from './components/loading-component/loading-spinner.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends LoadingSpinnerComponent {
  constructor() {
    super();
  }
}
