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
    return this.http.get<Address[]>(`${this.api}/${this.ENDPOINTS.ADDRESSES}`);
  }

  public updateAddresses(address: Address): void {
    this.http.put<Address>(`${this.api}/${address.addressId}`);
  }

  private stringGenerator(endpoint: string, id?: number): string {
    const idcheck: string = id ?? `/${id}`;
    const result: string = `${this.api}/${endpoint}${idcheck}`;
    return result;
  }
}
