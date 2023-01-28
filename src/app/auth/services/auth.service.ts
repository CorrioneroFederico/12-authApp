import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = environment.url;
  private _usuario!: Usuario;

  get usuario(){
    return { ...this._usuario }
  }

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string){
    const urlLogin = `${this.url}/auth`;
    const body = {email,password}

    return this.http.post<AuthResponse>(urlLogin,body)
        .pipe(
          tap( response => {
            response.ok?
                        this._usuario = { name: response.name!, uid: response.uid!}:
                        false
          }),
          map( valid => valid.ok),
          catchError( err => of(false))
        );
  }
}
