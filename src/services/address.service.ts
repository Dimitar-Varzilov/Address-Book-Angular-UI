import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Address } from 'src/models/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private api = environment.apiUrl;
  private ENDPOINTS = environment.ENDPOINTS;
  private url = 'Addresses';
  constructor(private http: HttpClient) {}

  public getAddresses(): Observable<Address[]> {
    var response = this.http.get<Address[]>(
      this.stringGenerator(this.ENDPOINTS.ADDRESSES)
    );
    return response;
  }

  public createAddress(address: Address): Address[] {
    let response: Address[] = [];
    this.http
      .post<Address[]>(this.stringGenerator(this.ENDPOINTS.ADDRESSES), address)
      .subscribe((value: Address[]) => {
        response = value;
      });
    return response;
  }

  public updateAddress(address: Address): Observable<Address[]> {
    return this.http.put<Address[]>(
      this.stringGenerator(this.ENDPOINTS.ADDRESSES, address.addressId),
      address
    );
  }

  public deleteAddress(address: Address): Observable<Address[]> {
    return this.http.delete<Address[]>(
      this.stringGenerator(this.ENDPOINTS.ADDRESSES, address.addressId)
    );
  }

  private stringGenerator(endpoint: string, id?: number): string {
    const idCheck: string = id ? `/${id}` : '';
    const result: string = `${this.api}/${endpoint}${idCheck}`;
    return result;
  }
}
