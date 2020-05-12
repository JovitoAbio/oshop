import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(fb: FormBuilder, public auth: AuthService) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit() { }

  signInWithEmailAndPassword(form) {
    this.auth.signInWithEmailAndPassword(form.value.username, form.value.password);
    console.log('Submitted');
  }

  forgotPassword(form) {
    this.auth.ForgotPassword(form.value.username);
  }

}
