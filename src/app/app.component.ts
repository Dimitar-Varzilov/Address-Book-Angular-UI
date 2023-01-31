import { Component } from '@angular/core';
import { AddressService } from 'src/services/address.service';
import { AddressBook } from 'src/models/address';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  addresses: Observable<AddressBook[]> = Observable<AddressBook[]>;

  constructor(private AddressService: AddressService) {
    this.addresses = AddressService.getAddresses();
  }
}
