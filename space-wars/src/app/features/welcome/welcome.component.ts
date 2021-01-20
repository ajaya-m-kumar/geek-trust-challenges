import { Component, OnInit } from '@angular/core';
import { FindFalconeService } from '../find-falcone/find-falcone.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  searchStatus:string = '';
  vehicles: any;
  planets:any;
  constructor(private findingFalconeService: FindFalconeService) {
    this.searchStatus = this.findingFalconeService.getSearchStatus();
    this.planets = this.findingFalconeService.getPlanets();
    this.vehicles = this.findingFalconeService.getVehicles();
  }

  ngOnInit(): void {
  }

}
