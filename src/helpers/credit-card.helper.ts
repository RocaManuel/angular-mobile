import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreditCardHelper {

  static cardTypes = [
    {
      code: 'amex',
      short_code: 'A',
      name: 'American Express',
      pattern: /^3[47]/,
      valid_length: [15],
      masked_max_length: 17,
      mask: [[0, 4], [4, 10], [10, 15]]
    }, {
      code: 'visa',
      short_code: 'V',
      name: 'Visa',
      pattern: /^4/,
      valid_length: [16],
      masked_max_length: 19,
      mask: [[0, 4], [4, 8], [8, 12], [12, 16]]
    }, {
      code: 'mc',
      short_code: 'M',
      name: 'MasterCard',
      pattern: /^5[1-5]/,
      valid_length: [16],
      masked_max_length: 19,
      mask: [[0, 4], [4, 8], [8, 12], [12, 16]]
    }, {
      code: 'disc',
      short_code: 'D',
      name: 'Discover',
      pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
      valid_length: [16],
      masked_max_length: 19,
      mask: [[0, 4], [4, 8], [8, 12], [12, 16]]
    }
  ];

  static ALLOWED_HOTEL_CARDS = ['amex', 'visa', 'mc'];
  static NO_FOREIGN_CURRENCY_CARDS = ['amex'];

  static getCreditCardType(num): any {
    let type = { code: '', name: '', mask: [] };
    if (num) {
      CreditCardHelper.cardTypes.forEach((cardType) => {
        if (num.match(cardType.pattern)) {
          type = cardType;
        }
      });
    }
    return type;
  }

  static getCodeByShortCode(shortCode: string): any {
    const type = this.cardTypes.find((cc) => {
      return cc.short_code === shortCode;
    });

    return type.code;
  }

  static getCreditCardName(code) {
    const selectedCard =  this.cardTypes.find((card) => {
      return card.code === code;
    });
    return selectedCard.name;
  }

  static isExpired(card: any) {
    if (!card.expiration_date) {
      return false;
    }

    const current = new Date();
    const date = card.expiration_date.split('-');
    const dateObj = new Date(parseInt(date[0], 10), parseInt(date[1], 10), 0);
    return dateObj < current;
  }

  static isValidHotelCCType(num) {
    const cc = CreditCardHelper.getCreditCardType(num);
    return CreditCardHelper.ALLOWED_HOTEL_CARDS.indexOf(cc.code) > -1;
  }

  static formatExpirationDate(date) {
    const splitDate = date.split('/');
    if (splitDate.length === 2) {
      return `20${splitDate[1]}-${splitDate[0]}`;
    }
    return date;
  }

  static acceptedCard(ccList = []): ValidatorFn {
    return (control: AbstractControl) => {
      const num = control.value.replace(/ /, '');
      if (num) {
        const notAllowed = !this.validAndAllowedCC(num, ccList);
        if (notAllowed) {
          const type = this.getCreditCardType(num).name;
          if (type) {
            return { customError: `${type} is not accepted` };
          }
          return { customError: 'Invalid card type' };
        }
        return undefined;
      }
    };
  }

  static validAndAllowedCC(num: string, ccListAllowed: string[]) {
    if (ccListAllowed.length) {
      const cc = CreditCardHelper.getCreditCardType(num);
      const allowed = ccListAllowed.filter((list) => {
        return list === cc.code;
      });

      return allowed.length > 0;
    }

    return this.isValidHotelCCType(num);
  }

  static isForeignCurrencyCompatible(): ValidatorFn {
    return (control: AbstractControl) => {
      const num = control.value.replace(/ /, '');
      const type = this.getCreditCardType(num).code;
      if (CreditCardHelper.NO_FOREIGN_CURRENCY_CARDS.indexOf(type) !== -1) {
        return { customError: 'payment.invalid_foreign_currency_cc' };
      }
      return undefined;
    };
  }

  static expireDateValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const date = control.value;
      const dateSplit = date.split('/');
      const today = new Date();
      if (!date.match(/(0[1-9]|1[0-2])\/\d{2}/)) {
        return { customError: 'Date must be formatted "MM/YY"' };
      }

      if (
        dateSplit.length === 2 &&
        dateSplit[1].length === 2 &&
        today > new Date(parseInt(`20${dateSplit[1]}`, 10), dateSplit[0], 0)
      ) {
        return { customError: 'Date must be in the future' };
      }

      return undefined;
    };
  }

  getCreditCardType(num) {
    return CreditCardHelper.getCreditCardType(num);
  }
}
