import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public authService: AuthService
  ) { }

  async onLogin(form: NgForm) {
    try {
      this.submitted = true;
      const auth = await this.authService.auth().pipe().toPromise();
      console.log(auth);
      if (form.valid) {
        this.userData.login(this.login.username);
        this.router.navigateByUrl('/app/tabs/schedule');
      }
    } catch(e) {
      console.log(e);
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
