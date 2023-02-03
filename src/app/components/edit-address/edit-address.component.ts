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
  @Output() addressesUpdated = new EventEmitter<Address[]>();
  // buttonLabel?: string = this.address?.addressId
  //   ? 'Edit Address'
  //   : 'Add address';

  constructor(private addressService: AddressService) {}
  ngOnInit(): void {
    // console.log('Component initialized');
  }

  async addAddress(address: Address) {
    console.log(address);
    await this.addressService.createAddress(address);
    await this.addressService
      .getAddresses()
      .subscribe((addresses: Address[]) => {
        console.table(addresses);
        this.addressesUpdated.emit(addresses);
      });
  }

  updateAddress(address: Address) {
    this.addressService
      .updateAddress(address)
      .subscribe((addresses: Address[]) =>
        this.addressesUpdated.emit(addresses)
      );
  }
}
