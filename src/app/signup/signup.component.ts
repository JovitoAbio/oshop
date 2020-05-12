import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  constructor(fb: FormBuilder, public auth: AuthService) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  ngOnInit() { }

  createUserWithEmailAndPassword(form) {
    this.auth.createUserWithEmailAndPassword(form.value.username, form.value.password);
  }

}
