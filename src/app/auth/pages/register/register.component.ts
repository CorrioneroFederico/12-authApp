import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  formRegister: FormGroup = this._fb.group({
    nombre  : ['Ezze'               ,Validators.required],
    email   : ['test2@test.com' ,[Validators.required, Validators.email]],
    password: ['123456'         ,Validators.required],
  });

  constructor(
    private _authService: AuthService,
    private _fb:          FormBuilder,
    private _router:      Router,
  ) { }

  register():void{
    const {name, email, password} = this.formRegister.value;

    this._authService.registro(name, email, password).subscribe(
      (rta) =>{
      if (rta.ok === true){
        Swal.fire('Registro',rta,'success');
        this._router.navigateByUrl('/auth');
      }
      else
        Swal.fire('Error', rta, 'error');
    });

  }
}
