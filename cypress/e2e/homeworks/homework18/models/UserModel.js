import { faker } from '@faker-js/faker';

class User {
  constructor(name, lastName, email, password) {
    this._name = name;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._repeatPassword = password;
  }

  get name() {
    return this._name;
  }

  get lastName() {
    return this._lastName;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get repeatPassword() {
    return this._repeatPassword;
  }

  set name(value) {
    this._name = value.trim();
  }

  set lastName(value) {
    this._lastName = value.trim();
  }

  set email(value) {
    this._email = value;
  }

  set password(value) {
    this._password = value;
    this._repeatPassword = value;
  }

  set repeatPassword(value) {
    this._repeatPassword = value;
  }

  static createNewUser() {
    return new User(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.internet.password());
  }

  create() {
    return cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/auth/signup',
      body: {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default User;
