import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesTableComponent } from './components/addresses-table/addresses-table.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { ErrorComponent } from '../pages/error/error.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'AddressesTable', component: AddressesTableComponent },
  { path: 'EditAddress', component: EditAddressComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  // router.go()
}
