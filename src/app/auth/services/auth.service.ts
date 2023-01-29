import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { catchError, map, of, tap } from 'rxjs';

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

  logIn(email: string, password: string){
    const urlLogin = `${this.url}/auth`;
    const body = {email,password}

    return this.http.post<AuthResponse>(urlLogin,body)
        .pipe(
          tap( ({ ok, token }) => {
            if (ok) {
              localStorage.setItem('token',token!);
            }
          }),
          map( valid => valid.ok),
          catchError( err => of(err.error.msg))
        );
  }

  logout(){
    localStorage.removeItem('token');
  }

  validateToken() {
    const urlToken = `${this.url}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(urlToken, { headers })
      .pipe(
        map( response => {
          localStorage.setItem('token',response.token!);
          this._usuario = { name: response.name!, uid: response.uid!, email: response.email!};

          return response.ok
        }),
        catchError( err => of(false))
      );
  }

  registro( name: string, email: string, password: string) {
    const urlRegister = `${this.url}/auth/new`;
    const body = {name,email,password}

    return this.http.post<AuthResponse>(urlRegister,body)
    .pipe(
      tap( ({ ok, token }) => {
        if (ok) {
          localStorage.setItem('token',token!);
        }
      }),
      map( valid => valid.ok),
      catchError( err => of(err.error.msg))
    );
  }

}
