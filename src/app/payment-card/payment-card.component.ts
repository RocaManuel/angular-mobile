import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreditCardHelper } from 'src/helpers/credit-card.helper';
import { IonInput } from '@ionic/angular';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]
    )
  ],
})

export class PaymentCardComponent implements OnInit {

  @Output() checkout = new EventEmitter();

  constructor() { }

  @ViewChild('expirationDateField', { static: true }) expirationDateField: IonInput;
  @ViewChild('ccvField', { static: true }) ccvField: IonInput;
  @ViewChild('cardHolderNameField', { static: true }) cardHolderNameField: IonInput;

  public cardForm: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    cardholderName: new FormControl('', Validators.required),
    expiration: new FormControl('', Validators.required),
    securityCode: new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(4),
    Validators.pattern('^[0-9]*$')]),
    docType: new FormControl('DNI', Validators.required),
    docNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
  public ccvMaxLength = 3;
  public ccMaxLength = 19;
  public cardLogo = '';
  private creditCardType: string;

  ngOnInit() { }

  setCCV(e) {
    let num = e.target.value.replace(/ |\D/g, '');
    const backspace = e.inputType === 'deleteContentBackward';

    if (num.length > 3 && !backspace) {
      num = num.slice(0, -1);
      return this.ccv.setValue(num);
    }
    if (num.length === 3) {
      this.cardHolderNameField.setFocus();
    }

    this.ccv.setValue(num);
  }

  setDocument(e) {
    const backspace = e.inputType === 'deleteContentBackward';
    if (this.docType.value !== 'DNI') {
      let num = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
      if (num.length > 16 && !backspace) {
        num = num.slice(0, -1);
        return this.docNumber.setValue(num);
      }
      return this.docNumber.setValue(num);
    }
    let num = e.target.value.replace(/ |\D/g, '');
    if (num.length > 8 && !backspace) {
      num = num.slice(0, -1);
      return this.docNumber.setValue(num);
    }
    return this.docNumber.setValue(num);
  }


  inputChange(e, input) {
    this.cardForm.get(input).setValue(e.detail.value);
  }

  formatCreditCard(e) {
    let num = e.target.value.replace(/ |\D/g, '');
    const backspace = e.inputType === 'deleteContentBackward';
    const type = CreditCardHelper.getCreditCardType(num);

    if (num.length > 16 && !backspace) {
      num = num.slice(0, -1);
      return this.cardNumber.setValue(num);
    }

    if (num && type.code.length) {
      this.cardLogo = `../../assets/img/credit-cards/${type.code}_cc.svg`;
      this.creditCardType = type.code;
      this.ccMaxLength = type.masked_max_length;
      const newNumber = [];
      type.mask.forEach((value) => {
        if (num.length > value[0]) {
          newNumber.push(num.slice(value[0], value[1]));
        }
      });
      if (num.length === type.valid_length[0] && this.cardNumber.valid) {
        this.expirationDateField.setFocus();
      }
      num = newNumber.join(' ');
    } else if (!type.code.length) {
      this.cardLogo = '';
      this.creditCardType = '';
    }
    this.cardNumber.setValue(num);
  }

  formatDate(event) {
    const backspace = event.inputType === 'deleteContentBackward';
    const date = event.target.value.replace(/\/|\D/g, '');
    let formattedDate = date;
    if (date.length === 1 && !backspace && parseInt(date, 10) > 1) {
      formattedDate = `0${date}/`;
    }
    if (date.length === 2 && backspace) {
      formattedDate = date.substr(0, 1);
    }
    if (date.length > 2) {
      const month = date.substr(0, 2);
      const year = date.substr(2, 2);
      formattedDate = `${month}/${year}`;
      if (date.length === 4) { this.ccvField.setFocus(); }
    }
    this.expiration.setValue(formattedDate);
  }

  submit() {
    if (!this.validatePersonalParams()) { return; }

    const ccArray = this.cardNumber.value.split(' ');
    const hidedCreditCard = `•••• •••• •••• ${ccArray[3]}`;
    const cc = `${ccArray[0]}${ccArray[1]}${ccArray[2]}${ccArray[3]}`;
    const month = this.expiration.value.split('/')[0];
    const year = this.expiration.value.split('/')[1];

    const creditCard = {
      hidedCreditCard,
      cardNumber: cc,
      securityCode: this.ccv.value,
      expirationMonth: month,
      expirationYear: year,
      cardholderName: this.cardholderName.value,
      docType: this.docType.value,
      docNumber: this.docNumber.value,
      email: this.email.value,
      creditCardType: this.creditCardType
    };

    console.log(creditCard);

    this.checkout.emit(creditCard);
  }

  validatePersonalParams() {
    this.ccv.markAsTouched();
    this.cardNumber.markAsTouched();
    this.expiration.markAsTouched();
    this.cardholderName.markAsTouched();
    this.docNumber.markAsTouched();
    this.docType.markAsTouched();
    this.email.markAsTouched();

    return this.ccv.valid && this.expiration.valid && this.cardNumber.valid &&
      this.cardholderName.valid && this.docNumber.valid && this.docType.valid && this.email.valid;
  }

  get ccv() { return this.cardForm ? this.cardForm.get('securityCode') : null; }
  get cardNumber() { return this.cardForm ? this.cardForm.get('cardNumber') : null; }
  get expiration() { return this.cardForm ? this.cardForm.get('expiration') : null; }
  get cardholderName() { return this.cardForm ? this.cardForm.get('cardholderName') : null; }
  get docType() { return this.cardForm ? this.cardForm.get('docType') : null; }
  get docNumber() { return this.cardForm ? this.cardForm.get('docNumber') : null; }
  get email() { return this.cardForm ? this.cardForm.get('email') : null; }


}
