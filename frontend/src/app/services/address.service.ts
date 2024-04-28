import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/Address/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAddress(zipcode:string):Observable<Address>{
    return this.http.get<Address>(`https://viacep.com.br/ws/${zipcode}/json/`);
  }
}
