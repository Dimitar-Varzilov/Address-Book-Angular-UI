import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialExampleModule } from 'material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingSpinnerComponent } from './components/loading component/loading-component/loading-spinner.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { AddressesTableComponent } from './addresses-table/addresses-table.component';
import { ErrorComponent } from './error/error.component';

//Other imports

@NgModule({
  declarations: [
    AppComponent,
    EditAddressComponent,
    LoadingSpinnerComponent,
    AddressesTableComponent,
    ErrorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
