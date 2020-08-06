import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { login } from 'src/store/actions/auth.actions';
import { Observable, Subject } from 'rxjs';
import * as fromState from '../../store/reducers';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage implements OnInit, OnDestroy {


  constructor(
    private store: Store
  ) { }

  private loginError$: Observable<any> = this.store.pipe(select(fromState.selectUserError));
  private loginPending$: Observable<any> = this.store.pipe(select(fromState.selectUserPending));
  private user$: Observable<any> = this.store.pipe(select(fromState.selectUser));
  private ngUnsuscribe = new Subject();

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.loginError$.pipe(takeUntil(this.ngUnsuscribe)).subscribe((e) => {
      console.log(e);
    });
    this.loginPending$.pipe(takeUntil(this.ngUnsuscribe)).subscribe((p) => {
      console.log(p);
    });
    this.user$.pipe(takeUntil(this.ngUnsuscribe)).subscribe((u) => {
      console.log(u);
    });
  }

  inputChange(e, input) {
    this.loginForm.get(input).setValue(e.detail.value);
  }

  login() {
    const params: { email: string, password: string } = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    console.log(params);
    this.store.dispatch(login(params));
  }

  ngOnDestroy() {
    this.ngUnsuscribe.next();
  }
}
