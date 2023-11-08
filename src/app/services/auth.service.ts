import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/auth/login'; // Replace with the actual API URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log(password, username);
    // Send a POST request to the FakeStore API for authentication
    return this.http.post(this.apiUrl, { username, password });
  }

  userLogin(
    username: string,
    password: string
  ): Observable<{ username: string; password: string }> {
    console.log('Here');
    return this.http
      .post<any>('https://fakestoreapi.com/auth/login', { username, password })
      .pipe(
        map((token) => {
          localStorage.setItem('token', JSON.stringify(token));
          console.log('Token :', token);
          return token;
        })
      );
  }
}
