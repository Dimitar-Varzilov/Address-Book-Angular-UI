import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from 'src/models/address';
import { AddressService } from 'src/services/address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
})
export class EditAddressComponent implements OnInit {
  @Input() address?: Address;
  @Output() addressesUpdated = new EventEmitter<boolean>();
  // buttonLabel?: string = this.address?.addressId
  //   ? 'Edit Address'
  //   : 'Add address';

  constructor(private addressService: AddressService) {}
  ngOnInit(): void {
    // console.log('Component initialized');
  }

  addAddress(address: Address) {
    this.addressService
      .createAddress(address)
      .subscribe((addresses: Address[]) => {
        addresses.length > 0
          ? this.addressesUpdated.emit(true)
          : this.addressesUpdated.emit(false);
      });
    this.address = new Address();
  }

  updateAddress(address: Address) {
    this.addressService
      .updateAddress(address)
      .subscribe((addresses: Address[]) => {
        addresses.length > 0
          ? this.addressesUpdated.emit(true)
          : this.addressesUpdated.emit(false);
      });
    this.address = new Address();
  }
}
