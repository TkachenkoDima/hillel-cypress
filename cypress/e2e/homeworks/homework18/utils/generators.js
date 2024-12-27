import { faker } from "@faker-js/faker";

class Generators {
  generateRandomString(length) {
    return faker.string.alpha(length);
  }

  generateRandomDigits(length) {
    return faker.string.numeric(length);
  }

  generatePassword() {
    let password = this.generateRandomString(13).toLowerCase();
    const upperCaseLetter = faker.string.alpha(1).toUpperCase();
    const randomDigit = this.generateRandomDigits(1);

    password += upperCaseLetter;
    password += randomDigit;

    return password;
  }
}

export default new Generators();
