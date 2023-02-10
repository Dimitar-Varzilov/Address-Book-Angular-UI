import { AddressService } from 'src/services/address.service';
import { Address } from 'src/models/address';
import { LoadingComponentComponent } from './components/loading component/loading-component/loading-component.component';

import { Component, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends LoadingComponentComponent implements OnInit {
  title = 'Address Book';
  addresses!: Address[];
  addressToEdit?: Address;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'telephone',
    'userAddress',
    'postalCode',
    'city',
    'country',
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
    this.getAddressList();
  }

  getAddressList(): void {
    this.addressService.getAddresses().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    });
  }
  createAddress(): void {
    this.addressToEdit = new Address();
  }

  editAddress(address: Address): void {
    this.addressToEdit = address;
  }

  async deleteAddress(id: number): Promise<void> {
    this.isLoading = true;
    await this.addressService
      .deleteAddress(id)
      .subscribe((addresses: Address[]) => {
        addresses.length > 0;
        this.getAddressList();
      });
    this.isLoading = false;
  }

  async updateAddresses(isSuccessful: boolean): Promise<void> {
    if (isSuccessful) {
      await this.getAddressList();
    } else {
      alert(`Error updating address`);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
