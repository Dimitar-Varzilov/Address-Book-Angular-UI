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
  // addresses: Observable<Address[]> = new Observable<Address[]>();
  addresses: Address[] = [];
  dataSource: Address[] = this.addresses;
  addressToEdit?: Address;
  isLoadingResults = false;
  constructor(private addressService: AddressService) {}

  async ngOnInit(): Promise<void> {
    this.isLoadingResults = true;
    await this.addressService.getAddresses().subscribe((response) => {
      this.addresses = response;
    });
    this.isLoadingResults = false;
  }

  createAddress(): void {
    this.addressToEdit = new Address();
  }

  editAddress(address: Address): void {
    this.addressToEdit = address;
    // this.addressToEdit = new Address();
  }

  deleteAddress(address: Address): void {
    this.addressService.deleteAddress(address).subscribe((res: Address[]) => {
      this.addresses = res;
    });
  }

  updateAddresses(addresses: Address[]): void {
    this.addresses = addresses;
  }
}
