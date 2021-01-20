import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataManipulationService {

  constructor(public httpService: HttpClient) {

  }

  private getHeaders(){
    let headers = new HttpHeaders();
    const defaultValues: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    Object.keys(defaultValues).forEach((header: string)=>{
      headers = headers.set(header, defaultValues[header]);
    })
    return headers;
  }
  getData(url: string) {
    return this.httpService.get(url);
  }

  postData(url: string, payload: any){
    return this.httpService.post(url, payload, {headers : this.getHeaders()});
  }
}
