import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AddressBook } from 'src/models/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private url = 'Addresses';
  constructor(private http: HttpClient) {}

  public getAddresses(): Observable<AddressBook[]> {
    return this.http.get<AddressBook[]>(`${environment.apiUrl}/${this.url}`);
  }
}
