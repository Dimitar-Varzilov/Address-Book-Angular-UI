import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AddressService } from 'src/services/address.service';
import { Address } from 'src/models/address';
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
  addresses!: Address[];
  addressToEdit?: Address;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'telephone',
    'actions',
  ];
  pageSizeOptions = [5, 10, 25, 100];
  dataSource!: MatTableDataSource<Address>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private addressService: AddressService) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.addressService.getAddresses().subscribe((response) => {
      this.addresses = response;
      this.dataSource = new MatTableDataSource(this.addresses);
      this.paginator = this.paginator;
      this.sort = this.sort;
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
