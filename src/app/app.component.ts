import { Component } from '@angular/core';
import { AddressService } from 'src/services/address.service';
import { Address } from 'src/models/address';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Address Book';
  // addresses: Observable<Address[]> = new Observable<Address[]>();
  addresses: Address[] = [];
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
  }

  deleteAddress(address: Address): void {
    this.addressService.deleteAddress(address).subscribe((res: Address[]) => {
      this.addresses = res;
    });
  }

  updateAddresses(addresses: Address[]): void {
    this.addresses = addresses;
  }

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
