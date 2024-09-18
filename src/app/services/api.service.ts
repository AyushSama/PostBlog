import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { endpoints } from '../endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiHostPath = environment.apiHostPath;

  constructor(private http : HttpClient) { }

  getUser(params: HttpParams){
    try{
      return this.http.get(this.apiHostPath + endpoints.getUser,{params})
    }
    catch{
      throw new Error();
    }
  }
  
}
