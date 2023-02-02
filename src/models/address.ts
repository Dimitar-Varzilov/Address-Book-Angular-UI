export class Address {
  addressId?: number;
  firstName = '';
  lastName = '';
  telephone: string = '';
  fullName: string = this.firstName + ' ' + this.lastName;
}
