import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Address } from 'src/models/address';
import { requestOptions } from 'src/models/requestOptions';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = environment.apiUrl;
  private ENDPOINTS = environment.ENDPOINTS;
  constructor(private http: HttpClient) {}

  public getAddresses(
    HTTPRequestOptions?: requestOptions
  ): Observable<Address[]> {
    try {
      return this.http.get<Address[]>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES),
        HTTPRequestOptions
      );
    } catch (error: any) {
      console.log(error.message);
      throw new Error('Data not found');
    }
  }

  public createAddress(
    address: Address,
    HTTPRequestOptions?: requestOptions
  ): Observable<Address[]> {
    try {
      return this.http.post<Address[]>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES),
        address,
        HTTPRequestOptions
      );
    } catch (error: any) {
      console.log(error.message);
      throw new Error('Failed to add address: ' + error.message);
    }
  }

  public updateAddress(
    address: Address,
    HTTPRequestOptions?: requestOptions
  ): Observable<Address[]> {
    try {
      console.log(address.postalCode);
      let response = this.http.put<Address[]>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES, {
          id: address.addressId,
        }),
        address,
        HTTPRequestOptions
      );
      alert(`Successfully updating address`);
      return response;
    } catch (error: any) {
      console.log(error.message);
      throw new Error('Failed to update address: ' + error.message);
    }
  }

  public deleteAddress(
    id: number,
    HTTPRequestOptions?: requestOptions
  ): Observable<Address[]> {
    try {
      let response = this.http.delete<Address[]>(
        this.stringGenerator(this.ENDPOINTS.ADDRESSES, { id: id }),
        HTTPRequestOptions
      );
      alert(`Successfully deleting address`);
      return response;
    } catch (error: any) {
      console.log(error.message);
      throw new Error('Failed to delete address: ' + error.message);
    }
  }

  private stringGenerator(
    endpoint: string,
    options: { id?: number; query?: string } = {}
  ): string {
    const { id, query } = options;
    const idCheck: string = id ? `/${id}` : '';
    const queryCheck: string = query ? `?query=${query}` : '';
    const result: string = `${this.apiUrl}/${endpoint}${idCheck}${queryCheck}`;
    return result;
  }
}
