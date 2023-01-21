import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  formRegister: FormGroup = this._fb.group({
    nombre  : [''               ,Validators.required],
    email   : ['test2@test.com' ,Validators.required, Validators.email],
    password: ['123456'         ,Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
  ) { }

  register():void{}

}
