import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesTableComponent } from './addresses-table/addresses-table.component';
import { AppComponent } from './app.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
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
