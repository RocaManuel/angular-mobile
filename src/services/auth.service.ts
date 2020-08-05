import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) { }

  auth(params: { email: string, password: string }): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/v1/users/`,
      { params }
     );
  }

}
