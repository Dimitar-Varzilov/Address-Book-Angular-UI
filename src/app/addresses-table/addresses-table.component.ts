import { AddressService } from 'src/services/address.service';
import { Address } from 'src/models/address';
import { LoadingSpinnerComponent } from '../components/loading component/loading-component/loading-spinner.component';

import { Component, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-addresses-table',
  templateUrl: './addresses-table.component.html',
  styleUrls: ['./addresses-table.component.css'],
})
export class AddressesTableComponent
  extends LoadingSpinnerComponent
  implements OnInit
{
  title = 'Address Book';
  private _addresses!: Address[];
  public get addresses(): Address[] {
    return this._addresses;
  }
  public set addresses(value: Address[]) {
    this._addresses = value;
  }
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
  paginatorLength!: number | undefined;

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

  getCurrentPaginator() {
    this.paginatorLength = this.dataSource.paginator?.pageSize;
  }
}
