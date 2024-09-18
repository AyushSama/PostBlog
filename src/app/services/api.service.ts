import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { endpoints } from '../endpoints/endpoints';
import { Post } from '../Interfaces/Post';

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

  getPosts(){
    try {
      return this.http.get(this.apiHostPath + endpoints.getFeed)
    } catch (error) {
      throw new Error();
    }
  }  

  updateLike(body : Post){
    try {
      return this.http.post(this.apiHostPath + endpoints.updateLike,body)
    } catch (error) {
      throw new Error();
    }
  }

  getPostOfIndividual(params: HttpParams){
    try{
      return this.http.get(this.apiHostPath + endpoints.getPostOfIndividual,{params})
    }
    catch{
      throw new Error();
    }
  }


}
