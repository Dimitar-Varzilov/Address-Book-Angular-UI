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
    try {
      let response = await this.http.get<Address[]>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES)
      );
      return response;
    } catch (error: any) {
      console.log(error.message);
      throw new Error('Data not found');
    }
  }

  public async createAddress(address: Address) {
    try {
      let response = await this.http.post<Address>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES),
        address
      );
      response.subscribe();
    } catch (error: any) {
      console.log(error.message);
      throw new Error('Failed to add address: ' + error.message);
    } finally {
      return await this.getAddresses();
    }
  }

  public async updateAddress(address: Address) {
    try {
      let response = await this.http.put<Address[]>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES, address.addressId),
        address
      );
      response.subscribe();
    } catch (error: any) {
      console.log(error.message);
      throw new Error('Failed to update address: ' + error.message);
    } finally {
      return await this.getAddresses();
    }
  }

  public async deleteAddress(address: Address) {
    try {
      let response = await this.http.delete<Address[]>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES, address.addressId)
      );
      response.subscribe();
    } catch (error: any) {
      console.log(error.message);
      throw new Error('Failed to delete address: ' + error.message);
    } finally {
      return await this.getAddresses();
    }
  }

  private stringGenerator(endpoint: string, id?: number): string {
    const idCheck: string = id ? `/${id}` : '';
    const result: string = `${this.api}/${endpoint}${idCheck}`;
    return result;
  }
}
