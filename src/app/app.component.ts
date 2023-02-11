import { AddressService } from 'src/services/address.service';
import { Address } from 'src/models/address';
import { LoadingSpinnerComponent } from './components/loading component/loading-component/loading-spinner.component';

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
export class AppComponent extends LoadingSpinnerComponent {
  constructor() {
    super();
  }
}
