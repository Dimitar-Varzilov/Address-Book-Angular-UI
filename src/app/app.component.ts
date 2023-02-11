import { AddressService } from 'src/services/address.service';
import { Address } from 'src/models/address';
import { LoadingComponentComponent as LoadingComponent } from './components/loading component/loading-component/loading-component.component';

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
export class AppComponent extends LoadingComponent implements OnInit {
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
    this.isLoading = true;
    this.addressService.getAddresses().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    });
    this.isLoading = false;
  }
  createAddress(): void {
    this.addressToEdit = new Address();
  }

  editAddress(address: Address): void {
    this.addressToEdit = address;
  }

  deleteAddress(id: number): void {
    this.isLoading = true;
    this.addressService.deleteAddress(id).subscribe((addresses: Address[]) => {
      addresses.length > 0;
      this.getAddressList();
    });
    this.isLoading = false;
  }

  updateAddresses(isSuccessful: boolean): void {
    if (isSuccessful) {
      this.getAddressList();
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
