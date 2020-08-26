import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { PaymentForm } from 'src/interfaces/payment.interface';
import { environment } from 'src/environments/environment';

declare var Mercadopago: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentHelper {

  constructor() {
    Mercadopago.setPublishableKey(environment.meliToken);
    Mercadopago.getIdentificationTypes();
  }

  public async getPaymentMethod(creditCardNumber) {
    return new Promise<{ text: string, value: number }>((resolve, reject) => {

      const creditCardValid = true;
      if (!creditCardValid) { reject('invalid credit card'); }

      const bin = creditCardNumber.substring(0, 6);

      Mercadopago.getPaymentMethod(
        { bin },
        async (request, response) => this.setPaymentMethod(request, response, { resolve, reject })
      );
    });
  }

  private async setPaymentMethod(status, response, promise) {
    if (status !== 200) { promise.reject('err'); }

    const paymentMethodId = response[0].id;
    Mercadopago.getInstallments(
      { payment_method_id: paymentMethodId, amount: 1 },
      async (s: number, r: any) => await this.returnPaymentOptions(s, r, promise)
    );
  }

  private async returnPaymentOptions(status, response, promise) {
    promise.resolve({ text: response[0].payer_costs[0].recommended_message, value: response[0].payer_costs[0].installments });
  }

  public getCardToken(form: PaymentForm) {
    return new Promise((resolve, reject) => {
      Mercadopago.createToken(form, (status: number, response: any) => {
        if (status !== 200) { reject('invalid credit token'); }
        resolve(response);
      });
    });
  }

}
