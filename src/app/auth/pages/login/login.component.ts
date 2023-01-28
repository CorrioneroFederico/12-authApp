import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector:     'app-login',
  templateUrl:  './login.component.html',
  styles:       [
  ]
})
export class LoginComponent {

  formLogin: FormGroup = this._fb.group({
    email:    ['test1@test.com', Validators.email],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private _fb:          FormBuilder,
    private router:       Router,
    private _authService: AuthService
  ) { }

  login():void{
    console.table(this.formLogin.value);
    const {email, password} = this.formLogin.value;

    this._authService .login(email, password)
                      .subscribe(
                          ok => {
                              ok? this.router.navigateByUrl('/dashboard'):
                                  console.log('Msj de error');
                          });
    // this.router.navigateByUrl('/dashboard');
  }
}
