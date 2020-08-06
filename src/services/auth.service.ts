import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  public auth(params: { email: string, password: string }): Observable<any> {
    return this.http.get<any>( `${environment.apiUrl}/api/v1/users/`, { params } );
  }

}
