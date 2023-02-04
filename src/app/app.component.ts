import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AddressService } from 'src/services/address.service';
import { Address } from 'src/models/address';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Address Book';
  addresses: Address[] = [];
  dataSource: Address[] = this.addresses;
  addressToEdit?: Address;
  isLoadingResults = false;
  constructor(private addressService: AddressService) {}

  async ngOnInit(): Promise<void> {
    this.isLoadingResults = true;
    let response = await this.addressService.getAddresses();
    response.subscribe((response) => {
      this.addresses = response;
    });
    this.isLoadingResults = false;
  }

  createAddress(): void {
    this.addressToEdit = new Address();
  }

  editAddress(address: Address): void {
    this.addressToEdit = address;
  }

  async deleteAddress(address: Address): Promise<void> {
    this.isLoadingResults = true;
    let response = await this.addressService.deleteAddress(address);
    response.subscribe((response) => {
      this.addresses = response;
    });
    this.isLoadingResults = false;
  }

  updateAddresses(addresses: Address[]): void {
    this.addresses = addresses;
  }
}
