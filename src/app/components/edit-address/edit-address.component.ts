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
    try {
      let response = await this.addressService.createAddress(address);
      response.subscribe((addresses: Address[]) => {
        this.addressesUpdated.emit(addresses);
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async updateAddress(address: Address) {
    (await this.addressService.updateAddress(address)).subscribe(
      (addresses: Address[]) => this.addressesUpdated.emit(addresses)
    );
  }
}
