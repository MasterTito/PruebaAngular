import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class llamadaSimuladaService {
  constructor(private http: HttpClient){
  }  
  public post(url:string, body:any){
    return this.http.post(url, body);
  }
  public get(url:string){
    return this.http.get(url);
  }
}
