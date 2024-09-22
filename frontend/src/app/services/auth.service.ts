import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string):Observable<any> {
    return this.http.post(`${environment.url}/api/auth/signup`, { email, password });
  }

  signIn(email: string, password: string):Observable<any> {
    return this.http.post(`${environment.url}/api/auth/signin`, { email, password });
  }

  signOut() {
    localStorage.removeItem('token');
    return this.http.post(`${environment.url}/api/auth/signout`,{})
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}