import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AddressService } from 'src/services/address.service';
import { Address } from 'src/models/address';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppModule } from './app.module';
import { LoadingComponentComponent } from './components/loading component/loading-component/loading-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends LoadingComponentComponent {
  title = 'Address Book';
  addresses: Address[] = [];
  filteredAddresses: Address[] = [];
  // addresses2: Address[] =
  //   this.filteredAddresses.length > 0 ? this.filteredAddresses : this.addresses;
  addresses2: Address[] = this.addresses;
  addressToEdit?: Address;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'telephone',
    'actions',
  ];
  dataSource: Address[] = [];

  constructor(private addressService: AddressService) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.addressService.getAddresses().subscribe((response) => {
      this.addresses = response;
      this.dataSource = response;
    });
    this.isLoading = false;
  }

  createAddress(): void {
    this.addressToEdit = new Address();
  }

  editAddress(address: Address): void {
    this.addressToEdit = address;
  }

  async deleteAddress(address: Address): Promise<void> {
    this.isLoading = true;
    let response = await this.addressService.deleteAddress(address);
    response.subscribe((response) => {
      this.addresses = response;
    });
    this.isLoading = false;
  }

  updateAddresses(addresses: Address[]): void {
    this.addresses = addresses;
  }

  filterAddresses(query: string): void {
    const filteredAddresses: Address[] = this.addresses.filter(
      (address: Address) =>
        address.toString().toLowerCase().includes(query.toLowerCase())
    );
  }
}
