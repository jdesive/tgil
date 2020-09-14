import { Component, OnInit } from '@angular/core';
import {User} from '../login/login.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  static checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const cPass = group.get('cpassword').value;
    return pass === cPass ? null : {notSame: true};
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      cpassword: ['']
    }, {validator: RegisterComponent.checkPasswords});
  }

  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.http.post('http://localhost:8080/register', {username: this.f.username.value, password: this.f.password.value, confirmPassword: this.f.cpassword.value}).subscribe((data: User) => {
      this.router.navigate(['login']);
    });
  }
}
