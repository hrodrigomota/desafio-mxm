import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signUp(user: User):Observable<User>{
    return this.http.post<User>("https://api-desafio-mxm.azurewebsites.net/users", user);
  }
}
