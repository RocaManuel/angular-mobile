import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { register } from 'src/store/actions/auth.actions';
import { Observable, Subject } from 'rxjs';
import * as fromState from '../../store/reducers';
import { takeUntil } from 'rxjs/operators';
import { RegisterParams } from '../../interfaces/auth.interfaces';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})

export class RegisterPage implements OnInit, OnDestroy {

  @ViewChild('sliderRef', { read: IonSlides }) slider: IonSlides;

  constructor(
    private store: Store
  ) { }

  public   slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };
  public pending: boolean;

  private registerError$: Observable<any> = this.store.pipe(select(fromState.selectUserError));
  private registerPending$: Observable<any> = this.store.pipe(select(fromState.selectUserPending));
  private user$: Observable<any> = this.store.pipe(select(fromState.selectUser));
  private ngUnsuscribe = new Subject();


  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', Validators.required),
    country: new FormControl('Argentina', Validators.required),
    location: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.registerError$.pipe(takeUntil(this.ngUnsuscribe)).subscribe((e) => {
      console.log(e);
    });
    this.registerPending$.pipe(takeUntil(this.ngUnsuscribe)).subscribe((p) => {
      this.pending = p;
    });
    this.user$.pipe(takeUntil(this.ngUnsuscribe)).subscribe((u) => {
      this.slider.slideNext();
    });
  }

  inputChange(e, input) {
    this.registerForm.get(input).setValue(e.detail.value);
  }

  async onButtonPress() {
    const index = await this.slider.getActiveIndex();
    if (index === 1) {
      if (this.validatePersonalParams()) { return this.slider.slideNext(); }
      return false;
    }
    if (index === 2) {
      if (this.validateLoginParams()) { return this.register(); }
      return false;
    }
    this.slider.slideNext();
  }

  validatePersonalParams() {
    this.registerForm.get('country').markAsTouched();
    this.registerForm.get('location').markAsTouched();
    this.registerForm.get('name').markAsTouched();
    this.registerForm.get('lastname').markAsTouched();
    return this.registerForm.get('country').valid && this.registerForm.get('location').valid && this.registerForm.get('name').valid
      && this.registerForm.get('lastname').valid;
  }

  validateLoginParams() {
    this.registerForm.get('email').markAsTouched();
    this.registerForm.get('password').markAsTouched();
    return this.registerForm.get('email').valid && this.registerForm.get('password').valid;
  }

  register() {
    const params: RegisterParams = {
      country: this.registerForm.get('country').value,
      location: this.registerForm.get('location').value,
      name: this.registerForm.get('name').value,
      lastname: this.registerForm.get('lastname').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    };
    this.store.dispatch(register({ params }));
  }

  ngOnDestroy() {
    this.ngUnsuscribe.next();
  }

  get countryValid() {
    return this.registerForm.get('country').touched ? this.registerForm.get('country').valid : true;
  }
  get locationValid() {
    return this.registerForm.get('location').touched ? this.registerForm.get('location').valid : true;
  }
  get nameValid() {
    return this.registerForm.get('name').touched ? this.registerForm.get('name').valid : true;
  }
  get lastnameValid() {
    return this.registerForm.get('lastname').touched ? this.registerForm.get('lastname').valid : true;
  }
  get emailValid() {
    return this.registerForm.get('email').touched ? this.registerForm.get('email').valid : true;
  }
  get passwordValid() {
    return this.registerForm.get('password').touched ? this.registerForm.get('password').valid : true;
  }
}
