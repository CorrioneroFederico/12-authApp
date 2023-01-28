import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { AuthResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = environment.url

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string){
    const urlLogin = `${this.url}/auth`;
    const body = {email,password}
    return this.http.post<AuthResponse>(urlLogin,body);

  }
}
