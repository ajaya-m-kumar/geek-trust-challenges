import { Injectable } from '@angular/core';

@Injectable()
export class StateService {

  constructor() {

  }
  setValuesInLocalStorage(object:any){
    Object.keys(object).forEach(key=>this.updateDataInLocalStorage(key, object[key]));
  }
  updateDataInLocalStorage(key: string, value: string){
    localStorage.setItem(key, value);
  }
  fetchDataFromLocalStorage(key: string){
    return localStorage.getItem(key);
  }
  removeDataFromLocalStorage(key: string){
    localStorage.removeItem(key);
  }
  clearLocalStorage(){
    localStorage.clear();
  }
}
