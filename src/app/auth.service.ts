import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';



export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: {
      name: string;
    };
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: {
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:1337/api';
  public currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) this.currentUser.next(JSON.parse(user));
    }
  }

  getHeaders() {
  const token = this.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

  // login(identifier: string, password: string): Observable<AuthResponse> {
  //   return this.http.post<AuthResponse>(`${this.baseUrl}/auth/local`, {
  //     identifier,
  //     password,
  //   });
  // }
//   login(identifier: string, password: string) {
//   return this.http.post(`${this.baseUrl}/auth/local`, { identifier, password }).pipe(
//     switchMap((res: any) => {
//       const jwt = res.jwt;
//       return this.http.get(`${this.baseUrl}/users/me?populate=role`, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       }).pipe(
//         tap((user) => this.saveUser(jwt, user))
//       );
//     })
//   );
// }
login(identifier: string, password: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.baseUrl}/auth/local`, {
    identifier,
    password
  });
}

// getFullUser(userId: number): Observable<User> {
//   return this.http.get<User>(`${this.baseUrl}/users/${userId}?populate=role`, this.getHeaders());
// }
getFullUser(userId: number): Observable<User> {
  const token = this.getToken(); //  Get token from localStorage
  return this.http.get<User>(
    `${this.baseUrl}/users/${userId}?populate=role`,
    {
      headers: {
        Authorization: `Bearer ${token}` //  Send token here
      }
    }
  );
}

getAllUsers(): Observable<User[]> {
  const token = this.getToken();
  return this.http.get<User[]>(`${this.baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

saveUser(token: string, user: any) {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  this.currentUser.next(user);
}


 getToken():string | null {
  if (typeof window !== 'undefined' && localStorage) {
    return localStorage.getItem('token');
  }
  return null;
}



  isAdmin(): boolean {
    console.log('Current role:', this.currentUser.value?.role?.name);

    return this.currentUser.value?.role?.name === 'admin';

  }

  isLoggedIn(): boolean {
  const token = this.getToken();
  return !!token;
}

  getUserId(): number | null {
    return this.currentUser.value?.id ?? null;
  }

// signup(username: string, email: string, password: string): Observable<AuthResponse> {
//   return this.http.post<AuthResponse>('http://localhost:1337/api/auth/local/register', {
//     username,
//     email,
//     password,
//   });
// }
signup(username: string, email: string, password: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.baseUrl}/auth/local/register`, {
    username,
    email,
    password
  });
}

logout() {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  this.currentUser.next(null);
}
}
