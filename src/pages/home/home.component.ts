import { Component } from '@angular/core';
import { AddressService } from 'src/services/address.service';
import { Request } from 'src/models/requestOptions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  value = '';

  /**
   *
   */
  constructor(private addressService: AddressService) {}

  public fetchAddresses({}: Request) {}
}
