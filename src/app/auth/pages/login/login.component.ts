import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  formLogin: FormGroup = this._fb.group({
    email : ['test1@test.com', Validators.email],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private _fb: FormBuilder,
  ) { }

  login():void{
    console.table(this.formLogin.value);
    console.log("Valid: ", this.formLogin.valid);
  }
}
