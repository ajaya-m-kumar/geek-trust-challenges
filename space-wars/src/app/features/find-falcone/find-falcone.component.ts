import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FindFalconeService } from './find-falcone.service';
import {MatDialog} from '@angular/material/dialog';
import { WelcomeComponent } from '../welcome/welcome.component';

const TRANSLATIONS= {
  NUMBERS: ['FIRST', 'SECOND', "THIRD", 'FOURTH']
}
const createExpedition = (_: any, index: number) => ({ 
  planet: null, 
  vehicle: null,
  order: index,
  title: `${TRANSLATIONS.NUMBERS[index]} EXPEDITION` 
});

@Component({
  selector: 'app-find-falcone',
  templateUrl: 'find-falcone.component.html',
  styleUrls: ['find-falcone.component.scss']
})
export class FindFalconeComponent implements OnInit {
  planetControl = new FormControl();
  vehicleControl = new FormControl();
  planetsDropDown = new FormControl();
  vehiclesDropDown = new FormControl();
  filterControl = new FormControl();
  private maximumExpeditionsPossible: number = 4;
  public expeditions: any[] = [];
  planets: any[] = [];
  vehicles : any[]= [];
  filteredPlanets: Observable<any[]>;
  filteredVehicles: Observable<any[]>;
  get totalRequiredTime() {
    return this.expeditions.reduce((aggregatedValues, currentTrip)=>{ 
      const validTrip = this.isValidTrip(currentTrip);
      return aggregatedValues + (validTrip ? this.calculateTimeForTrip(currentTrip): 0);
    }, 0);
  }
  isValidTrip = (trip: any) => {
    return this.planets.some(planet=>planet.name === (trip.planet) && this.vehicles.some(planet=>planet.name === (trip.vehicle)));
  }

  calculateTimeForTrip({planet, vehicle}: any) {
    return this.findPlanetDistance(planet) / this.findVehicleSpeed(vehicle);
  }

  findPlanetDistance(selectedPlanet: string) {
    return this.planets.find(planet=>planet.name === selectedPlanet).distance;
  }
  findVehicleSpeed(selectedVehicle: string) {
    return this.vehicles.find(vehicle=>vehicle.name === selectedVehicle).speed;
  }
  get cannotFindFalcone(){
    return this.expeditions.some(exp=>!exp.planet || !exp.vehicle);
  }
  constructor(private findingFalconeService: FindFalconeService, private router: Router, private _snackBar: MatSnackBar, private _materialDialog: MatDialog) {
    this.findingFalconeService.getPlanets().subscribe((response: any) => {
      this.planets = response;
      this.planetControl.setValue("");
    });
    this.findingFalconeService.getVehicles().subscribe((response: any) => {
      this.vehicles = response;
      this.vehicleControl.setValue("");
    })
    this.filteredPlanets = this.planetControl.valueChanges
      .pipe(
        startWith(''),
        map(planet => this._filterPlanets(planet))
      );
    this.filteredVehicles = this.vehicleControl.valueChanges
      .pipe(
        startWith(''),
        map(vehicle =>this._filterVehicles(vehicle))
      );
    const continueExistingSearch = this.findingFalconeService.getSearchResult();
    if(continueExistingSearch.status){
      if(continueExistingSearch.status === 'success'){
        this.findingFalconeService.setSearchStatus('Falcone Found & Released');
        this._materialDialog.open(WelcomeComponent);
      } else {
        this.findingFalconeService.setSearchStatus('Falcone Not Found');
        this._materialDialog.open(WelcomeComponent);
      }
    } else {
      this.findingFalconeService.setSearchStatus('Begin Search for Falcone');
      this._materialDialog.open(WelcomeComponent)
    }
  }
  token: string = '';
  ngOnInit(): void {
    this.createExpeditions(this.maximumExpeditionsPossible);
    this.generateToken();
  }
  generateToken(previousTokenExpired = false) {
    this.findingFalconeService.generateToken().subscribe((response: any)=>{
      this.token = response.token;
      if(previousTokenExpired) {
        this._snackBar.open('Token has been re-initialized','Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      }
    });
  }
  private _filterPlanets(value: string): any[] {
    return this.planets.filter(planet => planet.name.toLowerCase().includes(value.toLowerCase())) || this.planets;
  }
  private _filterVehicles(value: string): any[] {
    return this.vehicles.filter(vehicle => vehicle.name.toLowerCase().includes(value.toLowerCase())) || this.vehicles;
  }
  createExpeditions(numberOfExpeditions: number = 4) {
    this.expeditions = Array.from({ length: numberOfExpeditions }, createExpedition);
  }
  vehicleNotAvailable(vehicle: string, {planet}: any): any{
    if(!this.isValidTrip({vehicle, planet})){
      return { disable: false };
    }
    const vehicleNoLongerAvailable = this.vehicles.find(vh=>vehicle === vh.name).total_no === this.expeditions.filter(exp=> exp.vehicle === vehicle).length;
    const planetOutOfVehiclesRange = this.vehicles.find(vh=>vehicle === vh.name).max_distance < this.planets.find(pl=>planet === pl.name).distance;
    if (planetOutOfVehiclesRange && vehicleNoLongerAvailable) {
      return { disable: true, message: 'Out of Range && All Units Assigned' };
    } else if(planetOutOfVehiclesRange){
      return { disable: true, message: 'Out of Range' };
    } else if (vehicleNoLongerAvailable) {
      return { disable: true, message: 'All Units Assigned' };
    } else {
      return { disable: false };
    }
  }
  findFalcone() {
    const payload = {
      token: this.token,
      planet_names: this.expeditions.map(trip=>trip.planet),
      vehicle_names: this.expeditions.map(trip=>trip.vehicle),
    }
    this.findingFalconeService.findFalcone(payload).subscribe((response: any)=>{
      if(response.status) {
        this.findingFalconeService.setSearchResult({...response, timeTaken: this.totalRequiredTime, ...payload});
        this.router.navigateByUrl('search-result');
      }
    }, response=> {
      if(response.error.error){
        this._snackBar.open(response.error.error, 'Regenerate a Token', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }).onAction().subscribe(_=>this.generateToken(true));
      }
    });
  }
  onClosingPlanetsDropdown(){
    this.planetControl.setValue("");
  }
  onClosingVehiclesDropdown(){
    this.vehicleControl.setValue("");
  }
  chosenPlanetChanged(expedition: any){
    delete expedition.vehicle;
  }
  planetAlreadyAssigned(planet: any, expedition: any){
    return this.expeditions.filter(exp=>(planet.name == exp.planet && exp.order !== expedition.order)).length > 0;
  }
}
