import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { RegisterParams } from '../interfaces/auth.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public auth(params: { email: string, password: string }): Observable<any> {
    return this.http.get<any>( `${environment.apiUrl}/api/v1/users/`, { params } );
  }

  public authRegister(params: RegisterParams): Observable<any> {
    return this.http.post<any>( `${environment.apiUrl}/api/v1/users/`, params );
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

}
