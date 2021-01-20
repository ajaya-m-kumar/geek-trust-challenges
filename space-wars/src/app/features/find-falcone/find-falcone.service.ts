import { Injectable } from '@angular/core';
import URLS from 'src/app/shared/constants/urls/urls';
import { DataManipulationService } from 'src/app/shared/services/data/data-manipulation.service';

@Injectable()
export class FindFalconeService {
  searchResult: any = {};
  searchStatus = '';
  constructor(private dataManipulationService: DataManipulationService) {

  }

  setSearchStatus(status: string){
    this.searchStatus = status;
  }
  getSearchStatus(){
    return this.searchStatus
  }
  getSearchResult(){
    return this.searchResult;
  }

  setSearchResult(result: any){
    this.searchResult = result;
  }

  getPlanets(){
    return this.dataManipulationService.getData(URLS.RETRIEVE_PLANET_LIST);
  }

  getVehicles(){
    return this.dataManipulationService.getData(URLS.RETRIEVE_VEHICLE_LIST);
  }

  generateToken() {
    return this.dataManipulationService.postData(URLS.GENERATE_TOKEN, {});
  }

  findFalcone(payload: {}) {
    return this.dataManipulationService.postData(URLS.FIND_FALCONE, payload);
  }
}
