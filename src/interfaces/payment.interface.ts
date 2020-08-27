
export interface PaymentForm {
  description: string;
  transaction_amount: number;
  cardNumber: string;
  cardholderName: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  securityCode: string;
  installments: string;
  docType: string;
  docNumber: string;
  email: string;
}