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
  addresses: Observable<Address[]> = new Observable<Address[]>();
  // addresses: AddressBook[] = [];
  // var dataSource;

  constructor(private addressService: AddressService) {
    // var response = addressService.getAddresses();
    // this.dataSource = new MatTableDataSource(response);
    this.addresses = addressService.getAddresses();
  }

  ngOnInit(): void {
    this.addresses = this.addressService.getAddresses();
  }

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
