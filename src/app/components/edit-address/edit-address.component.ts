import { Component, OnInit } from '@angular/core';
import { Address } from 'src/models/address';
import { AddressService } from 'src/services/address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
})
export class EditAddressComponent implements OnInit {
  @Input() address?: Address;

  constructor(private addressService: AddressService) {}
  ngOnInit(): void {}

  public updateAddress(address: Address): void {
    this.addressService.updateAddress(address);
  }
}
