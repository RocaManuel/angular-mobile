import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { register } from 'src/store/actions/auth.actions';
import { Observable, Subject } from 'rxjs';
import * as fromState from '../../store/reducers';
import { takeUntil } from 'rxjs/operators';
import { RegisterParams } from '../../interfaces/auth.interfaces';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})

export class RegisterPage implements OnInit, OnDestroy {


  constructor(
    private store: Store
  ) { }

  private registerError$: Observable<any> = this.store.pipe(select(fromState.selectUserError));
  private registerPending$: Observable<any> = this.store.pipe(select(fromState.selectUserPending));
  private user$: Observable<any> = this.store.pipe(select(fromState.selectUser));
  private ngUnsuscribe = new Subject();

  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.registerError$.pipe(takeUntil(this.ngUnsuscribe)).subscribe((e) => {
      console.log(e);
    });
    this.registerPending$.pipe(takeUntil(this.ngUnsuscribe)).subscribe((p) => {
      console.log(p);
    });
    this.user$.pipe(takeUntil(this.ngUnsuscribe)).subscribe((u) => {
      console.log(u);
    });
  }

  inputChange(e, input) {
    this.registerForm.get(input).setValue(e.detail.value);
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
    console.log(params);
    this.store.dispatch(register({ params }));
  }

  ngOnDestroy() {
    this.ngUnsuscribe.next();
  }
}