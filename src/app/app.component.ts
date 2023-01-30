import { Component } from '@angular/core';
import { AddressService } from 'src/services/address.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AddressBook.UI';

  constructor(private AddressService: AddressService) {}
}
