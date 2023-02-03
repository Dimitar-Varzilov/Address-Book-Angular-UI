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

  public async getAddresses() {
    return await this.http.get<Address[]>(
      this.stringGenerator(this.ENDPOINTS.ADDRESSES)
    );
  }

  public async createAddress(address: Address) {
    await this.http
      .post<Address[]>(this.stringGenerator(this.ENDPOINTS.ADDRESSES), address)
      .subscribe();
    return await this.getAddresses();
  }

  public async updateAddress(address: Address) {
    await this.http
      .put<Address[]>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES, address.addressId),
        address
      )
      .subscribe();
    return await this.getAddresses();
  }

  public async deleteAddress(address: Address) {
    await this.http
      .delete<Address[]>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES, address.addressId)
      )
      .subscribe();
    return await this.getAddresses();
  }

  private stringGenerator(endpoint: string, id?: number): string {
    const idCheck: string = id ? `/${id}` : '';
    const result: string = `${this.api}/${endpoint}${idCheck}`;
    return result;
  }
}
