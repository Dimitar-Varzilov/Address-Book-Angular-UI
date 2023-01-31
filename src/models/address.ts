export class Address {
  addressId?: number;
  firstName = '';
  lastName = '';
  telephone: string = '';
  fullName = this.firstName + ' ' + this.lastName;
}
