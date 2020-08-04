import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  auth(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/v1/users`,
      { headers: new HttpHeaders({ 'No-Auth': 'true'  }) }
     );
  }

}
