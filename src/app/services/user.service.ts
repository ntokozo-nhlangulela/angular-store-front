import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<any>('https://fakestoreapi.com/users/1').pipe(
      map((res: any) => {
        console.log('User: ', res);
        return res;
      })
    );
  }

  login(
    username: string,
    password: string
  ): Observable<{ username: string; password: string }> {
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

  // getUser(data: undefined): Observable<any> {
  //   return this.http.post('https://fakestoreapi.com/users/', data);
  // }
}
